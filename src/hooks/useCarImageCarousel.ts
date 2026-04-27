import { useEffect, useMemo, useState } from "react";

const FIRST_PAGE_COUNT = 3;
const OTHER_PAGE_COUNT = 6;

export const useCarImageCarousel = ({ images }: { images: string[] }) => {
  const getIsMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth < 768;
  };

  const [page, setPage] = useState(0);
  const [fullscreenIndex, setFullscreenIndex] = useState<number | null>(null);

  const [isMobile, setIsMobile] = useState(getIsMobile);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkMobile = () => setIsMobile(window.innerWidth < 768);

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const maxPage = useMemo(() => {
    if (images.length === 0) return 0;

    if (isMobile) {
      return images.length - 1;
    }

    return Math.max(
      0,
      Math.ceil((images.length - FIRST_PAGE_COUNT) / OTHER_PAGE_COUNT),
    );
  }, [isMobile, images.length]);

  const safePage = Math.min(page, maxPage);
  const safeFullscreenIndex =
    images.length === 0
      ? null
      : fullscreenIndex === null
        ? null
        : Math.min(fullscreenIndex, images.length - 1);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (safeFullscreenIndex === null || images.length === 0) return;
      if (e.key === "Escape") setFullscreenIndex(null);
      if (e.key === "ArrowRight") {
        setFullscreenIndex((prev) =>
          Math.min(images.length - 1, (prev || 0) + 1),
        );
      }
      if (e.key === "ArrowLeft") {
        setFullscreenIndex((prev) => Math.max(0, (prev || 0) - 1));
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [safeFullscreenIndex, images.length]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    if (safeFullscreenIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [safeFullscreenIndex]);

  const handlePrev = () => setPage((p) => Math.max(0, p - 1));
  const handleNext = () => {
    if (maxPage === 0) {
      setPage(0);
      return;
    }

    if (safePage === maxPage) {
      setPage(0);
    } else {
      setPage((p) => Math.min(maxPage, Math.min(p, maxPage) + 1));
    }
  };

  return {
    fullscreenIndex: safeFullscreenIndex,
    setFullscreenIndex,
    handleNext,
    handlePrev,
    page: safePage,
    isMobile,
    maxPage,
  };
};
