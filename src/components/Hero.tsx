import React, { useState } from "react";
import TypewriterEffectSmoothDemo from "./ui/typewriter-demo";
import { SignupFormDemo } from "/home/red/Coding/tamuhack2025-travlr/src/components/ui/signupdemo.tsx"; // Import the SignupFormDemo component
import { LoginFormDemo } from "/home/red/Coding/tamuhack2025-travlr/src/components/ui/logindemo.tsx"; // Import the LoginFormDemo component
import ChatbotButton from "/home/red/Coding/tamuhack2025-travlr/src/components/ui/chatbot-button.tsx"; // Import the ChatbotButton component

export function Hero() {
  const [showSignup, setShowSignup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);

  const handleSignUpClick = () => {
    setShowSignup(true);
    setShowLogin(false); 
  };

  const handleBackClick = () => {
    setShowSignup(false);
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setShowSignup(false); 
  };

  const handleBackClick2 = () => {
    setShowLogin(false);
  };

  const handleChatbotClick = () => {
    alert("Chatbot button clicked!");
  };

  return (
    <section className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-white">
      <div className="relative z-20 flex flex-col items-center space-y-6">
        {!showSignup && !showLogin ? (
          <>
            <TypewriterEffectSmoothDemo />
            <div className="flex flex-col space-y-4">
              <div className="flex space-x-4">
                <button
                  className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-white hover:bg-black hover:text-white dark:text-neutral-200 transition duration-200"
                  onClick={handleSignUpClick}
                >
                  Sign Up
                </button>
                <button
                  className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-white hover:bg-black hover:text-white dark:text-neutral-200 transition duration-200"
                  onClick={handleLoginClick}
                >
                  Login
                </button>
              </div>
              <button
                className="shadow-[inset_0_0_0_2px_#000000] text-white px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-black hover:bg-blue-500 hover:text-black dark:text-neutral-200 transition duration-200"
                onClick={handleLoginClick}
              >
                Flight Attendant Login
              </button>
            </div>
          </>
        ) : showSignup ? (
          <SignupFormDemo />
        ) : (
          <LoginFormDemo />
        )}
      </div>
      {showLogin && (
          <button
            onClick={handleBackClick2}
            className="absolute top-4 left-4 p-2 text-black hover:text-gray-600 z-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}
                {showSignup && (
          <button
            onClick={handleBackClick}
            className="absolute top-4 left-4 p-2 text-black hover:text-gray-600 z-30"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

      <ChatbotButton onClick={handleChatbotClick} />
    </section>
  );
}

export default Hero;
