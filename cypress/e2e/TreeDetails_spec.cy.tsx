/// <reference types="cypress" />

describe("Tree Details View", () => {
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
    cy.visit("http://localhost:3000/1")
  })

  it("should open the \"tree details\" modal", () => {
    cy.get(".ReactModal__Overlay").should("be.visible")
  })

  it("should display the tree's common and scientific species names", () => {
    cy.get('[data-cy="details-common"]').should("have.text", "Madrona")
    cy.get('[data-cy="details-sci"]').should("have.text", "Arbutus menziesii")
  })

  it("should display the tree's location data", () => {
    cy.get('[data-cy="details-location"]').contains("6210 36th Ave NE")
    cy.get('[data-cy="details-location"]').contains("Bryant")
  })

  it("should display a table of the tree's size and age data", () => {
    cy.get('[data-cy="details-table"] tr').first()
      .should("have.text", "approx. age:45 years")
      .next()
      .should("have.text", "approx. height:120 feet")
      .next()
      .should("have.text", "base circumference:150 inches")
  })

  it("should display the tree's poster's name", () => {
    cy.get('[data-cy="details-author"]').should("have.text", "posted by: Sam Rice")
  })

  it("should display the tree's image", () => {
    cy.get('[data-cy="details-image"]').invoke("attr", "src").should("eq", "https://albersvistagardens.org/wp-content/uploads/madronas_lowangle.jpg")
  })

  it("should allow the user to return to close the modal and return to the map view", () => {
    cy.get('[data-cy="modal-close"]').click()
    cy.get(".ReactModal__Overlay").should("not.be.visible")
    cy.url().should("eq", "http://localhost:3000/")
  })
})