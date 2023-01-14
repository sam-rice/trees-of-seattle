/// <reference types="cypress" />

describe("Map View - Site Load", () => {
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
    // cy.wait(1000)
  })

  it("should load", () => {
    
  })
})