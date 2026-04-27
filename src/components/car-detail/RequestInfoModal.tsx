import { useEffect } from "react";
import type { Car } from "@/types/type";
import RequestForm from "./RequestForm";

interface RequestInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  car: Car | null;
}

export const RequestInfoModal: React.FC<RequestInfoModalProps> = ({
  isOpen,
  onClose,
  car,
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

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!isOpen || !car) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-opacity">
      <div className="absolute inset-0" onClick={onClose}></div>
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        <RequestForm car={car} />
      </div>
    </div>
  );
};
