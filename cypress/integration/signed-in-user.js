describe("renders homepage", () => {
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
  it("can use functioning like and dislike buttons", () => {
    cy.get("#recommendation-like-count").then(($likeCount) => {
      const count = parseInt($likeCount.text());
      cy.get("#recommendation-like-button").click();
      cy.get("#recommendation-like-count").should(
        "contain.text",
        `${count + 1}`
      );
    });
    cy.get("#recommendation-dislike-count").then(($dislikeCount) => {
      const count = parseInt($dislikeCount.text());
      cy.get("#recommendation-dislike-button").click();
      cy.get("#recommendation-dislike-count").should(
        "contain.text",
        `${count + 1}`
      );
    });
  });
});
