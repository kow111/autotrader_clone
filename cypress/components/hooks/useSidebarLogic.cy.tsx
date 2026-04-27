import type { FC } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { carApi } from "../../../src/services/api";
import { clearFilters } from "../../../src/store/carSlice";
import { store } from "../../../src/store/store";
import { useAppSelector } from "../../../src/store/hooks";
import { useSidebarLogic } from "../../../src/hooks/useSidebarLogic";
import type { FilterOptions } from "../../../src/types/type";

const mockFilterOptions: FilterOptions = {
  make: ["Toyota", "Honda"],
  condition: ["New", "Used"],
  driveType: ["FWD", "AWD"],
  fuelType: ["Gasoline", "Hybrid"],
  priceRating: ["Great Price"],
  features: [
    { id: 1, name: "Backup Camera", category: "HIGHLIGHTS" },
    { id: 2, name: "Apple CarPlay", category: "HIGHLIGHTS" },
    { id: 5, name: "Lane Departure Warning", category: "SAFETY" },
    { id: 6, name: "Blind Spot Monitor", category: "SAFETY" },
    { id: 7, name: "Heated Seats", category: "COMFORT" },
  ],
};

const HookTester: FC = () => {
  const {
    keyword,
    setKeyword,
    setMinPrice,
    setMaxPrice,
    validationErrors,
    filterOptions,
    handleCheckboxToggle,
  } = useSidebarLogic();

  const { filters } = useAppSelector((state) => state.cars);

  return (
    <div>
      <p data-cy="feature-count">{filterOptions?.features.length ?? 0}</p>
      <p data-cy="feature-categories">
        {Array.from(
          new Set(
            filterOptions?.features.map((feature) => feature.category) ?? [],
          ),
        ).join(",") || "none"}
      </p>
      <p data-cy="redux-features">{filters.features.join(",") || "none"}</p>
      <p data-cy="redux-keyword">{filters.keyword || "null"}</p>
      <p data-cy="redux-min-price">{filters.minPrice ?? "null"}</p>
      <p data-cy="redux-max-price">{filters.maxPrice ?? "null"}</p>
      <p data-cy="price-error">{validationErrors.priceError || "none"}</p>

      <input
        data-cy="keyword-input"
        value={keyword ?? ""}
        onChange={(event) => setKeyword(event.target.value)}
      />

      <button
        data-cy="toggle-feature-1"
        onClick={() => handleCheckboxToggle("features", "1")}
      >
        Toggle Backup Camera
      </button>

      <button
        data-cy="set-invalid-price"
        onClick={() => {
          setMinPrice(50000);
          setMaxPrice(10000);
        }}
      >
        Set Invalid Price
      </button>
    </div>
  );
};

describe("Hook: useSidebarLogic", () => {
  beforeEach(() => {
    store.dispatch(clearFilters());
    cy.stub(carApi, "getFilter").resolves(mockFilterOptions).as("getFilter");
    cy.clock();
  });

  it("loads feature groups dynamically from API", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    cy.get("@getFilter").should("have.been.calledOnce");
    cy.get('[data-cy="feature-count"]').should("have.text", "5");
    cy.get('[data-cy="feature-categories"]')
      .should("contain.text", "HIGHLIGHTS")
      .and("contain.text", "SAFETY")
      .and("contain.text", "COMFORT");
  });

  it("stores feature IDs and debounced filters in redux", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    cy.get('[data-cy="toggle-feature-1"]').click();
    cy.get('[data-cy="redux-features"]').should("have.text", "1");

    cy.get('[data-cy="keyword-input"]').type("Honda");
    cy.tick(500);
    cy.get('[data-cy="redux-keyword"]').should("have.text", "Honda");

    cy.get('[data-cy="set-invalid-price"]').click();
    cy.tick(500);
    cy.get('[data-cy="redux-min-price"]').should("have.text", "50000");
    cy.get('[data-cy="redux-max-price"]').should("have.text", "10000");
    cy.get('[data-cy="price-error"]').should(
      "contain.text",
      "Min price cannot be greater than Max price.",
    );
  });
});
