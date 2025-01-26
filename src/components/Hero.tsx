"use client";
import React, { useState } from "react";
import TypewriterEffectSmoothDemo from "./ui/typewriter-demo";
import { SignupFormDemo } from "/home/red/Coding/tamuhack2025-travlr/src/components/ui/signupdemo.tsx"; // Import the SignupFormDemo component

export function Hero() {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignUpClick = () => {
    setShowSignup(true); 
  };

  const handleBackClick = () => {
    setShowSignup(false); 
  };

  return (
    <section className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-white">
      <div className="relative z-20 flex flex-col items-center space-y-6">
        {showSignup && (
          <button
            onClick={handleBackClick}
            className="absolute top-4 left-4 p-2 text-black hover:text-gray-600"
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

        {!showSignup ? (
          <>
            <TypewriterEffectSmoothDemo />
            <div className="flex space-x-4">
              <button
                className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-black hover:text-white dark:text-neutral-200 transition duration-200"
                onClick={handleSignUpClick}
              >
                Sign Up
              </button>
              <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-black hover:text-white dark:text-neutral-200 transition duration-200">
                Login
              </button>
            </div>
          </>
        ) : (
          <SignupFormDemo />
        )}
      </div>
    </section>
  );
}

export default Hero;
