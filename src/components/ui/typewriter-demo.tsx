"use client";
import { TypewriterEffectSmooth } from "../ui/typewriter-effect";
export function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "We",
      className: 'text-black xl:text-6xl lg:text-5xl md:text-3xl sm:text-2xl'
    },
    {
      text: "Make",
      className: 'text-black xl:text-6xl lg:text-5xl md:text-3xl sm:text-2xl'
    },
    {
      text: "Traveling",
      className: "text-black xl:text-6xl lg:text-5xl md:text-3xl sm:text-2xl",
    },
    {
      text: "Easier",
      className: "text-black xl:text-6xl lg:text-5xl md:text-3xl sm:text-2xl",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center h-[5rem]">
      <TypewriterEffectSmooth words={words} />
    </div>
  );
}

export default TypewriterEffectSmoothDemo;
