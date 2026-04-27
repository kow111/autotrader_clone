import { MoreHorizontal } from "lucide-react";

import type { Car } from "@/types/type";

interface CarCardDealerFooterProps {
  car: Car;
  onRequestInfo?: () => void;
}

export const CarCardDealerFooter = ({
  car,
  onRequestInfo,
}: CarCardDealerFooterProps) => (
  <div className="p-4 bg-white">
    <p className="text-[10px] text-gray-500 truncate">
      Sponsored by {car.dealerName}
    </p>
    <p className="text-[11px] text-gray-500 mt-0.5">{car.dealerPhone}</p>

    <div className="mt-2 mb-3 min-h-4">
      {car.hasOnlinePaperwork && (
        <span className="text-[11px] font-bold text-gray-800">
          Online Paperwork
        </span>
      )}
    </div>

    <div className="flex gap-2">
      <button
        className="flex-1 bg-white border border-blue-500 text-blue-500 font-bold py-1.5 rounded hover:bg-blue-50 transition-colors text-sm cursor-pointer"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();

          if (onRequestInfo) {
            onRequestInfo();
          }
        }}
      >
        Request Info
      </button>
      <button className="px-3 border  border-blue-500 text-blue-500 rounded hover:bg-gray-50 flex items-center justify-center">
        <MoreHorizontal size={18} />
      </button>
    </div>
  </div>
);
