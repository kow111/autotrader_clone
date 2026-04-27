import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { setFilter, clearFilters } from "../../../src/store/carSlice";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { store } from "../../../src/store/store";
import { useDebouncedFilter } from "../../../src/hooks/useDebouncedFilter";

const HookTester = () => {
  const dispatch = useAppDispatch();
  const reduxKeyword = useAppSelector((state) => state.cars.filters.keyword);
  const [localKeyword, setLocalKeyword] = useDebouncedFilter(
    "keyword",
    reduxKeyword,
    300,
  );

  return (
    <div>
      <p data-cy="local-keyword">{localKeyword || "null"}</p>
      <p data-cy="redux-keyword">{reduxKeyword || "null"}</p>

      <input
        data-cy="keyword-input"
        value={localKeyword ?? ""}
        onChange={(event) => setLocalKeyword(event.target.value)}
      />

      <button
        data-cy="set-redux-keyword"
        onClick={() => dispatch(setFilter({ keyword: "Toyota" }))}
      >
        Set Redux Keyword
      </button>
    </div>
  );
};

describe("Hook: useDebouncedFilter", () => {
  beforeEach(() => {
    store.dispatch(clearFilters());
    cy.clock();
  });

  it("updates local value immediately and redux value after debounce", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    cy.get('[data-cy="keyword-input"]').type("Honda");
    cy.get('[data-cy="local-keyword"]').should("have.text", "Honda");
    cy.get('[data-cy="redux-keyword"]').should("have.text", "null");

    cy.tick(300);
    cy.get('[data-cy="redux-keyword"]').should("have.text", "Honda");
  });

  it("syncs local value when redux value changes externally", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    cy.get('[data-cy="set-redux-keyword"]').click();
    cy.get('[data-cy="redux-keyword"]').should("have.text", "Toyota");
    cy.get('[data-cy="local-keyword"]').should("have.text", "Toyota");
  });
});
