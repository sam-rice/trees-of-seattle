/// <reference types="cypress" />

describe("New Tree Form", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "http://localhost:3001/v1/trees",
      },
      {
        fixture: "trees.json",
      }
    )
    cy.visit("http://localhost:3000/new-tree")
  })

  it("should not show the \"new tree\" button when viewing the new tree form", () => {
    cy.get('[data-cy="new-tree-button"]').should("not.exist")
  })

  it("should have inputs for various text data", () => {
    cy.get('[data-cy="form-common"]').type("grand fir")
      .should("have.value", "grand fir")
    cy.get('[data-cy="form-sci"]').type("Abies grandis")
      .should("have.value", "Abies grandis")
    cy.get('[data-cy="form-address"]').type("123 Greenlake Way")
      .should("have.value", "123 Greenlake Way")
    cy.get('[data-cy="form-author"]').type("Geddy Lee")
      .should("have.value", "Geddy Lee")
  })

  it("should have inputs for numerical data", () => {
    cy.get('[data-cy="form-height"]').type("150xyz")
      .should("have.value", "150")
    cy.get('[data-cy="form-circ"]').type("45abc")
      .should("have.value", "45")
    cy.get('[data-cy="form-age"]').type("110xyz")
      .should("have.value", "110")
  })

})