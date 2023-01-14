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
    cy.visit("http://localhost:3000")
    cy.wait(1000)
  })

  it("should display the site title", () => {
    cy.get('[data-cy="site-title"]').should("have.text", "TREESOFSEATTLE")
  })

  it("should have a button for navigating to the \"new tree\" form", () => {
    cy.get('[data-cy="new-tree-button"]').click()
    cy.url().should("eq", "http://localhost:3000/new-tree")
  })

  it("should display the map", () => {
    cy.get('.leaflet-container').should("be.visible")
  })

  it("should display map markers for a saved tree", () => {
    cy.get('.leaflet-container').click(555, 45)
    cy.get('.leaflet-popup-content-wrapper').should("be.visible")
  })
})

describe("Map View - Popup Content", () => {
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
    cy.visit("http://localhost:3000")
    cy.wait(1000)
    cy.get('.leaflet-container').click(555, 45)
  })

  it("should display the tree's common and scientific species names", () => {
    cy.get('[data-cy="popup-common"]').should("have.text", "Himalayan Cedar")
    cy.get('[data-cy="popup-sci"]').should("have.text", "Cedrus deodara")

  })

  it("should display the tree's address", () => {
    cy.get('[data-cy="popup-address"]').should("have.text", "1923 Naomi Pl")
  })

  it("should display the tree's height and width", () => {
    cy.get("table tr").first()
      .should("have.text", "approx. age:110 years")
      .next()
      .should("have.text", "approx. height:120 feet")
  })

  it("should display the tree's poster's name", () => {
    cy.get('[data-cy="popup-author"]').should("have.text", "posted by: Peter Tilton")
  })

  it("should display the tree's thumbnail image", () => {
    cy.get('[data-cy="popup-thumbnail"]').invoke("attr", "src").should("eq", "https://upload.wikimedia.org/wikipedia/commons/d/dc/Cedrus_deodara_Manali_2.jpg")
  })

  it("should have a button to navigate to the tree's details", () => {
    cy.get('[data-cy="popup-button"]').click()
    cy.url().should("eq", "http://localhost:3000/2")
  })
})

describe("Map View - Filter", () => {
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
    cy.visit("http://localhost:3000")
    cy.wait(1000)
    cy.get('[data-cy="marker-filter"]').type("doug")
  })

  it("should have a text input for filtering tree map markers by species name", () => {
    cy.get('[data-cy="marker-filter"]').should("have.value", "doug")
  })

  it("should show trees that match the query", () => {
    cy.get('.leaflet-container').trigger('mousedown', { which: 1, clientX: 600, clientY: 100 })
      .trigger('mousemove', { which: 1, clientX: 600, clientY: 600 })
      .trigger('mouseup')
      .click(360, 290)
    cy.get('[data-cy="popup-common"]').should("have.text", "Douglas Fir")
  })

  it("should not show trees that do not match the query", () => {
    cy.get('.leaflet-container').click(555, 45)
    cy.get('.leaflet-popup-content-wrapper').should("not.exist")
  })
})