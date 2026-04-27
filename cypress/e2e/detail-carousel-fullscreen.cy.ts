describe("Detail fullscreen carousel", () => {
  const filterOptions = {
    make: ["Toyota"],
    condition: ["Used"],
    driveType: ["FWD"],
    fuelType: ["Gasoline"],
    priceRating: ["Good Price"],
    features: [{ id: 1, name: "Backup Camera", category: "HIGHLIGHTS" }],
  };

  const car = {
    id: 1,
    make: "Toyota",
    model: "Camry",
    trim: "LE",
    year: 2024,
    price: 25000,
    msrp: 27000,
    mileage: 12000,
    condition: "Used",
    fuelType: "Gasoline",
    driveType: "FWD",
    images: [
      "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1200",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200",
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?w=1200",
    ],
    isSponsored: false,
    priceRating: "Good Price",
    badges: ["Online Paperwork"],
    dealerName: "Autotrader Toyota",
    dealerPhone: "(555) 111-2222",
    hasOnlinePaperwork: true,
    features: [{ id: 1, name: "Backup Camera", category: "HIGHLIGHTS" }],
  };

  const searchResponse = {
    data: [car],
    currentPage: 0,
    totalPages: 1,
    totalElements: 1,
    pageSize: 10,
    hasNext: false,
  };

  beforeEach(() => {
    cy.viewport(1440, 900);

    cy.intercept("GET", "**/api/cars/filters", filterOptions).as("getFilters");
    cy.intercept("GET", "**/api/cars?*", searchResponse).as("getCars");
    cy.intercept("GET", "**/api/cars/1", car).as("getCarById");
  });

  it("opens fullscreen image viewer and supports keyboard navigation", () => {
    cy.visit("/car/1?features=1");

    cy.wait("@getCarById");

    cy.get("img").first().click();
    cy.contains("1 / 3").should("be.visible");

    cy.get("body").type("{rightarrow}");
    cy.contains("2 / 3").should("be.visible");

    cy.get("body").type("{esc}");
    cy.contains("2 / 3").should("not.exist");

    cy.contains("Back to results").click();

    cy.wait("@getFilters");
    cy.wait("@getCars");
    cy.url().should("include", "features=1");
  });
});
