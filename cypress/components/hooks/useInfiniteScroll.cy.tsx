import { useInfiniteScroll } from "../../../src/hooks/useInfiniteScroll";

const HookTester = ({
  isLoading,
  hasMore,
  onLoadMore,
}: {
  isLoading: boolean;
  hasMore: boolean;
  onLoadMore: () => void;
}) => {
  const lastElementRef = useInfiniteScroll(isLoading, hasMore, onLoadMore);

  return (
    <div>
      <div data-cy="last-item" ref={lastElementRef}>
        Last item
      </div>
    </div>
  );
};

describe("Hook: useInfiniteScroll", () => {
  beforeEach(() => {
    class MockIntersectionObserver {
      callback: IntersectionObserverCallback;

      constructor(callback: IntersectionObserverCallback) {
        this.callback = callback;
      }

      disconnect() {}

      observe() {
        this.callback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
      }

      unobserve() {}

      takeRecords(): IntersectionObserverEntry[] {
        return [];
      }

      root = null;
      rootMargin = "0px";
      thresholds = [0];
    }

    (
      window as unknown as { IntersectionObserver: typeof IntersectionObserver }
    ).IntersectionObserver =
      MockIntersectionObserver as unknown as typeof IntersectionObserver;
  });

  it("calls onLoadMore when last element intersects and hasMore is true", () => {
    const onLoadMore = cy.stub().as("onLoadMore");
    cy.mount(
      <HookTester isLoading={false} hasMore={true} onLoadMore={onLoadMore} />,
    );
    cy.get("@onLoadMore").should("have.been.calledOnce");
  });

  it("does not call onLoadMore when hasMore is false", () => {
    const onLoadMore = cy.stub().as("onLoadMore");
    cy.mount(
      <HookTester isLoading={false} hasMore={false} onLoadMore={onLoadMore} />,
    );
    cy.get("@onLoadMore").should("not.have.been.called");
  });

  it("does not create observer when loading", () => {
    const onLoadMore = cy.stub().as("onLoadMore");
    cy.mount(
      <HookTester isLoading={true} hasMore={true} onLoadMore={onLoadMore} />,
    );
    cy.get("@onLoadMore").should("not.have.been.called");
  });
});
