import { EmailIcon, PasswordIcon } from "@/assets/icons";
import InputGroup from "../FormElements/InputGroup";
import { Checkbox } from "../FormElements/checkbox";
import { useState } from "react";
import { fetchProxyV1 } from "@/lib/proxy";
import { encryptText } from "@/utils/encryption";

export default function Login({ setMode }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  });
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInput = (setter) => (e) => {
    const { name, type, checked, value } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle login submission
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetchProxyV1(`/auth/sign-in`, {
      method: "POST",
      body: JSON.stringify({
        email: loginData.email,
        password: await encryptText(loginData.password),
      }),
    });

    if (res.ok) {
      const result = await res.json();
      localStorage.setItem(
        "accessToken",
        await encryptText(`Bearer ${result.data.tokens.access}`),
      );
      localStorage.setItem(
        "refreshToken",
        await encryptText(result.data.tokens.refresh),
      );
      localStorage.setItem(
        "user",
        await encryptText(JSON.stringify(result.data.user)),
      );

      const redirectPath = ["admin", "superadmin"].includes(
        result.data.user.role,
      )
        ? "/admin"
        : "/";
      window.location.href = redirectPath;
    } else {
      const error = await res.json();
      toast.error(error.message || "Login failed. Please try again.");
    }
    setLoading(false);
  };

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold text-dark dark:text-white">
        Log in
      </h2>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Enter your email and password to access your account.
      </p>

      <form onSubmit={handleLogin} className="space-y-5">
        <InputGroup
          label="Email"
          name="email"
          type="email"
          value={loginData.email}
          handleChange={handleInput(setLoginData)}
          placeholder="Enter your email"
          required
          icon={<EmailIcon />}
        />
        <InputGroup
          label="Password"
          name="password"
          type="password"
          value={loginData.password}
          handleChange={handleInput(setLoginData)}
          placeholder="Enter your password"
          required
          icon={<PasswordIcon />}
        />

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              name="remember"
              checked={loginData.remember}
              label="Remember me"
              onChange={handleInput(setLoginData)}
            />
          </div>
          <button
            onClick={() => setMode("forgot-password")}
            className="text-primary hover:underline dark:text-white dark:hover:text-primary"
          >
            Forgotten your password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded bg-primary py-2 text-white hover:bg-primary/90 disabled:opacity-60"
        >
          {loading ? (
            <>
              <span>Logging In...</span>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </>
          ) : (
            "Log In"
          )}
        </button>

        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Don’t have an account?{" "}
          <button
            onClick={() => setMode("signup")}
            className="text-primary hover:underline"
          >
            Sign Up
          </button>
        </p>

        <button
          onClick={() => setMode("choice")}
          className="mt-4 w-full text-xs text-gray-400 hover:underline"
        >
          ← Back to options
        </button>
      </form>
    </>
  );
}
