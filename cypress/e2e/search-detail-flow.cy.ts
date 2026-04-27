describe("Search to detail flow", () => {
  const filterOptions = {
    make: ["Toyota", "Honda"],
    condition: ["New", "Used"],
    driveType: ["FWD", "AWD"],
    fuelType: ["Gasoline", "Hybrid"],
    priceRating: ["Great Price"],
    features: [
      { id: 1, name: "Backup Camera", category: "HIGHLIGHTS" },
      { id: 2, name: "Apple CarPlay", category: "HIGHLIGHTS" },
      { id: 5, name: "Lane Departure Warning", category: "SAFETY" },
    ],
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
    features: [
      { id: 1, name: "Backup Camera", category: "HIGHLIGHTS" },
      { id: 5, name: "Lane Departure Warning", category: "SAFETY" },
    ],
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
    cy.viewport(1440, 1200);

    cy.intercept("GET", "**/api/cars/filters", filterOptions).as("getFilters");

    cy.intercept("GET", "**/api/cars?*", (req) => {
      const url = new URL(req.url);

      if (url.searchParams.getAll("features").length > 0) {
        expect(url.searchParams.getAll("features")).to.deep.eq(["1"]);
      }

      req.reply(searchResponse);
    }).as("getCars");

    cy.intercept("GET", "**/api/cars/1", car).as("getCarById");
  });

  it("loads search results, filters by feature, opens detail, and returns to results", () => {
    cy.visit("/");

    cy.wait("@getFilters");
    cy.wait("@getCars");

    cy.contains("1 Matches").should("be.visible");

    cy.contains("Features").scrollIntoView();
    cy.contains("Backup Camera").click();

    cy.wait("@getCars");
    cy.url().should("include", "features=1");

    cy.contains("Backup Camera").should("exist");

    cy.contains("h3", "2024 Toyota Camry")
      .should("be.visible")
      .closest("div.bg-white.rounded-lg")
      .click();

    cy.url().should("include", "/car/1");
    cy.wait("@getCarById", { timeout: 10000 });
    cy.contains("Back to results").should("be.visible");
    cy.contains("Got Questions? Contact the Dealer").should("be.visible");

    cy.contains("Back to results").click();

    cy.wait("@getCars");
    cy.url().should("include", "features=1");
    cy.contains("1 Matches").should("be.visible");
  });
});
