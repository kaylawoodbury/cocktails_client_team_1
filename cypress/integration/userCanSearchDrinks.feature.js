describe("User can search", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
  });
  it("successfully by drink name", () => {
    cy.route({
      method: "POST",
      url: "https://cocktails-api-team1.herokuapp.com/api/v1/cocktails",
      response: "fixture:margarita_drink_search.json"
    });
    cy.get("#name-search.prompt").type("Margarita");
    cy.get("button")
      .contains("Search")
      .click();
    cy.get("#result-list").should("contain", "Margarita");
  });

  it("unsuccessfully by drink name", () => {
    cy.route({
      method: "POST",
      url: "https://cocktails-api-team1.herokuapp.com/api/v1/cocktails",
      response: { status: 400, message: "No drinks were found" }
    });
    cy.get("#name-search.prompt").type("nnjthdlsndfie");
    cy.get("button")
      .contains("Search")
      .click();
    cy.get("#message").should("contain", "No drinks were found");
  });
});
