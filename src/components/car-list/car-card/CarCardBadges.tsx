import type { Car } from "@/types/type";

interface CarCardBadgesProps {
  car: Car;
  isSimilar?: boolean;
}

export const CarCardBadges = ({ car, isSimilar }: CarCardBadgesProps) => (
  <div className="mt-auto flex gap-2 flex-wrap">
    {car.priceRating === "Great Price" && (
      <span className="bg-[#107c41] text-white text-xs font-bold px-2 py-1 rounded-sm">
        Great Price
      </span>
    )}
    {car.priceRating === "Good Price" && (
      <span className="bg-[#e8f5e9] text-[#107c41] text-xs font-bold px-2 py-1 rounded-sm">
        Good Price
      </span>
    )}
    {!isSimilar &&
      car.badges.map((badge, idx) => (
        <span
          key={idx}
          className={`text-xs font-semibold px-2 py-1 rounded-sm ${badge === "Incentive" ? "bg-[#e8f5e9] text-[#107c41]" : "bg-[#e8f0fe] text-[#0b57d0]"}`}
        >
          {badge}
        </span>
      ))}
  </div>
);
