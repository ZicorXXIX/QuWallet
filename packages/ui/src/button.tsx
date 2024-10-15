"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button = ({ className, onClick, children }: ButtonProps) => {
  return (
    <button onClick={onClick} type="button" className={`py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700 ${className}`}>
      {children}
    </button>

  );
};

{/* <button type='button' class='py-2.5 px-6 text-sm bg-indigo-500 text-white rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-700'>Primary</button>
<button type='button' class='py-2.5 px-6 text-sm bg-indigo-50 text-indigo-500 rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:bg-indigo-100'>Secondary</button>
<button type='button' class='py-2.5 px-6 text-sm border border-gray-300 rounded-full shadow-xs bg-white font-semibold text-gray-900 transition-all duration-500 hover:bg-gray-50'>Outline</button>
<button type='button' class='py-2.5 px-6 text-sm rounded-full font-semibold text-indigo-500 transition-all duration-500 hover:bg-indigo-100 hover:shadow-xs hover:text-indigo-700'>Tertiary</button>
<button type='button' class='py-2.5 px-6 text-sm font-semibold text-indigo-500 transition-all duration-500 hover:text-indigo-700'>Link</button> */}