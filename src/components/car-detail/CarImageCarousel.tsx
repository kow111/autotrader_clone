import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCarImageCarousel } from "@/hooks/useCarImageCarousel";

import { FullscreenViewer } from "./FullscreenViewer";
import * as React from "react";
import {
  ACTION_AUTOCHECK,
  ACTION_REQUEST_INFO,
  CarouselGridItem,
} from "../car-list/CarouselGridItem";

const FIRST_PAGE_COUNT = 3;
const OTHER_PAGE_COUNT = 6;

type Props = {
  images: string[];
};

export default function CarImageCarousel({ images }: Props) {
  const carouselItems = [...images, ACTION_REQUEST_INFO, ACTION_AUTOCHECK];

  const {
    fullscreenIndex,
    setFullscreenIndex,
    handleNext,
    handlePrev,
    page,
    isMobile,
    maxPage,
  } = useCarImageCarousel({ images });

  const renderFirstPage = () => {
    const firstItems = carouselItems.slice(0, 3);
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 w-full shrink-0">
        <div className="col-span-2 aspect-4/3">
          <CarouselGridItem
            item={firstItems[0]}
            originalImageIndex={0}
            onImageClick={setFullscreenIndex}
          />
        </div>
        <div className="grid grid-rows-2 gap-1">
          {firstItems.slice(1).map((item, idx) => (
            <div key={idx} className="aspect-4/3">
              <CarouselGridItem
                item={item}
                originalImageIndex={idx + 1}
                onImageClick={setFullscreenIndex}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderOtherPages = (pageIndex: number) => {
    const start = FIRST_PAGE_COUNT + (pageIndex - 1) * OTHER_PAGE_COUNT;
    const pageItems = carouselItems.slice(start, start + OTHER_PAGE_COUNT);
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-1 w-full shrink-0">
        {pageItems.map((item, idx) => (
          <div key={idx} className="aspect-4/3">
            <CarouselGridItem
              item={item}
              originalImageIndex={start + idx}
              onImageClick={setFullscreenIndex}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      <div className="relative group bg-gray-100 overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${page * 100}%)` }}
        >
          {isMobile
            ? carouselItems.map((item, idx) => (
                <div
                  key={idx}
                  className="w-full shrink-0 aspect-4/3 relative cursor-pointer"
                >
                  <CarouselGridItem
                    item={item}
                    originalImageIndex={idx}
                    onImageClick={setFullscreenIndex}
                  />

                  {item !== ACTION_REQUEST_INFO &&
                    item !== ACTION_AUTOCHECK && (
                      <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full pointer-events-none">
                        {idx + 1} / {images.length}
                      </div>
                    )}
                </div>
              ))
            : Array.from({ length: maxPage + 1 }).map((_, idx) => (
                <React.Fragment key={idx}>
                  {idx === 0 ? renderFirstPage() : renderOtherPages(idx)}
                </React.Fragment>
              ))}
        </div>

        {page > 0 && (
          <button
            onClick={handlePrev}
            className="cursor-pointer absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md transition duration-200 hover:bg-white z-10"
          >
            <ChevronLeft size={20} />
          </button>
        )}
        {maxPage > 0 && (
          <button
            onClick={handleNext}
            className="cursor-pointer absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center shadow-md transition duration-200 hover:bg-white z-10"
          >
            <ChevronRight size={20} />
          </button>
        )}
      </div>

      {fullscreenIndex !== null && (
        <FullscreenViewer
          images={images}
          currentIndex={fullscreenIndex}
          onClose={() => setFullscreenIndex(null)}
          onIndexChange={setFullscreenIndex}
        />
      )}
    </>
  );
}
