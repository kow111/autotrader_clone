import { Provider } from "react-redux";
import { MemoryRouter, Routes, Route, useLocation } from "react-router-dom";
import { store } from "../../../src/store/store";
import { useCarDetail } from "../../../src/hooks/useCarDetail";
import { carApi } from "../../../src/services/api";

// ==========================================
// 1. COMPONENT PHỤ TRỢ (Dùng để kiểm tra chuyển trang)
// ==========================================
const SearchPageMock = () => {
  const location = useLocation();
  return <div data-cy="search-page-mock">Navigated to: {location.search}</div>;
};

// ==========================================
// 2. WRAPPER COMPONENT
// ==========================================
const HookTester = () => {
  const { car, similarCars, paymentType, setPaymentType, handleBackToResults } =
    useCarDetail();

  return (
    <div>
      <p data-cy="car-id">{car ? car.id : "loading"}</p>
      <p data-cy="car-make">{car ? car.make : "none"}</p>
      <p data-cy="payment-type">{paymentType}</p>
      <p data-cy="similar-count">{similarCars.length}</p>

      <button data-cy="btn-cash" onClick={() => setPaymentType("Cash")}>
        Pay Cash
      </button>
      <button data-cy="btn-back" onClick={handleBackToResults}>
        Go Back
      </button>
    </div>
  );
};

// ==========================================
// 3. CYPRESS TEST SUITE
// ==========================================
describe("Hook: useCarDetail", () => {
  // Dữ liệu xe giả mạo
  const mockCarData = {
    id: 123,
    make: "Toyota",
    model: "Camry",
    price: 25000,
    images: [],
  };

  beforeEach(() => {
    // ÉP HÀM GỐC: Thay vì gọi server, hễ ai gọi carApi.getCarById thì trả về mockCarData
    cy.stub(carApi, "getCarById").resolves(mockCarData).as("getCarApiStub");

    // Theo dõi hàm cuộn trang của trình duyệt
    cy.stub(window, "scrollTo").as("scrollToStub");
  });

  it("Lấy ID từ URL, gọi API và lấy dữ liệu thành công", () => {
    // Giả lập URL: Đang xem xe ID 123, và trước đó tìm kiếm bằng từ khóa "Toyota"
    const initialUrl = "/car/123?keyword=Toyota&sort=price_asc";

    cy.mount(
      <Provider store={store}>
        {/* Phải bọc trong Routes để useParams() bắt được số 123 */}
        <MemoryRouter initialEntries={[initialUrl]}>
          <Routes>
            <Route path="/car/:id" element={<HookTester />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // 1. Kiểm tra API có được gọi với đúng ID = 123 không?
    cy.get("@getCarApiStub").should("have.been.calledWith", 123);

    // 2. Kiểm tra Hook đã cập nhật state bằng dữ liệu giả chưa?
    cy.get('[data-cy="car-id"]').should("have.text", "123");
    cy.get('[data-cy="car-make"]').should("have.text", "Toyota");

    // 3. Kiểm tra xem Hook có tự động cuộn lên đầu trang không?
    cy.get("@scrollToStub").should("have.been.calledWith", 0, 0);
  });

  it("Thay đổi hình thức thanh toán (Payment Type)", () => {
    cy.mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/car/123"]}>
          <Routes>
            <Route path="/car/:id" element={<HookTester />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // Mặc định là Finance
    cy.get('[data-cy="payment-type"]').should("have.text", "Finance");

    // Bấm nút chuyển sang Cash
    cy.get('[data-cy="btn-cash"]').click();
    cy.get('[data-cy="payment-type"]').should("have.text", "Cash");
  });

  it("Hàm handleBackToResults giữ nguyên filter (search param) khi quay lại", () => {
    const initialUrl = "/car/123?keyword=Honda&minPrice=10000";

    cy.mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={[initialUrl]}>
          <Routes>
            {/* Trang chi tiết */}
            <Route path="/car/:id" element={<HookTester />} />
            {/* Trang chủ mô phỏng để hứng sự kiện chuyển trang */}
            <Route path="/" element={<SearchPageMock />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    // Bấm nút quay lại
    cy.get('[data-cy="btn-back"]').click();

    // Phải bay về trang chủ VÀ giữ nguyên đuôi ?keyword=Honda...
    cy.get('[data-cy="search-page-mock"]')
      .should("be.visible")
      .and("contain.text", "?keyword=Honda&minPrice=10000");
  });
});
