describe("renders homepage", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("renders correctly", () => {
    cy.get("#page-title").should("exist");
  });

  it("renders a search bar which filters recommendations", () => {
    cy.get("#searchbar").should("exist");
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#searchbar").clear();
    cy.get("#searchbar").type("know");
    /* ==== End Cypress Studio ==== */
    cy.get("#recommendations-list")
      .should("be.visible")
      .each(() => {
        if (cy.get(".recommendation-title").find("know").length > 0) {
          cy.get(".recommendation-title").should("contain", "know");
        } else if (cy.get("#recommendation-author").contains("know")) {
          cy.get("#recommendation-author").should("contain", "know");
        } else {
          cy.get(".recommendation-description").should("contain", "know");
        }
      });
  });

  it("renders a tags dropdown which filters recommendations for the selected tag", () => {
    cy.get(".tag-dropdown").should("exist");
    /* ==== Generated with Cypress Studio ==== */
    cy.get("#tag-dropdown-select").select("bla");
    // /* ==== End Cypress Studio ==== */
    cy.get("#recommendations-list").each(() => {
      cy.get(".recommendation-tags-div")
        .should("be.visible")
        .each(($tag) => {
          cy.wrap($tag).parent().should("contain", "website");
        });
    });
  });

  it("renders a sign-in button", () => {
    cy.get("#signin-button").should("exist");
  });
  it("renders a view all button", () => {
    cy.get("#view-all-button").should("exist");
  });
  it("doesn't render sign out button", () => {
    cy.get("#signout-button").should("not.exist");
  });
  it("doesn't render view study list button", () => {
    cy.get("#view-study-list-button").should("not.exist");
  });
  it("doesn't render create button", () => {
    cy.get("#create-button").should("not.exist");
  });
  it("doesn't render like button", () => {
    cy.get("#recommendation-like-button").should("not.exist");
  });
  it("doesn't render add to study list button", () => {
    cy.get("#add-sl-button").should("not.exist");
  });
  it("clicking sign-in button shows a modal", () => {
    cy.get("#signin-button").click().get("#signInModal").should("exist");
  });
  it("signing in closes sign-in modal", () => {
    cy.get("#signin-button").click();
    cy.get("#users-dropdown-select").select("Chris");
    cy.get("#modal-signin-button").click();
    cy.get("#signInModal").should("not.exist");
  });
  it("renders a recommendation", () => {
    cy.get("#recommendations-list")
      .should("exist")
      .get(".recommendation")
      .should("exist")
      .get(".recommendation-title")
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

  // it("search bar filters recommendations", () => {
  //   cy.get("#searchbar").type("test");
  //   cy.get("#recommendations-list").each((recommendation) => {
  //     cy.get(recommendation).contains("test");
  //   });
  // });
});
