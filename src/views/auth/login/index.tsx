"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import DataObjectIcon from "@mui/icons-material/DataObject";

const AuthForm: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalAction, setModalAction] = useState<() => void>(() => {});
  const router = useRouter();

  const togglePanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  const handleModalConfirm = () => {
    setIsModalOpen(false);
    modalAction();
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();

      // Open modal on successful sign up
      setModalMessage(data.message || "Account created successfully!");
      setModalAction(() => () => window.location.reload());
      setIsModalOpen(true);
    } catch (error) {
      console.error("Sign-up error:", error);
      alert("Error: " + error);
    }
  };

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    try {
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        // Open modal on successful login
        setModalMessage("Login successful! Click OK to go to your dashboard.");
        setModalAction(() => () => router.push("/dashboard/all-snippet"));
        setIsModalOpen(true);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Sign-in error:", error);
      alert("An error occurred during sign-in.");
    }
  };

  return (
    <div className="lg:flex justify-center p-10 max-md:p-4 items-center min-h-screen bg-gray-100 dark:bg-black relative">
      {/* Mobile Tab for Switching */}
      <div className="top-4 left-4 right-4 md:hidden mb-5 flex justify-center gap-4 z-10">
        <Button
          onClick={() => setIsRightPanelActive(true)}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-transform transform ${
            isRightPanelActive
              ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white scale-100"
              : "bg-gray-300 text-gray-700 dark:bg-sidebar dark:text-gray-200 scale-95"
          }`}
        >
          Sign In
        </Button>
        <Button
          onClick={() => setIsRightPanelActive(false)}
          className={`flex-1 px-4 py-2 rounded-full text-sm font-semibold shadow-lg transition-transform transform ${
            isRightPanelActive
              ? "bg-gray-300 text-gray-700 dark:bg-sidebar dark:text-gray-200 scale-95"
              : "bg-gradient-to-r from-blue-600 to-blue-800 text-white scale-100"
          }`}
        >
          Sign Up
        </Button>
      </div>

      <div
        className={`relative max-md:flex-col w-full max-w-5xl h-[600px] bg-white dark:bg-sidebar shadow-xl rounded-3xl overflow-hidden flex transform transition-transform duration-500 ease-in-out ${
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
          <div className="flex items-center gap-2">
            <div className="flex aspect-square bg-gradient-to-r from-blue-600 to-blue-800 size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <DataObjectIcon />
            </div>
            <div className="leading-tight truncate font-semibold relative">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Snippet
              </span>
              <span className="text-black dark:text-white"> Hub</span>
            </div>
          </div>

          <form
            className="flex flex-col items-center h-full justify-center"
            onSubmit={handleSignUp}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Create Account
            </h1>
            <span className="text-sm text-center text-gray-500 dark:text-gray-300 mb-4">
              Fill up the information to create a new account and explore.
            </span>
            <Input
              name="name"
              type="text"
              placeholder="Name"
              className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
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
          className={`w-full max-md:absolute lg:w-1/2 p-6 md:p-8 transition-all duration-500 ease-in-out ${
            isRightPanelActive
              ? "opacity-100 translate-x-0 visible"
              : "opacity-0 translate-x-[100%] invisible"
          } max-md:h-full`}
        >
          <div className="flex items-center gap-2">
            <div className="flex aspect-square bg-gradient-to-r from-blue-600 to-blue-800 size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <DataObjectIcon />
            </div>
            <div className="leading-tight truncate font-semibold relative">
              <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                Snippet
              </span>
              <span className="text-black dark:text-white"> Hub</span>
            </div>
          </div>
          <form
            className="flex flex-col items-center h-full justify-center"
            onSubmit={handleSignIn}
          >
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-4">
              Sign In
            </h1>
            <span className="text-sm text-center text-gray-500 dark:text-gray-300 mb-4">
              Fill up the information in order to login and explore.
            </span>
            <Input
              name="email"
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 mb-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Input
              name="password"
              type="password"
              placeholder="Password"
              className="w-full px-4 py-2 mb-6 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <Link
              href="#"
              className="text-sm text-blue-600 dark:text-blue-400 mb-4 underline hover:text-blue-800"
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
              className="px-6 py-2  bg-blue-700 border-white border-2 text-white rounded-full hover:bg-white hover:text-blue-800 transition"
            >
              {isRightPanelActive ? "Sign Up" : "Sign In"}
            </Button>
          </div>
        </div>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-sidebar max-md:max-w-[350px]">
          <DialogHeader>
            <DialogTitle className="text-gray-800 dark:text-white">
              Success
            </DialogTitle>
          </DialogHeader>
          <p className="text-gray-600 dark:text-gray-300">{modalMessage}</p>
          <DialogFooter>
            <Button onClick={handleModalConfirm}>OK</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthForm;
