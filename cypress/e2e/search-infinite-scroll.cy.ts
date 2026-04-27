import type { Interception } from "cypress/types/net-stubbing";

describe("Search infinite scroll", () => {
  const filterOptions = {
    make: ["Toyota"],
    condition: ["Used"],
    driveType: ["FWD"],
    fuelType: ["Gasoline"],
    priceRating: ["Good Price"],
    features: [{ id: 1, name: "Backup Camera", category: "HIGHLIGHTS" }],
  };

  const makeCar = (id: number) => ({
    id,
    make: "Toyota",
    model: `Model ${id}`,
    trim: "LE",
    year: 2024,
    price: 20000 + id,
    msrp: 22000 + id,
    mileage: 10000 + id,
    condition: "Used",
    fuelType: "Gasoline",
    driveType: "FWD",
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
    ],
    isSponsored: false,
    priceRating: "Good Price",
    badges: ["Online Paperwork"],
    dealerName: "Dealer",
    dealerPhone: "(555) 111-2222",
    hasOnlinePaperwork: true,
    features: [{ id: 1, name: "Backup Camera", category: "HIGHLIGHTS" }],
  });

  const page0Cars = Array.from({ length: 10 }, (_, i) => makeCar(i + 1));
  const page1Cars = Array.from({ length: 10 }, (_, i) => makeCar(i + 11));

  beforeEach(() => {
    cy.viewport(1280, 700);

    cy.intercept("GET", "**/api/cars/filters", filterOptions).as("getFilters");

    cy.intercept("GET", "**/api/cars?*", (req) => {
      const url = new URL(req.url);
      const page = Number(url.searchParams.get("page") ?? "0");

      if (page === 0) {
        req.reply({
          data: page0Cars,
          currentPage: 0,
          totalPages: 2,
          totalElements: 20,
          pageSize: 10,
          hasNext: true,
        });
        return;
      }

      req.reply({
        data: page1Cars,
        currentPage: 1,
        totalPages: 2,
        totalElements: 20,
        pageSize: 10,
        hasNext: false,
      });
    }).as("getCars");
  });

  it("loads next page when scrolling to bottom", () => {
    cy.visit("/");

    cy.wait("@getFilters");
    cy.wait("@getCars").its("request.url").should("include", "page=0");
    cy.wait("@getCars").its("request.url").should("include", "page=0");

    cy.contains("h3", "2024 Toyota Model 10").scrollIntoView();
    cy.scrollTo("bottom");

    cy.get("@getCars.all", { timeout: 10000 }).should((calls) => {
      const interceptions = calls as unknown as Interception[];
      const hasPageOne = interceptions.some((call) =>
        call.request.url.includes("page=1"),
      );
      expect(hasPageOne).to.eq(true);
    });

    cy.contains("20 Matches").should("be.visible");
    cy.contains("h3", "2024 Toyota Model 20").should("be.visible");
  });
});
