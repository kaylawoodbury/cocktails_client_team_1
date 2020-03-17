describe("User can find", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
    cy.route({
      method: "GET",
      url: "**/cocktails",
      response: "fixture:margarita_drink_search.json",
      body: {
        q: "Margarita"
      }
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
      url: "**/products",
      response: "fixture:tequila_list.json",
      body: {
        q: "Tequila"
      }
    });
    cy.get("#booze-button").click();
    cy.get("#booze-options").should("contain", "Cenote");
    cy.get("#booze-options").should("contain", "Tequila Blanco");
    cy.get("#booze-options").should("contain", "699");
    cy.get("#booze-options").should("contain", "Mexiko");
    cy.get("#booze-options").should("contain", "Cenote Tequila");
  });
});
