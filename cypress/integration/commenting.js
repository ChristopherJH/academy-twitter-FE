describe("Comment feature works correctly", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#signin-button").click();
    cy.get("#users-dropdown-select").select("Chris");
    cy.get("#modal-signin-button").click();
  });

  it("Can post a comment and see it", () => {
    /* ==== Generated with Cypress Studio ==== */
    cy.get(
      ":nth-child(1) > :nth-child(8) > .col-1 > #add-comment-button"
    ).click();
    cy.get("#create-comment-section-439 > .card > #comment-input").click();
    cy.get("#create-comment-section-439 > .card > #comment-input").type(
      "Lmao google is using your data! bing is better no cap"
    );
    cy.get("#create-comment-section-439 > .card > .row > #veto-button").click();
    cy.get("#recommendation-see-comments-button").click();
    cy.get(".comment-div")
      .findByText("Lmao google is using your data! bing is better no cap")
      .should("be.visible");

    /* ==== End Cypress Studio ==== */
  });

  it("Posting with endorse will increase endorsement count by 1", () => {
    cy.get("#recommendation-like-count").then(($endorsementCount) => {
      const endorsements = parseInt($endorsementCount.text());
    });
    cy.get(
      ":nth-child(1) > :nth-child(8) > .col-1 > #add-comment-button"
    ).click();
    cy.get("#create-comment-section-439 > .card > #comment-input").click();
    cy.get("#create-comment-section-439 > .card > #comment-input").type(
      "Lmao google is using your data! bing is better no cap"
    );
    cy.get(
      "#create-comment-section-439 > .card > .row > #endorsing-button"
    ).click();
    cy.get("#recommendation-like-count")
      .text()
      .should("contain.text", `${endorsements + 1}`);
  });
});
