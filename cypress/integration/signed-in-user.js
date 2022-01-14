describe("Signed in user interface renders correctly", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#signin-button").click();
    cy.get("#users-dropdown-select").select("Chris");
    cy.get("#modal-signin-button").click();
  });

  it("can see the users name in the sign", () => {
    cy.get("#users-name").should("exist").contains("#users-name", "Chris");
  });
  it("can see sign-out button", () => {
    cy.get("#signout-button").should("exist");
  });
  it("can click on create button and a modal appears", () => {
    cy.get("#create-button").click();
    cy.get("#createRecModal").should("exist");
  });
});
