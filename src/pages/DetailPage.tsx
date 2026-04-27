import { CarBasicInfo } from "@/components/car-detail/CarBasicInfo";
import { CarFeatures } from "@/components/car-detail/CarFeatures";
import CarImageCarousel from "@/components/car-detail/CarImageCarousel";
import { CarPricingBox } from "@/components/car-detail/CarPricingBox";
import { CarReviews } from "@/components/car-detail/CarReviews";
import { DetailSkeleton } from "@/components/car-detail/DetailSkeleton";
import { MoreFromTheSeller } from "@/components/car-detail/MoreFromTheSeller";
import { PeaceOfMind } from "@/components/car-detail/PeaceOfMind";
import RequestForm from "@/components/car-detail/RequestForm";
import { SimilarCarsFromDealer } from "@/components/car-detail/SimilarCarsFromDealer";
import { ApiErrorState } from "@/components/shared/ApiErrorState";
import { useCarDetail } from "@/hooks/useCarDetail";
import { ChevronLeft } from "lucide-react";

export const DetailPage: React.FC = () => {
  const {
    car,
    error,
    isLoading,
    similarCars,
    paymentType,
    setPaymentType,
    handleBackToResults,
    handleRetry,
  } = useCarDetail();

  if (isLoading) return <DetailSkeleton />;

  if (error || !car) {
    return (
      <div className="max-w-350 mx-auto pt-4 px-4 sm:px-6 lg:px-0 min-h-[50vh]">
        <button
          onClick={handleBackToResults}
          className="text-[#004685] hover:underline flex items-center gap-1 mb-4"
        >
          <ChevronLeft size={16} /> Back to results
        </button>

        <ApiErrorState
          title="Failed to load car detail"
          message={error || "Unable to load this car."}
          onRetry={handleRetry}
        />
      </div>
    );
  }

  return (
    <div className="bg-white">
      <div className="max-w-350 mx-auto pt-4 min-h-screen font-sans">
        <div className="flex justify-between items-center mb-4 text-sm ">
          <button
            onClick={handleBackToResults}
            className="text-[#004685] hover:underline flex items-center gap-1"
          >
            <ChevronLeft size={16} /> Back to results
          </button>
        </div>

        <div className="flex flex-col lg:flex-row lg:gap-8">
          <div className="grow w-full lg:w-[65%]">
            <CarImageCarousel images={car.images} />

            <div className="flex gap-4 mt-3 text-sm text-[#004685] font-semibold">
              <button className="hover:underline flex items-center gap-1">
                360° Tour
              </button>
              <button className="hover:underline flex items-center gap-1">
                {car.images.length} Photos
              </button>
              <button className="hover:underline flex items-center gap-1">
                1 Video
              </button>
            </div>

            <CarBasicInfo car={car} />

            <CarPricingBox
              price={car.price}
              paymentType={paymentType}
              onPaymentTypeChange={setPaymentType}
              className="block lg:hidden mt-6"
            />

            <CarFeatures car={car} />
            <MoreFromTheSeller car={car} />
          </div>

          <div className="w-full lg:w-[35%] relative">
            <div className="sticky top-6">
              <div className="hidden lg:block">
                <CarPricingBox
                  price={car.price}
                  paymentType={paymentType}
                  onPaymentTypeChange={setPaymentType}
                />
              </div>

              <RequestForm car={car} />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-350 mx-auto">
        <CarReviews car={car} />
      </div>

      <PeaceOfMind />

      <div className="max-w-350 mx-auto">
        <SimilarCarsFromDealer mainCar={car} similarCars={similarCars} />
      </div>
    </div>
  );
};
