import { encryptText } from "@/utils/encryption";

export const fetchProxyAuthV1 = async (url, options = {}) => {
  const accessToken = localStorage.getItem("accessToken");

  const isFormData =
    (typeof FormData !== "undefined" && options.body instanceof FormData) ||
    options.body?.constructor?.name === "FormData";

  let headers = {
    ...options.headers,
    "x-encrypted-auth": accessToken,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  let res = await fetch(`/api/internal${url}`, {
    ...options,
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  // Handle 401 and retry with refresh token
  if (res.status === 401) {
    const refreshRes = await fetch("/api/internal/auth/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: localStorage.getItem("refreshToken"),
      }),
    });

    if (refreshRes.status === 200) {
      const refreshData = await refreshRes.json();
      const encryptedAccessToken = await encryptText(
        `Bearer ${refreshData.data.accessToken}`,
      );
      localStorage.setItem("accessToken", encryptedAccessToken);
      headers["x-encrypted-auth"] = encryptedAccessToken;

      res = await fetch(`/api/internal${url}`, {
        ...options,
        method: options.method || "GET",
        headers,
        body: options.body,
      });
    } else {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");
      window.location.href = "/auth/sign-in";
      return;
    }
  }

  return res;
};

export const fetchProxyV1 = async (url, options = {}) => {
  const isFormData =
    (typeof FormData !== "undefined" && options.body instanceof FormData) ||
    options.body?.constructor?.name === "FormData";

  let headers = {
    ...options.headers,
  };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  let res = await fetch(`/api/internal${url}`, {
    ...options,
    method: options.method || "GET",
    headers,
    body: options.body,
  });

  return res;
};
