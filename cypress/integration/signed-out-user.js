describe("renders homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders correctly", () => {
    cy.get("#page-title").should("exist");
  });

  it("renders a search bar", () => {
    cy.get("#searchbar").should("exist");
  });

  it("renders a tags dropdown", () => {
    cy.get(".tag-dropdown").should("exist");
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#tag-dropdown-select").select("bla");
    /* ==== End Cypress Studio ==== */
    cy.get("#recommendations-list").each(() => {
      cy.get(".recommendation")
        .get(".recommendation-tags-div")
        .each(() => {
          cy.get(".recommendation-tag").should("contain.text", "candle");
        });
    });
  });

  it("renders a sign-in button", () => {
    cy.get("#signin-button").should("exist");
  });
  it("renders a view all button", () => {
    cy.get("#view-all-button").should("exist");
  });
  it("renders a recommendation", () => {
    cy.get("#recommendations-list")
      .should("exist")
      .get(".recommendation")
      .should("exist")
      .get("#recommendation-title")
      .should("exist")
      .get("#recommendation-author")
      .should("exist")
      .get("#recommendation-description")
      .should("exist")
      .get("#recommendation-content")
      .should("exist")
      .get("#recommendation-stage")
      .should("exist")
      .get("#recommendation-recommended")
      .should("exist")
      .get("#recommendation-url")
      .should("exist")
      .get("#recommendation-date")
      .should("exist")
      .get(".recommendation-tags-div")
      .should("exist")
      .get("#recommendation-like-count")
      .should("exist")
      .get("#recommendation-dislike-count")
      .should("exist");
  });
});
