import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import type { Car } from "@/types/type";

interface MoreFromTheSellerProps {
  car: Car;
}

export const MoreFromTheSeller: React.FC<MoreFromTheSellerProps> = ({
  car,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const stockNumber = "05P2013";
  const vin = "1G1ZD5ST3SF118553";

  return (
    <div className="mt-8">
      <h2 className="text-3xl font-bold text-[#002b5e] mb-2">
        More from the seller
      </h2>

      <div className="text-[15px] text-gray-500 mb-6">
        <span>Stock#: {stockNumber}</span>
        <span className="mx-3">|</span>
        <span>VIN: {vin}</span>
      </div>

      <div className="relative">
        <div
          className={`text-[#333] text-[15px] leading-relaxed transition-all duration-300 ${
            isExpanded ? "" : "max-h-35 overflow-hidden"
          }`}
        >
          {/* Nội dung mô tả (Giả lập dựa theo ảnh của bạn) */}
          <div className="space-y-4">
            <p>
              {car.year} {car.make} {car.model} {car.trim} Mineral Gray Metallic{" "}
              {car.driveType} 1.5L DOHC
              <br />
              Recent Arrival! Clean CARFAX. CARFAX One Owner.
            </p>

            <ul className="space-y-1">
              <li>Rear parking sensors and backup camera</li>
              <li>Heated front seats</li>
              <li>Navigation system</li>
              <li>Apple CarPlay and Android Auto compatibility</li>
              <li>1.5L turbocharged engine with automatic transmission</li>
              <li>Multi-zone climate control air conditioning</li>
              <li>Power adjustable driver's seat</li>
              <li>Lane keep assist with lane departure warning</li>
            </ul>
          </div>
        </div>

        {/* Hiệu ứng Fade-out (Mờ dần phần đuôi chữ): 
          Chỉ hiển thị khi đang bị thu gọn (!isExpanded)
        */}
        {!isExpanded && (
          <div className="absolute bottom-0 left-0 right-0 h-16 bg-linear-to-t from-white to-transparent pointer-events-none"></div>
        )}
      </div>

      {/* Nút Toggle (See More / See Less) */}
      <div className="flex justify-center mt-2">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-[#004685] font-medium text-[15px] hover:underline"
        >
          {isExpanded ? (
            <>
              See Less <ChevronUp size={18} />
            </>
          ) : (
            <>
              See More <ChevronDown size={18} />
            </>
          )}
        </button>
      </div>
    </div>
  );
};
