describe("User can see", () => {
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
  });
  it("drink details successfully", () => {
    cy.route({
      method: "GET",
      url: "**/cocktails",
      response: "fixture:margarita_details.json"
    });
    cy.get("#details-button").click();
    cy.get("#details")
      .invoke("attr", "src")
      .should(
        "include",
        "https://www.thecocktaildb.com/images/media/drink/srpxxp1441209622.jpg"
      );
    cy.get("#details").should("contain", "Ice");
    cy.get("#details").should("contain", "Tequila");
    cy.get("#details").should("contain", "Lime Juice");
    cy.get("#details").should("contain", "Cream of coconut");
    cy.get("#details").should("contain", "2 oz");
    cy.get("#details").should("contain", "Place all ingredients in a blender");
    cy.get("#details").should("contain", "Margarita/Coupette glass");
  });
});
