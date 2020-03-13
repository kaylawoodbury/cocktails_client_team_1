describe("User can search", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
  });
  it("search field exists", () => {
    cy.get("#name-search.prompt").should("exist");
    cy.get("#search").should("exist");
    cy.get("#search").contains("Search");
  });
  it("successfully by drink name", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000/api/v1/cocktails", //need to update later
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
      url: "http://localhost:3000/api/v1/cocktails", //need to update later
      response: { status: 400, message: ["No drinks were found"] }
    });
    cy.get("#name-search.prompt").type("nnjthdlsndfie");
    cy.get("button")
      .contains("Search")
      .click();
    cy.get("#message").should("contain", "No drinks were found");
  });
});
