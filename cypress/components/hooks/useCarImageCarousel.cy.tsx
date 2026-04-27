import { useCarImageCarousel } from "../../../src/hooks/useCarImageCarousel";
// ==========================================
// 1. WRAPPER COMPONENT (Cái vỏ bọc để in State ra DOM)
// ==========================================
const HookTester: React.FC<{ images: string[] }> = ({ images }) => {
  const {
    page,
    maxPage,
    isMobile,
    fullscreenIndex,
    handleNext,
    handlePrev,
    setFullscreenIndex,
  } = useCarImageCarousel({ images });

  return (
    <div>
      {/* In State ra để Cypress đọc */}
      <p data-cy="page">{page}</p>
      <p data-cy="maxPage">{maxPage}</p>
      <p data-cy="isMobile">{isMobile ? "true" : "false"}</p>
      <p data-cy="fullscreenIndex">
        {fullscreenIndex !== null ? fullscreenIndex : "null"}
      </p>

      {/* Gắn hàm vào nút bấm để Cypress click */}
      <button data-cy="btn-next" onClick={handleNext}>
        Next
      </button>
      <button data-cy="btn-prev" onClick={handlePrev}>
        Prev
      </button>
      <button data-cy="btn-open-fs" onClick={() => setFullscreenIndex(0)}>
        Open FS
      </button>
      <button data-cy="btn-close-fs" onClick={() => setFullscreenIndex(null)}>
        Close FS
      </button>
    </div>
  );
};

// ==========================================
// 2. CYPRESS TEST SUITE
// ==========================================
describe("Hook: useCarImageCarousel", () => {
  // Tạo mảng 10 ảnh giả lập
  const mockImages = Array(10).fill("https://mock-image.com/car.jpg");

  it("tính toán maxPage và isMobile đúng trên Desktop", () => {
    cy.viewport(1280, 720); // Màn hình PC (> 768px)
    cy.mount(<HookTester images={mockImages} />);

    // isMobile phải là false
    cy.get('[data-cy="isMobile"]').should("have.text", "false");

    // Tính maxPage PC: Math.ceil((10 - 3) / 6) = 2
    cy.get('[data-cy="maxPage"]').should("have.text", "2");
  });

  it("tính toán maxPage và isMobile đúng trên Mobile", () => {
    cy.viewport("iphone-x"); // Màn hình Mobile (< 768px)
    cy.mount(<HookTester images={mockImages} />);

    cy.get('[data-cy="isMobile"]').should("have.text", "true");

    // Tính maxPage Mobile: images.length - 1 = 9
    cy.get('[data-cy="maxPage"]').should("have.text", "9");
  });

  it("khóa cuộn trang (body overflow) khi mở Fullscreen", () => {
    cy.mount(<HookTester images={mockImages} />);

    // Ban đầu body phải scroll bình thường (unset)
    cy.document().its("body").should("have.css", "overflow", "visible"); // Cypress render unset thành visible

    // Mở Fullscreen
    cy.get('[data-cy="btn-open-fs"]').click();

    // Body bị khóa
    cy.document().its("body").should("have.css", "overflow", "hidden");

    // Đóng Fullscreen
    cy.get('[data-cy="btn-close-fs"]').click();

    // Body được nhả ra
    cy.document().its("body").should("have.css", "overflow", "visible");
  });

  it("điều khiển Fullscreen bằng phím (ArrowRight, ArrowLeft, Escape)", () => {
    cy.mount(<HookTester images={mockImages} />);

    // Mở Fullscreen (Index = 0)
    cy.get('[data-cy="btn-open-fs"]').click();
    cy.get('[data-cy="fullscreenIndex"]').should("have.text", "0");

    // Bắn sự kiện phím Mũi tên Phải (->)
    cy.window().trigger("keydown", { key: "ArrowRight" });
    cy.get('[data-cy="fullscreenIndex"]').should("have.text", "1");

    // Bắn sự kiện phím Mũi tên Trái (<-)
    cy.window().trigger("keydown", { key: "ArrowLeft" });
    cy.get('[data-cy="fullscreenIndex"]').should("have.text", "0");

    // Kiểm tra chặn giới hạn dưới (<= 0)
    cy.window().trigger("keydown", { key: "ArrowLeft" });
    cy.get('[data-cy="fullscreenIndex"]').should("have.text", "0");

    // Bắn sự kiện phím Escape
    cy.window().trigger("keydown", { key: "Escape" });
    cy.get('[data-cy="fullscreenIndex"]').should("have.text", "null");
  });
});
