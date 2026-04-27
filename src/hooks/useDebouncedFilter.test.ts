import { act, renderHook } from "@testing-library/react";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { createElement } from "react";
import type { PropsWithChildren } from "react";
import { describe, expect, it, jest } from "@jest/globals";

import carReducer from "@/store/carSlice";
import { useDebouncedFilter } from "./useDebouncedFilter";

describe("useDebouncedFilter", () => {
  it("dispatches filter update after debounce delay", () => {
    jest.useFakeTimers();

    const store = configureStore({
      reducer: { cars: carReducer },
    });

    const wrapper = ({ children }: PropsWithChildren) =>
      createElement(Provider, { store, children });

    const { result } = renderHook(
      () => useDebouncedFilter("keyword", null, 500),
      { wrapper },
    );

    act(() => {
      result.current[1]("toyota");
    });

    act(() => {
      jest.advanceTimersByTime(499);
    });

    expect(store.getState().cars.filters.keyword).toBeNull();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(store.getState().cars.filters.keyword).toBe("toyota");
    jest.useRealTimers();
  });

  it("syncs local value when redux value changes", () => {
    const store = configureStore({
      reducer: { cars: carReducer },
    });

    const wrapper = ({ children }: PropsWithChildren) =>
      createElement(Provider, { store, children });

    const { result, rerender } = renderHook(
      ({ value }) => useDebouncedFilter("keyword", value, 300),
      {
        initialProps: { value: null as string | null },
        wrapper,
      },
    );

    act(() => {
      result.current[1]("honda");
    });

    rerender({ value: "bmw" });

    expect(result.current[0]).toBe("bmw");
  });
});
