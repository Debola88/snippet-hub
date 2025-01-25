"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

const AuthForm: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(true);

  const togglePanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const response = await fetch("/api/auth/signup", { // Correct API route for App Router
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error("Error during sign-up:", error);
      alert("An error occurred during sign-up. Please try again.");
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement).value;

    try {
      const response = await fetch("/api/auth/signin", { // Correct API route for App Router
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token); // Be cautious with storing JWT tokens in localStorage
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("An error occurred during sign-in. Please try again.");
    }
  };

  return (
    <div className="lg:flex justify-center p-10 max-md:p-4 items-center min-h-screen bg-gray-100 relative">
      {/* Mobile Tab for Switching */}
      <div className="top-4 left-4 right-4 md:hidden mb-5 flex justify-center gap-4 z-10">
        <Button
          onClick={() => setIsRightPanelActive(true)}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-transform transform ${
            isRightPanelActive
              ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white scale-100"
              : "bg-gray-300 text-gray-700 scale-95"
          }`}
        >
          Sign In
        </Button>
        <Button
          onClick={() => setIsRightPanelActive(false)}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-transform transform ${
            isRightPanelActive
              ? "bg-gray-300 text-gray-700 scale-95"
              : "bg-gradient-to-r from-blue-600 to-blue-800 text-white scale-100"
          }`}
        >
          Sign Up
        </Button>
      </div>

      <div
        className={`relative max-md:flex-col w-full max-w-5xl h-[600px] bg-white shadow-xl rounded-3xl overflow-hidden flex transform transition-transform duration-500 ease-in-out ${
          isRightPanelActive ? "flex-row-reverse" : ""
        } md:w-full`}
      >
        {/* Sign Up Container */}
        <div
          className={`w-full lg:w-1/2 p-6 md:p-8 transition-all duration-500 ease-in-out ${
            isRightPanelActive
              ? "opacity-0 translate-x-[-100%] invisible"
              : "opacity-100 translate-x-0 visible"
          } max-md:h-full`}
        >
          <div className="relative">
            <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Snippet
            </span>
            <span className="text-black"> Hub</span>
          </div>
          <form
            className="flex flex-col items-center h-full justify-center"
            onSubmit={handleSignUp}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Create Account
            </h1>
            <span className="text-sm text-center text-gray-500 mb-4">
              Fill up the information to create a new account and explore.
            </span>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 mb-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-6 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full hover:opacity-90 transition"
            >
              Sign Up
            </Button>
          </form>
        </div>

        {/* Sign In Container */}
        <div
          className={`w-full max-md:absolute lg:w-1/2  p-6 md:p-8 transition-all duration-500 ease-in-out ${
            isRightPanelActive
              ? "opacity-100 translate-x-0 visible"
              : "opacity-0 translate-x-[100%] invisible"
          } max-md:h-full`}
        >
          <Image
            src="/images/light-icon.svg"
            alt="My Icon"
            width={150}
            height={150}
            className="md:h-[160px] md:w-[160px] md:max-h-max"
          />
          <form
            className="flex flex-col items-center h-full justify-center"
            onSubmit={handleSignIn}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Sign In
            </h1>
            <span className="text-sm text-center text-gray-500 mb-4">
              Fill up the information in order to login and explore.
            </span>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-6 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <Link
              href="#"
              className="text-sm text-blue-600 mb-4 underline hover:text-blue-800"
            >
              Forgot your password?
            </Link>
            <Button
              type="submit"
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full hover:opacity-90 transition"
            >
              Sign In
            </Button>
          </form>
        </div>

        {/* Overlay Panel */}
        <div
          className={`absolute max-md:invisible w-1/2 max-lg:w-1/3 h-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center transition-transform duration-500 ease-in-out ${
            isRightPanelActive
              ? "-translate-x-0 right-0"
              : "translate-x-0 right-0"
          }`}
        >
          <div className="text-center px-6">
            <h1 className="text-3xl font-bold mb-4">
              {isRightPanelActive ? "Welcome Back!" : "Hello, Friend!"}
            </h1>
            <p className="text-sm mb-6">
              {isRightPanelActive
                ? "To keep connected with us, please log in with your personal info."
                : "Enter your personal information and start your journey with us."}
            </p>
            <Button
              onClick={togglePanel}
              className="px-6 py-2 border bg-blue-700 border-white rounded-full hover:bg-white hover:text-blue-800 transition"
            >
              {isRightPanelActive ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
