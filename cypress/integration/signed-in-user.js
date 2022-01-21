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

describe("User's study list functions", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#signin-button").click();
    cy.get("#users-dropdown-select").select("Chris");
    cy.get("#modal-signin-button").click();
    cy.get("#view-study-list-button").click();
  });

  it("Study list title is shown", () => {
    cy.get("#study-list-title").should("exist");
  });
  it("Study list for Chris contains 2 items", () => {
    cy.get(".recommendation").should("have.length", 2);
    cy.get(".remove-button").should("have.length", 2);
    cy.get(".add-button").should("have.length", 0);
  });
  it("Removing an item from our study list refreshes our study list", () => {
    cy.get(
      ":nth-child(1) > :nth-child(1) > .recommended-and-add-to-sl > .add-button-div > #remove-sl-button"
    ).click();
    cy.get(".recommendation").should("have.length", 1);
  });
  it("Adding an item to our study list refreshes our study list", () => {
    cy.get("#view-all-button").click();
    cy.get(
      ":nth-child(1) > :nth-child(1) > .recommended-and-add-to-sl > .add-button-div > #add-sl-button"
    ).click();
    cy.get("#view-study-list-button").click();
    cy.get(".recommendation").should("have.length", 2);
  });
  it("Clicking view all should exit study list and show full recommendation list", () => {
    cy.get("#view-all-button").click();
    cy.get("#page-title").should("exist");
    cy.get(".recommendation").should("have.length", 4);
  });
});
