import { createDecipheriv } from "crypto";

export const encryptText = async (text) => {
  const rawKeyHex =
    process.env.NEXT_PUBLIC_API_SECRET || process.env.API_SECRET; // 32-byte hex string
  const keyBuffer = Uint8Array.from(Buffer.from(rawKeyHex, "hex"));

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBuffer,
    "AES-GCM",
    false,
    ["encrypt"],
  );

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encodedText = new TextEncoder().encode(text);

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    cryptoKey,
    encodedText,
  );

  const encryptedBytes = new Uint8Array(encrypted);
  const authTag = encryptedBytes.slice(encryptedBytes.length - 16);
  const cipherText = encryptedBytes.slice(0, encryptedBytes.length - 16);

  // Combine: IV + cipherText + authTag
  const payload = new Uint8Array(
    iv.length + cipherText.length + authTag.length,
  );
  payload.set(iv, 0);
  payload.set(cipherText, iv.length);
  payload.set(authTag, iv.length + cipherText.length);

  return btoa(String.fromCharCode(...payload)); // base64 for transport
};

export const decryptText = async (base64) => {
  const keyHex = process.env.NEXT_PUBLIC_API_SECRET || process.env.API_SECRET;

  const key = Buffer.from(keyHex, "hex");
  const buffer = Buffer.from(base64, "base64");
  const iv = buffer.slice(0, 12);
  const authTag = buffer.slice(buffer.length - 16);
  const cipherText = buffer.slice(12, buffer.length - 16);

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(cipherText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString("utf-8");
};

export const decryptHeader = (base64) => {
  const keyHex = process.env.NEXT_PUBLIC_API_SECRET || process.env.API_SECRET; // 32-byte hex string
  const key = Buffer.from(keyHex, "hex");
  const buffer = Buffer.from(base64, "base64");

  const iv = buffer.slice(0, 12);
  const authTag = buffer.slice(buffer.length - 16);
  const cipherText = buffer.slice(12, buffer.length - 16);

  const decipher = createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(authTag);

  let decrypted = decipher.update(cipherText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);

  return decrypted.toString("utf-8");
};
