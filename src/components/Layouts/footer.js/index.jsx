"use client";

import Link from "next/link";
import {
  FaXTwitter,
  FaLinkedinIn,
  FaInstagram,
  FaDiscord,
  FaYoutube,
  FaGithub,
  FaGitlab,
} from "react-icons/fa6";

export function Footer() {
  return (
    <footer className="border-t border-stroke bg-white px-4 py-6 text-sm text-gray-600 dark:border-stroke-dark dark:bg-gray-dark dark:text-gray-300">
      <div className="container mx-auto flex flex-col items-center justify-between gap-6 md:flex-row">
        {/* Left side links */}
        <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
          <div className="flex gap-4">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <Link href="/support" className="hover:text-primary">
              Support
            </Link>
            <Link href="/about" className="hover:text-primary">
              About
            </Link>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            © 2025 Sagar Gohil. All rights reserved.
          </p>
        </div>

        {/* Right side */}
        <div className="flex flex-col items-center gap-4 md:flex-row">
          {/* Social Icons */}
          <div className="flex gap-4">
            <Link
              href="https://github.com/sagarbgohil"
              aria-label="Discord"
              className="hover:text-primary"
              rel="noopener noreferrer"
              target="_blank"
            >
              <FaGithub />
            </Link>
            <Link
              href="https://gitlab.com/sagarbgohil"
              aria-label="Instagram"
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-primary"
            >
              <FaGitlab />
            </Link>
            <Link
              href="https://www.linkedin.com/in/gohilsagar"
              aria-label="LinkedIn"
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-primary"
            >
              <FaLinkedinIn />
            </Link>
            <Link
              href="https://x.com/SagarbGohil"
              aria-label="Twitter"
              rel="noopener noreferrer"
              target="_blank"
              className="hover:text-primary"
            >
              <FaXTwitter />
            </Link>
          </div>

          {/* Policy links */}
          <div className="flex gap-4 text-xs">
            <Link href="/privacy-policy" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-primary">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
