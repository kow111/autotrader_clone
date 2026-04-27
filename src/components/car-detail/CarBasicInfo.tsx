// components/detail/CarBasicInfo.tsx
import { Car } from "@/types/type";

interface Props {
  car: Car;
}

export const CarBasicInfo: React.FC<Props> = ({ car }) => {
  return (
    <div className="mt-6">
      <h1 className="text-[28px] font-black text-[#004685] leading-tight">
        {car.condition} {car.year} {car.make} {car.model} {car.trim}{" "}
        {car.driveType}
      </h1>
      <p className="text-gray-600 mt-1 text-[15px] flex items-center gap-1">
        📍 {car.dealerName} •{" "}
        <a href="#" className="text-[#004685] hover:underline">
          View delivery details
        </a>
      </p>

      <div className="flex flex-wrap items-center gap-6 mt-6 bg-[#f8f9fa] p-4 rounded-md text-[15px] font-medium text-gray-800 border border-gray-200">
        <span className="flex items-center gap-2">
          📏 {car.mileage.toLocaleString()} mi
        </span>
        <span className="flex items-center gap-2">📄 Vehicle History</span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-blue-900 border border-gray-300"></span>{" "}
          Night Blue Metallic Exterior
        </span>
        <span className="flex items-center gap-2">
          <span className="w-4 h-4 rounded-full bg-black border border-gray-300"></span>{" "}
          Black Leather Seats
        </span>
      </div>
    </div>
  );
};
