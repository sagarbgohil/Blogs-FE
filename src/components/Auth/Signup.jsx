import { useEffect, useState } from "react";
import InputGroup from "../FormElements/InputGroup";

export default function Signup({ setMode, setEmail, setResendTimer }) {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [signupErrors, setSignupErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleInput = (setter) => (e) => {
    const { name, type, checked, value } = e.target;
    setter((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate signup form
  const validateSignup = () => {
    const errors = {};
    if (!signupData.name) errors.name = "Name is required";
    if (!signupData.email || !/^\S+@\S+$/.test(signupData.email))
      errors.email = "Valid email is required";
    if (!signupData.username || signupData.username.length < 4)
      errors.username = "Username must be at least 4 characters";
    if (!signupData.password || signupData.password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (signupData.password !== signupData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    setSignupErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!validateSignup()) return;
    setLoading(true);

    const res = await fetchProxyV1(`/auth/sign-up`, {
      method: "POST",
      body: JSON.stringify({
        name: signupData.name,
        email: signupData.email,
        username: signupData.username,
        password: await encryptText(signupData.password),
      }),
    });
    if (res.ok) {
      setEmail(signupData.email);
      setMode("otp");
      setResendTimer(30);
      toast.success("Signup successful! Please verify your email.");
    } else {
      const error = await res.json();
      toast.error(error.message || "Signup failed. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (signupData.username.length >= 4) {
        fetch(`/api/v1/auth/check-username?username=${signupData.username}`)
          .then((res) => res.json())
          .then((data) => {
            if (!data.available) {
              setSignupErrors((prev) => ({
                ...prev,
                username: "Username is already taken",
              }));
            } else {
              setSignupErrors((prev) => ({ ...prev, username: null }));
            }
          });
      }
    }, 500);
    return () => clearTimeout(timeout);
  }, [signupData.username]);

  return (
    <>
      <h2 className="mb-2 text-2xl font-bold text-dark dark:text-white">
        Create account
      </h2>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Join our developer community today.
      </p>
      <form onSubmit={handleSignUp} className="space-y-3">
        <InputGroup
          label="Full Name"
          name="name"
          value={signupData.name}
          handleChange={handleInput(setSignupData)}
          placeholder="John Doe"
          required
          error={signupErrors.name}
        />
        <InputGroup
          label="Email"
          name="email"
          value={signupData.email}
          handleChange={handleInput(setSignupData)}
          placeholder="john@email.com"
          required
          error={signupErrors.email}
        />
        <InputGroup
          label="Username"
          name="username"
          value={signupData.username}
          handleChange={handleInput(setSignupData)}
          placeholder="johndoe"
          required
          error={signupErrors.username}
        />
        <InputGroup
          label="Password"
          type="password"
          name="password"
          value={signupData.password}
          handleChange={handleInput(setSignupData)}
          placeholder="******"
          required
          error={signupErrors.password}
        />
        <InputGroup
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={signupData.confirmPassword}
          handleChange={handleInput(setSignupData)}
          placeholder="******"
          required
          error={signupErrors.confirmPassword}
        />

        <button
          type="submit"
          className="w-full rounded bg-primary py-2 text-white hover:bg-primary/90"
        >
          {loading ? (
            <>
              Signing Up
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            </>
          ) : (
            "Sign Up"
          )}
        </button>
        <p className="text-center text-sm text-gray-600 dark:text-gray-400">
          Have an account?{" "}
          <button
            onClick={() => setMode("login")}
            className="text-primary hover:underline"
          >
            Log in
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
