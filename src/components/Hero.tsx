"use client";
import React, { useState } from "react";
import TypewriterEffectSmoothDemo from "./ui/typewriter-demo";
import { SignupFormDemo } from "/home/red/Coding/tamuhack2025-travlr/src/components/ui/signupdemo.tsx"; // Import the SignupFormDemo component

export function Hero() {
  const [showSignup, setShowSignup] = useState(false);

  const handleSignUpClick = () => {
    setShowSignup(true); 
  };

  return (
    <section className="relative flex items-center justify-center h-screen w-full overflow-hidden bg-white">
      <div className="relative z-20 flex flex-col items-center space-y-6">
        {!showSignup ? (
          <>
            <TypewriterEffectSmoothDemo />
            <div className="flex space-x-4">
              <button
                className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
                onClick={handleSignUpClick} 
              >
                Sign Up
              </button>
              <button className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200">
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
