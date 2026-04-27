import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { carApi } from "../../../src/services/api";
import { clearFilters, setFilter } from "../../../src/store/carSlice";
import { useAppDispatch } from "../../../src/store/hooks";
import { store } from "../../../src/store/store";
import { useSearchPage } from "../../../src/hooks/useSearchPage";

const mockCar = {
  id: 1,
  make: "Toyota",
  model: "Camry",
  trim: "LE",
  year: 2024,
  price: 25000,
  mileage: 12000,
  condition: "Used",
  fuelType: "Gasoline",
  driveType: "FWD",
  images: [],
  isSponsored: false,
  priceRating: "Good Price",
  badges: [],
  dealerName: "Autotrader Dealer",
  dealerPhone: "(555) 111-2222",
  hasOnlinePaperwork: true,
  features: [],
};

const HookTester = () => {
  const dispatch = useAppDispatch();
  const {
    items,
    status,
    sortBy,
    totalResults,
    isModalOpen,
    selectedCar,
    handleSortChange,
    handleOpenModal,
    handleCloseModal,
    handleClearFilters,
  } = useSearchPage();

  return (
    <div>
      <p data-cy="status">{status}</p>
      <p data-cy="items-count">{items.length}</p>
      <p data-cy="total-results">{totalResults}</p>
      <p data-cy="sort-by">{sortBy}</p>
      <p data-cy="modal-open">{isModalOpen ? "true" : "false"}</p>
      <p data-cy="selected-car">{selectedCar ? selectedCar.id : "none"}</p>

      <select data-cy="sort-select" value={sortBy} onChange={handleSortChange}>
        <option value="recommended">recommended</option>
        <option value="price_desc">price_desc</option>
      </select>

      <button data-cy="open-modal" onClick={() => handleOpenModal(mockCar)}>
        Open Modal
      </button>
      <button data-cy="close-modal" onClick={handleCloseModal}>
        Close Modal
      </button>
      <button
        data-cy="set-keyword"
        onClick={() => dispatch(setFilter({ keyword: "Toyota" }))}
      >
        Set Keyword
      </button>
      <button data-cy="clear-filters" onClick={handleClearFilters}>
        Clear Filters
      </button>
    </div>
  );
};

describe("Hook: useSearchPage", () => {
  beforeEach(() => {
    store.dispatch(clearFilters());

    cy.stub(carApi, "fetchCars")
      .resolves({
        cars: [mockCar],
        totalResults: 1,
        hasMore: false,
      })
      .as("fetchCarsStub");
  });

  it("loads cars through useCarSearchSync and updates list state", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    cy.get("@fetchCarsStub").should("have.been.called");
    cy.get('[data-cy="status"]').should("have.text", "succeeded");
    cy.get('[data-cy="items-count"]').should("have.text", "1");
    cy.get('[data-cy="total-results"]').should("have.text", "1");
  });

  it("changes sort and manages request modal state", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    cy.get('[data-cy="sort-select"]').select("price_desc");
    cy.get('[data-cy="sort-by"]').should("have.text", "price_desc");

    cy.get('[data-cy="open-modal"]').click();
    cy.get('[data-cy="modal-open"]').should("have.text", "true");
    cy.get('[data-cy="selected-car"]').should("have.text", "1");

    cy.get('[data-cy="close-modal"]').click();
    cy.get('[data-cy="modal-open"]').should("have.text", "false");
    cy.get('[data-cy="selected-car"]').should("have.text", "none");
  });

  it("clears filters through handleClearFilters", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    cy.get('[data-cy="set-keyword"]').click();
    cy.get('[data-cy="clear-filters"]').click();

    cy.then(() => {
      expect(store.getState().cars.filters.keyword).to.equal(null);
    });
  });
});
