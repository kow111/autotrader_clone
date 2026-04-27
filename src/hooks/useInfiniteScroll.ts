import { useCallback, useEffect, useRef } from "react";

export const useInfiniteScroll = (
  isLoading: boolean,
  hasMore: boolean,
  onLoadMore: () => void,
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const hasTriggeredRef = useRef(false);

  useEffect(() => {
    if (!isLoading) {
      hasTriggeredRef.current = false;
    }
  }, [isLoading]);

  useEffect(() => {
    return () => {
      observer.current?.disconnect();
    };
  }, []);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (
          entries[0].isIntersecting &&
          hasMore &&
          !isLoading &&
          !hasTriggeredRef.current
        ) {
          hasTriggeredRef.current = true;
          onLoadMore();
        }
      });

      if (node) observer.current.observe(node);
    },
    [isLoading, hasMore, onLoadMore],
  );

  return lastElementRef;
};
