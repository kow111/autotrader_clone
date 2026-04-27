// components/detail/CarPricingBox.tsx
import { formatMoney } from "@/utils/formatMoney";

interface Props {
  price: number;
  paymentType: "Finance" | "Cash";
  onPaymentTypeChange: (type: "Finance" | "Cash") => void;
  className?: string; // Để cho phép component cha truyền thêm class (như block lg:hidden)
}

export const CarPricingBox: React.FC<Props> = ({
  price,
  paymentType,
  onPaymentTypeChange,
  className = "",
}) => {
  return (
    <div className={className}>
      <div className="mb-4">
        <h2 className="text-[32px] font-black text-gray-900 leading-none">
          {formatMoney(price)}
        </h2>
        <a
          href="#"
          className="text-sm text-[#004685] hover:underline font-semibold mt-1 inline-block"
        >
          See price and payment details
        </a>
      </div>

      <div className="flex rounded-lg border border-gray-300 overflow-hidden mb-2">
        <button
          onClick={() => onPaymentTypeChange("Finance")}
          className={`flex-1 py-3 text-center flex flex-col items-center justify-center border-r border-gray-300 transition-colors ${paymentType === "Finance" ? "bg-blue-50/50" : "bg-white hover:bg-gray-50"}`}
        >
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <input
              type="radio"
              checked={paymentType === "Finance"}
              readOnly
              className="w-3.5 h-3.5 text-[#004685]"
            />{" "}
            Finance
          </span>
          <span className="text-lg font-bold text-gray-900">
            $2,919
            <span className="text-sm font-normal text-gray-500">/mo.</span>
          </span>
        </button>
        <button
          onClick={() => onPaymentTypeChange("Cash")}
          className={`flex-1 py-3 text-center flex flex-col items-center justify-center transition-colors ${paymentType === "Cash" ? "bg-blue-50/50" : "bg-white hover:bg-gray-50"}`}
        >
          <span className="text-sm text-gray-600 flex items-center gap-1">
            <input
              type="radio"
              checked={paymentType === "Cash"}
              readOnly
              className="w-3.5 h-3.5 text-[#004685]"
            />{" "}
            Cash
          </span>
          <span className="text-lg font-bold text-gray-900">
            {formatMoney(price)}
          </span>
        </button>
      </div>

      <div className="bg-[#f8f9fa] text-gray-600 text-sm p-3 rounded-md mb-2 border border-gray-200">
        10.24% APR for 72 mo.
      </div>
    </div>
  );
};
