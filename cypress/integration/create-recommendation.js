describe("create a recommendation modal works", () => {
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
    cy.get("#author-name").type("alphabet");
    cy.get("#url").clear();
    cy.get("#url").type("google.com");
    cy.get("#resource-description").click();
    cy.get("#resource-description").type("search engine that everyone uses");
    cy.get("#why-recommended").type("such a good website");
    cy.get(".stage-dropdown > .form-select").select("8");
    cy.get(".modal-footer > .btn").click();
    /* ==== Generated with Cypress Studio ==== */
    // cy.get("#new-tags").clear();
    cy.get("#new-tags").type("google");
    cy.get('.modal-body > [data-backdrop="static"]').click();
    cy.get("#new-tags").clear();
    cy.get("#new-tags").type("website");
    cy.get('.modal-body > [data-backdrop="static"]').click();
    /* ==== End Cypress Studio ==== */
  });
  it("posting a recommendation with empty fields should keep the modal visible", () => {
    cy.get(".modal-footer > .btn").click();
    cy.get("#createRecModal").should("be.visible");
  });
  it("posting a recommendation with empty fields should show alerts", () => {
    cy.get(".modal-footer > .btn").click();
    cy.get("#title-alert").should("exist");
    cy.get("#author-alert").should("exist");
    cy.get("#url-alert").should("exist");
    cy.get("#description-alert").should("exist");
    cy.get("#stage-alert").should("exist");
    cy.get("#recommended-description-alert").should("exist");
  });
  it("posting a recommendation with an empty title field", () => {
    cy.get("#author-name").clear();
    cy.get("#author-name").type("Google");
    cy.get("#url").clear();
    cy.get("#url").type("google.com");
    cy.get("#resource-description").click();
    cy.get("#resource-description").type("search engine that everyone uses");
    cy.get("#why-recommended").type("such a good website");
    cy.get(".stage-dropdown > .form-select").select("8");
    cy.get(".modal-footer > .btn").click();
    cy.get("#title-alert").should("exist");
    cy.get("#author-alert").should("not.exist");
    cy.get("#url-alert").should("not.exist");
    cy.get("#description-alert").should("not.exist");
    cy.get("#stage-alert").should("not.exist");
    cy.get("#recommended-description-alert").should("not.exist");
  });
  it("posting a recommendation with an empty url field", () => {
    cy.get("#resource-name").clear();
    cy.get("#resource-name").type("Google");
    cy.get("#author-name").clear();
    cy.get("#author-name").type("alphabet");
    cy.get("#resource-description").click();
    cy.get("#resource-description").type("search engine that everyone uses");
    cy.get("#why-recommended").type("such a good website");
    cy.get(".stage-dropdown > .form-select").select("8");
    cy.get(".modal-footer > .btn").click();
    cy.get("#title-alert").should("not.exist");
    cy.get("#url-alert").should("exist");
    cy.get("#author-alert").should("not.exist");
    cy.get("#description-alert").should("not.exist");
    cy.get("#stage-alert").should("not.exist");
    cy.get("#recommended-description-alert").should("not.exist");
  });
  it("posting a recommendation with an empty description field", () => {
    cy.get("#resource-name").clear();
    cy.get("#resource-name").type("Google");
    cy.get("#author-name").clear();
    cy.get("#author-name").type("alphabet");
    cy.get("#url").clear();
    cy.get("#url").type("google.com");
    cy.get("#why-recommended").type("such a good website");
    cy.get(".stage-dropdown > .form-select").select("8");
    cy.get(".modal-footer > .btn").click();
    cy.get("#title-alert").should("not.exist");
    cy.get("#url-alert").should("not.exist");
    cy.get("#author-alert").should("not.exist");
    cy.get("#stage-alert").should("not.exist");
    cy.get("#recommended-description-alert").should("not.exist");
    cy.get("#description-alert").should("exist"); //alert we expect to be there
  });

  it("posting a recommendation with a url that has already been posted", () => {
    cy.get("#resource-name").clear();
    cy.get("#resource-name").type("Google");
    cy.get("#author-name").clear();
    cy.get("#author-name").type("alphabet");
    cy.get("#url").clear();
    cy.get("#url").type("google.com");
    cy.get("#resource-description").click();
    cy.get("#resource-description").type("search engine that everyone uses");
    cy.get("#why-recommended").type("such a good website");
    cy.get(".stage-dropdown > .form-select").select("8");
    cy.get(".modal-footer > .btn").click();
    cy.get("#url-duplicate-alert").should("exist");
  });
  it("adding a new tag via the drop down", () => {
    cy.get(".modal-body > :nth-child(2) > .tag-dropdown > .form-select").select(
      "google"
    );
    cy.get(".modal-body > :nth-child(2) > .tag-dropdown > .form-select").select(
      "website"
    );
    cy.get("#tag-buttons").find(".tag-button").should("have.length", 2); //not working
    cy.get("#tag-buttons").contains("website");
  });
  it("adding a duplicate tag via the drop down shouldn't add the tag twice", () => {
    cy.get(".modal-body > :nth-child(2) > .tag-dropdown > .form-select").select(
      "google"
    );
    cy.get(".modal-body > :nth-child(2) > .tag-dropdown > .form-select").select(
      "google"
    );
    cy.get("#tag-buttons").find(".tag-button").should("have.length", 1);
  });
  it("adding a new tag via the text input", () => {
    cy.get("#new-tags").clear();
    cy.get("#new-tags").type("hello{enter}");
    cy.get('.modal-body > [data-backdrop="static"]').click();
    cy.get("#new-tags").clear();
    cy.get("#new-tags").type("website{enter}");
    cy.get('.modal-body > [data-backdrop="static"]').click();
    cy.get("#tag-buttons").find(".tag-button").should("have.length", 2);
    cy.get("#tag-buttons").contains("website");
    cy.get("#tag-buttons").contains("hello");
  });
  it("adding the same tag via the text input and via dropdown should only add one tag", () => {
    cy.get("#new-tags").clear();
    cy.get("#new-tags").type("google{enter}");
    cy.get('.modal-body > [data-backdrop="static"]').click();
    cy.get(".modal-body > :nth-child(2) > .tag-dropdown > .form-select").select(
      "google"
    );
    cy.get("#tag-buttons").find(".tag-button").should("have.length", 1);
  });
});
