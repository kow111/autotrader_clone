import { useRef } from "react";

export const useScroll = ({ scrollAmount }: { scrollAmount: number }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return {
    scrollContainerRef,
    handleScroll,
  };
};
