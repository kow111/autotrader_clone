import { Provider } from "react-redux";
import { MemoryRouter, useLocation } from "react-router-dom";
import { store } from "../../../src/store/store";
import { setFilter, clearFilters } from "../../../src/store/carSlice";
import { useAppDispatch, useAppSelector } from "../../../src/store/hooks";
import { useCarSearchSync } from "../../../src/hooks/useCarSearchSync";

// ==========================================
// 1. WRAPPER COMPONENT
// ==========================================
const HookTester = () => {
  // Kích hoạt Hook
  useCarSearchSync();

  const dispatch = useAppDispatch();
  const { filters, sortBy } = useAppSelector((state) => state.cars);

  // Dùng useLocation để "nhìn" xem thanh URL ảo đang có gì
  const location = useLocation();

  return (
    <div>
      {/* In giá trị URL hiện tại */}
      <p data-cy="current-url">{location.search}</p>

      {/* In giá trị trong Redux */}
      <p data-cy="redux-make">{filters.make || "null"}</p>
      <p data-cy="redux-sort">{sortBy}</p>
      <p data-cy="redux-min-price">{filters.minPrice || "null"}</p>

      {/* Nút giả lập người dùng click chọn filter trên giao diện */}
      <button
        data-cy="btn-set-honda"
        onClick={() => dispatch(setFilter({ make: "Honda" }))}
      >
        Set Make: Honda
      </button>

      <button
        data-cy="btn-set-invalid-price"
        onClick={() =>
          dispatch(setFilter({ minPrice: 50000, maxPrice: 10000 }))
        }
      >
        Set Invalid Price
      </button>
    </div>
  );
};

// ==========================================
// 2. CYPRESS TEST SUITE
// ==========================================
describe("Hook: useCarSearchSync", () => {
  let capturedRequestUrls: string[] = [];

  // Dọn dẹp Redux Store trước mỗi bài test để không bị nhiễu dữ liệu
  beforeEach(() => {
    capturedRequestUrls = [];
    store.dispatch(clearFilters());
    // Chặn gọi API thật và lưu lại URL request để assert chính xác theo params
    cy.intercept("GET", "**/api/cars**", (req) => {
      capturedRequestUrls.push(req.url);
      req.reply({ statusCode: 200, body: [] });
    }).as("fetchCars");
  });

  it("Đồng bộ TỪ URL VÀO Redux khi mới load trang", () => {
    // Giả lập người dùng copy link có sẵn gửi cho bạn bè
    const initialUrl = "/?make=Toyota&sort=price_asc&minPrice=15000";

    cy.mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialUrl]}>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    // Kiểm tra xem Redux đã bắt được param từ URL chưa
    cy.get('[data-cy="redux-make"]').should("have.text", "Toyota");
    cy.get('[data-cy="redux-sort"]').should("have.text", "price_asc");
    cy.get('[data-cy="redux-min-price"]').should("have.text", "15000");
  });

  it("Đồng bộ TỪ Redux LÊN URL và gọi API khi bộ lọc thay đổi", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    // Ban đầu URL rỗng
    cy.get('[data-cy="current-url"]').should("have.text", "");

    // Cập nhật Redux (giả lập bấm chọn hãng xe)
    cy.get('[data-cy="btn-set-honda"]').click();

    // Redux thay đổi -> Hook tự động ghép param lên URL
    cy.get('[data-cy="current-url"]').should("contain", "make=Honda");

    // Đảm bảo API fetchCarsAsync đã được gọi
    cy.wait("@fetchCars");
  });

  it("KHÔNG cập nhật URL và KHÔNG gọi API nếu Validation thất bại", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <HookTester />
        </MemoryRouter>
      </Provider>,
    );

    // Cố tình đẩy dữ liệu lỗi (minPrice > maxPrice) vào Redux
    cy.get('[data-cy="btn-set-invalid-price"]').click();

    // Đợi 1 chút để chắc chắn Hook đã chạy qua logic
    cy.wait(200);

    // URL vẫn phải rỗng vì bị chặn bởi uiValidationSchema
    cy.get('[data-cy="current-url"]').should("not.contain", "minPrice");

    // Không có request nào được gửi với bộ params invalid
    cy.then(() => {
      const hasInvalidParamsRequest = capturedRequestUrls.some(
        (url) =>
          url.includes("minPrice=50000") || url.includes("maxPrice=10000"),
      );
      expect(hasInvalidParamsRequest).to.equal(false);
    });
  });
});
