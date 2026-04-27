import { Heart } from "lucide-react";

import type { Car } from "@/types/type";

interface CarCardMediaProps {
  car: Car;
}

export const CarCardMedia = ({ car }: CarCardMediaProps) => (
  <div className="relative h-48 bg-gray-100 group cursor-pointer">
    <img
      src={
        car.images && car.images.length > 0
          ? car.images[0]
          : "/placeholder-car.jpg"
      }
      alt={`${car.year} ${car.make} ${car.model}`}
      className="w-full h-full object-cover"
    />
    <button className="absolute top-3 right-3 p-1.5 bg-white/90 rounded-full shadow-sm text-gray-500 hover:text-red-500 transition-colors z-10">
      <Heart size={18} strokeWidth={2} />
    </button>
    {car.isSponsored && (
      <span className="absolute top-3 left-3 bg-gray-800 text-white text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider">
        Sponsored
      </span>
    )}
  </div>
);
