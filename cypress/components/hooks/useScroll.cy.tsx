import { useEffect } from "react";
import { useScroll } from "../../../src/hooks/useScroll";

const HookTester = () => {
  const { scrollContainerRef, handleScroll } = useScroll({ scrollAmount: 300 });

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy =
        Cypress.sinon.spy() as typeof scrollContainerRef.current.scrollBy;
    }
  }, [scrollContainerRef]);

  return (
    <div>
      <div data-cy="scroll-container" ref={scrollContainerRef} />
      <button data-cy="scroll-left" onClick={() => handleScroll("left")}>
        Left
      </button>
      <button data-cy="scroll-right" onClick={() => handleScroll("right")}>
        Right
      </button>
    </div>
  );
};

describe("Hook: useScroll", () => {
  it("scrolls to the right with configured amount", () => {
    cy.mount(<HookTester />);

    cy.get('[data-cy="scroll-right"]').click();
    cy.get('[data-cy="scroll-container"]').then(($el) => {
      const scrollBy = $el[0]
        .scrollBy as unknown as Cypress.Agent<sinon.SinonSpy>;
      expect(scrollBy).to.have.been.calledWith({
        left: 300,
        behavior: "smooth",
      });
    });
  });

  it("scrolls to the left with configured amount", () => {
    cy.mount(<HookTester />);

    cy.get('[data-cy="scroll-left"]').click();
    cy.get('[data-cy="scroll-container"]').then(($el) => {
      const scrollBy = $el[0]
        .scrollBy as unknown as Cypress.Agent<sinon.SinonSpy>;
      expect(scrollBy).to.have.been.calledWith({
        left: -300,
        behavior: "smooth",
      });
    });
  });
});
