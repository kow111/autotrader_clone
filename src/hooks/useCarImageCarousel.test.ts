import { act, renderHook } from "@testing-library/react";
import { describe, expect, it } from "@jest/globals";

import { useCarImageCarousel } from "./useCarImageCarousel";

describe("useCarImageCarousel", () => {
  it("handles empty image list safely", () => {
    const { result } = renderHook(() => useCarImageCarousel({ images: [] }));

    expect(result.current.maxPage).toBe(0);
    expect(result.current.page).toBe(0);

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.page).toBe(0);
  });

  it("cycles pages correctly on desktop", () => {
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1200,
    });

    const images = Array.from({ length: 10 }, (_, i) => `img-${i}`);
    const { result } = renderHook(() => useCarImageCarousel({ images }));

    expect(result.current.maxPage).toBe(2);

    act(() => {
      result.current.handleNext();
    });
    expect(result.current.page).toBe(1);

    act(() => {
      result.current.handleNext();
    });
    expect(result.current.page).toBe(2);

    act(() => {
      result.current.handleNext();
    });

    expect(result.current.page).toBe(0);
  });

  it("supports keyboard navigation in fullscreen mode", () => {
    const images = ["a", "b", "c"];
    const { result } = renderHook(() => useCarImageCarousel({ images }));

    act(() => {
      result.current.setFullscreenIndex(0);
    });

    expect(document.body.style.overflow).toBe("hidden");

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowRight" }));
    });
    expect(result.current.fullscreenIndex).toBe(1);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    });

    expect(result.current.fullscreenIndex).toBeNull();
    expect(document.body.style.overflow).toBe("unset");
  });
});
