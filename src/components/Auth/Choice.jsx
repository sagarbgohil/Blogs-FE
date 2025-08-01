import { FcGoogle } from "react-icons/fc";

export default function Choice({ setMode }) {
  return (
    <>
      <h2 className="mb-2 text-2xl font-bold text-dark dark:text-white">
        Welcome 👋
      </h2>
      <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
        Choose how you want to continue
      </p>

      <button
        onClick={() => alert("Google Sign-in")}
        className="flex w-full items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium shadow-sm transition hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-white dark:hover:bg-gray-800"
      >
        <FcGoogle className="text-xl" />
        Continue with Google
      </button>

      <div className="relative my-6 text-center text-sm text-gray-500 dark:text-gray-400">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
        </div>
        <span className="relative bg-white px-4 dark:bg-gray-800">OR</span>
      </div>

      <div className="grid gap-3">
        <button
          onClick={() => setMode("login")}
          className="w-full rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Continue with Email
        </button>
      </div>
    </>
  );
}
