import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 py-12 dark:bg-gray-dark">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-5xl font-bold text-gray-800 dark:text-white">
          404 - Not Found
        </h1>

        <p className="mb-6 text-base text-gray-600 dark:text-gray-300">
          Oops! The page you're looking for doesn’t exist or has been moved.
        </p>

        <Link
          href="/"
          className="inline-block rounded-lg bg-primary px-6 py-3 text-white shadow transition duration-300 hover:bg-primary/90"
        >
          Go to Homepage
        </Link>
      </div>
    </div>
  );
}
