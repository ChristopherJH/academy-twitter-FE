describe("User can sign-in or create a new user", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("renders a sign-in button", () => {
    cy.get("#signin-button").should("exist");
  });
  it("doesn't render sign out button", () => {
    cy.get("#signout-button").should("not.exist");
  });
});
