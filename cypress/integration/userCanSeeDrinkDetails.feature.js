describe("User can see", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
    cy.route({
      method: "GET",
      url: "**/cocktails/**",
      response: "fixture:margarita_drink_search.json"
    });
    cy.get("#name-search.prompt").type("Margarita");
    cy.get("button")
      .contains("Search")
      .click();
  });
  it("drink details successfully", () => {
    cy.route({
      method: "GET",
      url: "**/cocktails/**",
      response: "fixture:margarita_details.json"
    });
    debugger
    cy.get("#details-button").click();
    cy.get("#details").should("contain", "Salt");
    cy.get("#details").should("contain", "Tequila");
    cy.get("#details").should("contain", "Lime juice");
    cy.get("#details").should("contain", "1 1/2 oz");
    cy.get("#details").should("contain", "Rub the rim");
    cy.get("#details").should("contain", "Cocktail glass");
  });
});
