import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";

import { useInfiniteScroll } from "./useInfiniteScroll";

describe("useInfiniteScroll", () => {
  it("triggers load more once per loading cycle", () => {
    const onLoadMore = jest.fn();
    let observerCallback: IntersectionObserverCallback | null = null;

    class MockIntersectionObserver implements IntersectionObserver {
      readonly root = null;
      readonly rootMargin = "";
      readonly scrollMargin = "";
      readonly thresholds = [];

      constructor(callback: IntersectionObserverCallback) {
        observerCallback = callback;
      }

      disconnect = jest.fn();
      observe = jest.fn();
      takeRecords = jest.fn(() => []);
      unobserve = jest.fn();
    }

    Object.defineProperty(global, "IntersectionObserver", {
      writable: true,
      configurable: true,
      value: MockIntersectionObserver,
    });

    const node = document.createElement("div");

    const { result, rerender } = renderHook(
      ({ isLoading }) => useInfiniteScroll(isLoading, true, onLoadMore),
      {
        initialProps: { isLoading: false },
      },
    );

    act(() => {
      result.current(node);
    });

    act(() => {
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(onLoadMore).toHaveBeenCalledTimes(1);

    rerender({ isLoading: true });
    rerender({ isLoading: false });

    act(() => {
      result.current(node);
      observerCallback?.(
        [{ isIntersecting: true } as IntersectionObserverEntry],
        {} as IntersectionObserver,
      );
    });

    expect(onLoadMore).toHaveBeenCalledTimes(2);
  });
});
