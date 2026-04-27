import { Star, Sparkles } from "lucide-react";
import type { Car } from "@/types/type";

interface CarReviewsProps {
  car: Car;
}

export const CarReviews: React.FC<CarReviewsProps> = ({ car }) => {
  const stats = [
    { label: "Value", score: 4.0 },
    { label: "Performance", score: 3.9 },
    { label: "Quality", score: 3.8 },
    { label: "Comfort", score: 4.1 },
    { label: "Reliability", score: 3.9 },
    { label: "Styling", score: 4.3 },
  ];

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={18}
            className={`${
              star <= Math.round(rating)
                ? "fill-yellow-400 text-yellow-400"
                : "text-gray-300"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-[#002b5e] mb-1">
        What people are saying about the {car.make} {car.model} {car.trim}
      </h2>
      <p className="text-sm font-bold text-gray-600 mb-6">
        KBB.com® Consumer Ratings & Reviews
      </p>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="bg-[#002b5e] text-white rounded-xl p-6 flex flex-col items-center justify-center lg:w-48 shrink-0">
          <p className="font-bold text-sm mb-2">Average Rating</p>
          <p className="text-5xl font-bold mb-2">3.9</p>
          {renderStars(3.9)}
          <p className="text-xs mt-3 mb-4 text-gray-300">
            Based on 152 reviews
          </p>
          <button className="text-sm font-medium text-blue-300 hover:text-white transition-colors">
            View all reviews
          </button>
        </div>

        <div className="bg-[#f4f8fb] rounded-xl flex-1 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-y-2 gap-x-8 lg:gap-y-3 px-2 lg:px-4 py-2">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-center justify-between">
              <span className="text-[15px] text-gray-700">{stat.label}</span>
              <div className="flex items-center gap-2">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-[15px] text-gray-900 w-6 text-right">
                  {stat.score.toFixed(1)}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-[#ededee] rounded-xl p-6 lg:w-[50%] shrink-0">
          <div className="inline-block px-2 py-1 bg-[#e0f0ff] text-[#004685] text-xs font-semibold rounded mb-4">
            AI Summary
          </div>
          <h3 className="font-bold text-gray-900 mb-2">
            Consumer Feedback Summary
          </h3>
          <p className="text-[15px] text-gray-700 leading-relaxed mb-1 inline">
            The vehicle appears to be a generally well-received and reliable
            midsize sedan, with customers praising its comfortable ride, good
            fuel efficiency, and overall value. Many highlight the car's smooth
            highway performance, spacious interior, and user-friendly...
          </p>
          <button className="text-[#004685] font-medium text-[15px] hover:underline inline ml-1">
            View full summary
          </button>

          <div className="flex items-center gap-2 mt-6 text-gray-500">
            <Sparkles size={16} />
            <span className="text-xs">
              Summarized by AI based on actual reviews from consumers
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
