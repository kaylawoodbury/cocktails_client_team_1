describe("User can search", () => {
  beforeEach(() => {
    cy.server();
    cy.visit("http://localhost:3000");
  });
  it("search field exists", () => {
    cy.get("#name-search.prompt").should("exist");
    cy.get("#search").should("exist");
    cy.get("#search")
      .contains("Search")
      .click();
  });
  it("successfully by drink name", () => {
    cy.route({
      method: "POST",
      url: "http://localhost:3000", //need to update later
      response: "fixture:",  //need to update later
    });
    cy.get("#name-search.prompt").type("Moscow Mule");
    cy.get("button")
      .contains("Search")
      .click();
    // cy.get("#message").should("contain", "Hi user@mail.com");
  });
});