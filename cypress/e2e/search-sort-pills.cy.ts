import type { Interception } from "cypress/types/net-stubbing";

describe("Search sort and active pills", () => {
  const filterOptions = {
    make: ["Toyota", "Honda"],
    condition: ["New", "Used"],
    driveType: ["FWD", "AWD"],
    fuelType: ["Gasoline", "Hybrid"],
    priceRating: ["Great Price", "Good Price"],
    features: [
      { id: 1, name: "Backup Camera", category: "HIGHLIGHTS" },
      { id: 2, name: "Apple CarPlay", category: "HIGHLIGHTS" },
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
    cy.intercept("GET", "**/api/cars?*", (req) => {
      req.reply(searchResponse);
    }).as("getCars");
  });

  it("applies sort, creates pill, and removes pill", () => {
    cy.visit("/");

    cy.wait("@getFilters");
    cy.wait("@getCars");
    cy.wait("@getCars");

    cy.contains("Sort by:")
      .parent()
      .find("select")
      .select("Price: High to Low");

    cy.url().should("include", "sort=price_desc");
    cy.get("@getCars.all", { timeout: 10000 }).should((calls) => {
      const interceptions = calls as unknown as Interception[];
      const last = interceptions[interceptions.length - 1];
      expect(last.request.url).to.include("sort=price_desc");
    });

    cy.url().should("include", "sort=price_desc");

    cy.contains("Features").scrollIntoView();
    cy.contains("Backup Camera").click();

    cy.url().should("include", "features=1");
    cy.get("@getCars.all", { timeout: 10000 }).should((calls) => {
      const interceptions = calls as unknown as Interception[];
      const last = interceptions[interceptions.length - 1];
      expect(last.request.url).to.include("features=1");
    });
    cy.url().should("include", "features=1");

    cy.contains("div", "Backup Camera")
      .filter(':contains("Backup Camera")')
      .filter('[class*="rounded-full"]')
      .first()
      .click();

    cy.get("@getCars.all", { timeout: 10000 }).should((calls) => {
      const interceptions = calls as unknown as Interception[];
      const last = interceptions[interceptions.length - 1];
      expect(last.request.url).to.not.include("features=1");
    });
    cy.url().should("not.include", "features=1");
  });
});
