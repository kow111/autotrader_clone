import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, jest } from "@jest/globals";

import carReducer from "@/store/carSlice";
import ActiveFilter from "./ActiveFilter";

jest.mock("@/store/filterOptionsApi", () => ({
  useGetFilterOptionsQuery: () => ({
    data: {
      make: [],
      condition: [],
      driveType: [],
      fuelType: [],
      priceRating: [],
      features: [{ id: 1, name: "Sunroof", category: "COMFORT" }],
    },
  }),
}));

describe("ActiveFilter", () => {
  it("renders active pills and removes them on click", () => {
    const baseCarsState = carReducer(undefined, { type: "@@INIT" });

    const store = configureStore({
      reducer: { cars: carReducer },
      preloadedState: {
        cars: {
          ...baseCarsState,
          filters: {
            ...baseCarsState.filters,
            keyword: "civic",
            features: ["1"],
            onlinePaper: true,
          },
        },
      },
    });

    render(
      <Provider store={store}>
        <ActiveFilter />
      </Provider>,
    );

    expect(screen.getByText("Keyword: civic")).toBeTruthy();
    expect(screen.getByText("Sunroof")).toBeTruthy();
    expect(screen.getByText("Buy 100% online")).toBeTruthy();

    fireEvent.click(screen.getByText("Sunroof"));
    expect(screen.queryByText("Sunroof")).toBeNull();

    fireEvent.click(screen.getByText("Keyword: civic"));
    expect(screen.queryByText("Keyword: civic")).toBeNull();
  });
});
