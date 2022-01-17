describe("Create a recommendation modal works", () => {
    beforeEach(() => {
      cy.visit("/");
      cy.get("#signin-button").click();
      cy.get("#users-dropdown-select").select("Chris");
      cy.get("#modal-signin-button").click();
      cy.get("#create-button").click();
    });
    it("creating a dummy post for testing", () => {
      cy.get("#resource-name").clear();
      cy.get("#resource-name").type("Google");
      cy.get("#author-name").clear();
      cy.get("#author-name").type("Alphabet");
      cy.get("#url").clear();
      cy.get("#url").type("https://www.google.com");
      cy.get("#content-type").select("Website");
      cy.get("#resource-description").click();
      cy.get("#resource-description").type(
        "Great search engine for finding literally anything."
      );
      cy.get("#new-tags").clear();
      cy.get("#new-tags").type("website");
      cy.get("#add-tag-button").click();
      cy.get("#new-tags").clear();
      cy.get("#new-tags").type("google");
      cy.get("#add-tag-button").click();
      cy.get("#why-recommended").clear();
      cy.get("#why-recommended").type("Such a great website");
      cy.get(".stage-dropdown > .form-select").select("8");
      cy.get(".modal-footer > .btn").click();
      cy.wait(10);
    })};