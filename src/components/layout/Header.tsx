import { TextAlignJustify } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MobileDrawer } from "./MobileDrawer";

export const Header: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <>
      <header className="bg-white border border-gray-200 top-0 z-50">
        <div className="max-w-400 mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between">
          <div className="flex items-center">
            <TextAlignJustify
              onClick={() => setIsDrawerOpen(true)}
              className="block xl:hidden mx-2"
            />
            <Link to="/" className="flex items-center gap-1 mr-8">
              <span className="text-[#002b5e] font-extrabold text-[22px] tracking-tight font-sans">
                Autotrader
              </span>
              <svg
                viewBox="0 0 40 40"
                className="w-8 h-8 text-[#f06c00]"
                fill="currentColor"
              >
                <path d="M20 0C8.954 0 0 8.954 0 20s8.954 20 20 20 20-8.954 20-20S31.046 0 20 0zm0 37.5c-9.665 0-17.5-7.835-17.5-17.5S10.335 2.5 20 2.5 37.5 10.335 37.5 20 29.665 37.5 20 37.5zm-5-26h10l7.5 20h-4.5l-2.25-6h-11.5l-2.25 6h-4.5l7.5-20zm5 3.5L16.25 22h7.5L20 15z" />
              </svg>
            </Link>
          </div>

          <nav className="hidden xl:flex items-center gap-7 text-[15px] text-[#4d4d4d] font-medium">
            <Link
              to="/used-cars"
              className="hover:text-blue-700 transition-colors pointer-events-none"
            >
              Used Cars
            </Link>
            <Link
              to="/new-cars"
              className="hover:text-blue-700 transition-colors pointer-events-none"
            >
              New Cars
            </Link>
            <Link to="/" className="hover:text-blue-700 transition-colors">
              Private Seller Cars
            </Link>
            <Link
              to="/sell-my-car"
              className="hover:text-blue-700 transition-colors pointer-events-none"
            >
              Sell My Car
            </Link>
            <Link
              to="/instant-cash"
              className="hover:text-blue-700 transition-colors pointer-events-none"
            >
              Instant Cash Offer
            </Link>

            <div className="flex items-center cursor-pointer hover:text-blue-700 transition-colors group pointer-events-none">
              <span>Research & Tools</span>
              <svg
                className="w-4 h-4 ml-1 text-gray-500 group-hover:text-blue-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>

            <Link
              to="/ai-mode"
              className="flex items-center hover:text-blue-700 transition-colors pointer-events-none"
            >
              AI Mode
              <span className="ml-2 px-1.5 py-0.5 bg-[#e0f0ff] text-[#004685] text-[11px] font-bold rounded-sm uppercase tracking-wide">
                Beta
              </span>
            </Link>
          </nav>

          <div className="flex items-center gap-6 pointer-events-none">
            <button
              className="text-gray-600 hover:text-blue-700 transition-colors p-1"
              aria-label="Saved Cars"
            >
              <svg
                className="w-5.5 h-5.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 10v6m0 0l-2-2m2 2l2-2"
                />
              </svg>
            </button>

            <button className="flex items-center gap-2 text-[#4d4d4d] font-medium hover:text-blue-700 transition-colors">
              <span>Sign In</span>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
};
