describe("User can search", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3001");
  });
  it("successfully by drink name", () => {
    cy.route({
      method: "GET",
      url: "**/cocktails",
      response: "fixture:margarita_drink_search.json",
      body: {
        s: "Margarita"
      }
    });
    cy.get("#name-search.prompt").type("Margarita");
    cy.get("button")
      .contains("Search")
      .click();
    cy.get("#result-list").should("contain", "Margarita");
  });

  xit("unsuccessfully by drink name", () => {
    cy.route({
      method: "POST",
      url: "**/cocktails",
      response: { message: "No drinks were found" },
      status: 400,
      body: {
        s: "Margarita"
      }
    });
    cy.get("#name-search.prompt").type("nnjthdlsndfie");
    cy.get("button")
      .contains("Search")
      .click();
    cy.get("#message").should("contain", "No drinks were found");
  });
});
