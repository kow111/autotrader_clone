import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  X,
  Home,
  Car,
  CarFront,
  Handshake,
  Tags,
  Banknote,
  GraduationCap,
  Sparkles,
  ChevronDown,
} from "lucide-react";

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MobileDrawer: React.FC<MobileDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <div
        className={`fixed top-0 left-0 h-full w-75 sm:w-87.5 bg-white z-70  transform transition-transform duration-300 ease-in-out flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="p-1 text-gray-500 hover:text-gray-800 transition-colors"
          >
            <X size={24} strokeWidth={1.5} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <nav className="flex flex-col">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Home size={22} className="text-[#f06c00]" strokeWidth={1.5} />
              <span className="text-[#333] text-[15px] font-medium">Home</span>
            </Link>

            <Link
              to="/used-cars"
              onClick={onClose}
              className="flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <CarFront
                size={22}
                className="text-[#f06c00]"
                strokeWidth={1.5}
              />
              <span className="text-[#333] text-[15px] font-medium">
                Used Cars
              </span>
            </Link>

            <Link
              to="/new-cars"
              onClick={onClose}
              className="flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Car size={22} className="text-[#f06c00]" strokeWidth={1.5} />
              <span className="text-[#333] text-[15px] font-medium">
                New Cars
              </span>
            </Link>

            <Link
              to="/private-seller"
              onClick={onClose}
              className="flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Handshake
                size={22}
                className="text-[#f06c00]"
                strokeWidth={1.5}
              />
              <span className="text-[#333] text-[15px] font-medium">
                Private Seller Cars
              </span>
            </Link>

            <Link
              to="/sell-my-car"
              onClick={onClose}
              className="flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Tags size={22} className="text-[#f06c00]" strokeWidth={1.5} />
              <span className="text-[#333] text-[15px] font-medium">
                Sell My Car
              </span>
            </Link>

            <Link
              to="/instant-cash"
              onClick={onClose}
              className="flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Banknote
                size={22}
                className="text-[#f06c00]"
                strokeWidth={1.5}
              />
              <span className="text-[#333] text-[15px] font-medium">
                Instant Cash Offer
              </span>
            </Link>

            {/* Mục có Dropdown */}
            <div className="flex items-center justify-between py-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center gap-4">
                <GraduationCap
                  size={22}
                  className="text-[#f06c00]"
                  strokeWidth={1.5}
                />
                <span className="text-[#333] text-[15px] font-medium">
                  Research & Tools
                </span>
              </div>
              <ChevronDown
                size={20}
                className="text-[#f06c00]"
                strokeWidth={1.5}
              />
            </div>

            {/* Mục AI Mode với Badge Beta */}
            <Link
              to="/ai-mode"
              onClick={onClose}
              className="flex items-center gap-4 py-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
              <Sparkles
                size={22}
                className="text-[#f06c00]"
                strokeWidth={1.5}
              />
              <div className="flex items-center gap-2">
                <span className="text-[#333] text-[15px] font-medium">
                  AI Mode
                </span>
                <span className="px-1.5 py-0.5 bg-[#e0f0ff] text-[#004685] text-[10px] font-bold rounded-sm uppercase tracking-wider">
                  Beta
                </span>
              </div>
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
};
