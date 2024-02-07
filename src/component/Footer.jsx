import React from "react";
import { Link } from "react-router-dom";
/**
 * v0 by Vercel.
 * @see https://v0.dev/t/qahCFsEI9Gq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
export const Footer = () => {
  return (
    <footer className="w-full bg-gray-100 dark:bg-gray-800 py-12 px-4 md:px-6">
      <div className="container mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">About Us</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            We are a leading e-commerce platform committed to delivering an
            exceptional shopping experience. Our mission is to empower consumers
            with the most seamless online shopping experience.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Contact Us</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Email: support@example.com
            <br />
            Phone: (123) 456-7890
            <br />
            Address: 123 Main St, City, State, 12345
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to={""}
              >
                Electronics
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to={"/"}
              >
                Fashion
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to={""}
              >
                Home & Kitchen
              </Link>
            </li>
            <li>
              <Link
                className="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50"
                to={"/"}
              >
                Books
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Follow Us</h3>
          <div className="flex space-x-3">
            <Link to={"/"}>
              <FacebookIcon className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </Link>
            <Link to={"/"}>
              <TwitterIcon className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </Link>
            <Link to={"/"}>
              <InstagramIcon className="h-6 w-6 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-50" />
            </Link>
          </div>
          <h3 className="text-lg font-semibold mt-4">Newsletter</h3>
          <form>
            <input
              className="bg-white inputShadow text-[#333] outline-none outline-offset-2 border border-[#ddd] text-[0.97em] h-[2.7em] max-w-full px-[0.75em] mb-[1em] touch-manipulation "
              placeholder="Enter your email"
              type="email"
            />
            <button className="btn-add-cart" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center text-sm text-gray-500 dark:text-gray-400">
        <div>© 2024 Our E-commerce. All rights reserved. build with <a href="" >AH</a></div>
        <div className="mt-2 space-x-4">
          <Link className="hover:underline" to={"/"}>
            Privacy Policy
          </Link>
          <Link className="hover:underline" to={"/"}>
            Terms & Conditions
          </Link>
          <Link className="hover:underline" to={"/"}>
            FAQs
          </Link>
        </div>
      </div>
    </footer>
  );
};

function FacebookIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function TwitterIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}
