'use client'
import { useState } from 'react';

const AuthForm: React.FC = () => {
  const [isRightPanelActive, setIsRightPanelActive] = useState(false);

  const togglePanel = () => {
    setIsRightPanelActive(!isRightPanelActive);
  };

  return (
    <>

      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div
          className={`relative w-full max-w-5xl h-[600px] bg-white shadow-lg rounded-lg overflow-hidden flex transform transition-transform duration-500 ease-in-out ${
            isRightPanelActive ? 'flex-row-reverse' : ''
          }`}
        >
          {/* Sign Up Container */}
          <div
            className={`w-1/2 p-8 transition-all duration-500 ease-in-out ${
              isRightPanelActive ? 'opacity-0 translate-x-[-100%] invisible' : 'opacity-100 translate-x-0 visible'
            }`}
          >
            <form className="flex flex-col items-center h-full justify-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Create Account</h1>
              <div className="flex gap-4 mb-6">
                {['facebook-f', 'google-plus-g', 'linkedin-in'].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="flex items-center justify-center w-10 h-10 border rounded-full border-gray-300 text-gray-600 hover:text-blue-600 transition"
                  >
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                ))}
              </div>
              <span className="text-sm text-gray-500 mb-4">or use your email for registration</span>
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 mb-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-6 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full hover:opacity-90 transition"
              >
                Sign Up
              </button>
            </form>
          </div>

          {/* Sign In Container */}
          <div
            className={`w-1/2 p-8 transition-all duration-500 ease-in-out ${
              isRightPanelActive ? 'opacity-100 translate-x-0 visible' : 'opacity-0 translate-x-[100%] invisible'
            }`}
          >
            <form className="flex flex-col items-center h-full justify-center">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Sign In</h1>
              <div className="flex gap-4 mb-6">
                {['facebook-f', 'google-plus-g', 'linkedin-in'].map((icon) => (
                  <a
                    key={icon}
                    href="#"
                    className="flex items-center justify-center w-10 h-10 border rounded-full border-gray-300 text-gray-600 hover:text-blue-600 transition"
                  >
                    <i className={`fab fa-${icon}`}></i>
                  </a>
                ))}
              </div>
              <span className="text-sm text-gray-500 mb-4">or use your account</span>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 mb-3 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="password"
                placeholder="Password"
                className="w-full px-4 py-2 mb-6 border rounded bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <a href="#" className="text-sm text-blue-600 mb-4 underline hover:text-blue-800">
                Forgot your password?
              </a>
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-full hover:opacity-90 transition"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Overlay Panel */}
          <div
            className={`absolute w-1/2 h-full bg-gradient-to-r from-blue-600 to-blue-800 text-white flex items-center justify-center transition-transform duration-500 ease-in-out ${
              isRightPanelActive ? '-translate-x-0 right-0' : 'translate-x-0 right-0'
            }`}
          >
            <div className="text-center px-6">
              <h1 className="text-3xl font-bold mb-4">
                {isRightPanelActive ? 'Welcome Back!' : 'Hello, Friend!'}
              </h1>
              <p className="text-sm mb-6">
                {isRightPanelActive
                  ? 'To keep connected with us, please log in with your personal info.'
                  : 'Enter your personal information and start journey with us.'}
              </p>
              <button
                onClick={togglePanel}
                className="px-6 py-2 border border-white rounded-full hover:bg-white hover:text-blue-800 transition"
              >
                {isRightPanelActive ? 'Sign Up' : 'Sign In'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthForm;
