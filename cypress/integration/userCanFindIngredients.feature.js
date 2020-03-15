describe("User can find", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
    cy.route({
      method: "POST",
      url: "**/cocktails",
      response: "fixture:margarita_drink_search.json"
    });
    cy.get("#name-search.prompt").type("Margarita");
    cy.get("button")
      .contains("Search")
      .click();
    cy.route({
      method: "GET",
      url: "**/cocktails/**",
      response: "fixture:margarita_details.json"
    });
    cy.get("#details-button").click();
  });

  it("ingredient options from System Bolaget", () => {
    cy.route({
      method: "GET",
      url: "**/cocktails/**",
      response: "fixture:tequila_list.json"
    });
    cy.get("#find-button").click();
    cy.get("#name").should("contain", "Cenote");
    cy.get("#name2").should("contain", "Tequila Blanco");
    cy.get("#category").should("contain", "Sprit");
    cy.get("#producer").should("contain", "Fabrica De Tequilas Finos");
    cy.get("#price").should("contain", "699.0");
    cy.get("#country").should("contain", "Mexiko");
    cy.get("#name").should("contain", "Cenote Tequila");
    cy.get("#name").should("contain", "Reserva Del Señor");
  });
});
