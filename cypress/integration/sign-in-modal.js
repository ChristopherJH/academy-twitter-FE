describe("User can sign-in or create a new user", () => {
  beforeEach(() => {
    cy.log("start of test");
    cy.visit("/");
    cy.get("#signin-button").click();
  });
  it("create user button should render and expand to show an input", () => {
    cy.get("#see-signup-button").click();
    cy.get("#viewSignup").should("be.visible");
  });
  it("should see an alert if trying to signup with an empty input", () => {
    cy.get("#see-signup-button").click();
    cy.get(".signup-button").click();
    cy.get("#empty-name-alert").should("be.visible");
  });
  it("should see an alert if trying to signup with a non unique input", () => {
    cy.get("#see-signup-button").click();
    cy.get(".name-and-signup-button > .form-control").click();
    cy.get(".name-and-signup-button > .form-control").clear();
    cy.get(".name-and-signup-button > .form-control").type("Martha");
    cy.get("#signup-button-no-dismiss").click();
    cy.get("#unique-name-alert").should("be.visible");
  });
  it("should allow a non empty unique username input to signup and be logged in", () => {
    cy.get("#see-signup-button").click();
    cy.get(".name-and-signup-button > .form-control").click();
    cy.get(".name-and-signup-button > .form-control").clear();
    cy.get(".name-and-signup-button > .form-control").type("Nichard");
    cy.get(".signup-button").click();
    cy.get("#users-name").should("exist").contains("#users-name", "Nichard");
  });
  it("delete nichard request", () => {
    cy.request("DELETE", `localhost:4000/users/name/Nichard`);
  });
});
