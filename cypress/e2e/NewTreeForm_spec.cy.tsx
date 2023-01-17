/// <reference types="cypress" />

describe("New Tree Form", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://radiant-harbor-65607.herokuapp.com/v1/trees",
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
    cy.get('[data-cy="form-image"]').type("URL here")
      .should("have.value", "URL here")
  })

  it("should have a checkbox for indicating a native species", () => {
    cy.get('[data-cy="form-native"]').should("not.be.checked")
      .check()
    cy.get('[data-cy="form-native"]').should("be.checked")
      .uncheck()
    cy.get('[data-cy="form-native"]').should("not.be.checked")
  })

  it("should have inputs for various numerical data", () => {
    cy.get('[data-cy="form-height"]').type("150xyz")
      .should("have.value", "150")
    cy.get('[data-cy="form-circ"]').type("45abc")
      .should("have.value", "45")
    cy.get('[data-cy="form-age"]').type("110xyz")
      .should("have.value", "110")
  })

  it("should only navigate to the map view if the submission is valid", () => {
    cy.get('[data-cy="form-submit"]').click()
    cy.url().should("eq", "http://localhost:3000/new-tree")
  })

  it("should require certain data", () => {
    cy.get('[data-cy="form-common"]').invoke("attr", "required").should("exist")
    cy.get('[data-cy="form-sci"]').invoke("attr", "required").should("exist")
    cy.get('[data-cy="form-address"]').invoke("attr", "required").should("exist")
    cy.get('[data-cy="form-author"]').invoke("attr", "required").should("exist")
    cy.get('[data-cy="form-image"]').invoke("attr", "required").should("not.exist")
    cy.get('[data-cy="form-height"]').invoke("attr", "required").should("not.exist")
    cy.get('[data-cy="form-circ"]').invoke("attr", "required").should("not.exist")
    cy.get('[data-cy="form-age"]').invoke("attr", "required").should("exist")
  })
})

describe("New Tree Form - Successful POST", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: "https://radiant-harbor-65607.herokuapp.com/v1/trees",
      },
      {
        fixture: "trees.json",
      }
    )
    cy.intercept(
      {
        method: "POST",
        url: "https://radiant-harbor-65607.herokuapp.com/v1/trees",
      },
      {
        fixture: "newTree.json",
      }
    )
    cy.intercept(
      {
        method: "GET",
        url: "https://api.geoapify.com/v1/geocode/search?text=foobar%20Seattle%20WA%20USA&apiKey=18e7ab79ca46494ab3da1a3f545a4cc2",
      },
      {
        fixture: "geoapifySadResponse.json",
      }
    )
    cy.intercept(
      {
        method: "GET",
        url: "https://api.geoapify.com/v1/geocode/search?text=3029%20NW%2068th%20St%20Seattle%20WA%20USA&apiKey=18e7ab79ca46494ab3da1a3f545a4cc2",
      },
      {
        fixture: "geoapifyResponse.json",
      }
    )
    cy.visit("http://localhost:3000/new-tree")
    cy.get('[data-cy="form-common"]').type("Bigleaf Maple")
    cy.get('[data-cy="form-sci"]').type("Acer macrophyllum")
    cy.get('[data-cy="form-address"]').type("3029 NW 68th St")
    cy.get('[data-cy="form-author"]').type("Bonnie Birch")
    cy.get('[data-cy="form-image"]').type("https://www.treegirl.org/uploads/4/4/2/8/44289563/mossy-maple-moss-woman-3727-treegirl-6-10-22-900pix_orig.jpg")
    cy.get('[data-cy="form-height"]').type("100")
    cy.get('[data-cy="form-circ"]').type("80")
    cy.get('[data-cy="form-age"]').type("75")
  })

  it("should navigate to the map view after a new tree is successfully submitted", () => {
    cy.get('[data-cy="form-submit"]').click()
    cy.url().should("eq", "http://localhost:3000/")
  })

  it("should handle an invalid address error", () => {
    cy.get('[data-cy="form-address"]').clear()
      .type("foobar")
    cy.get('[data-cy="form-submit"]').click()
    cy.url().should("eq", "http://localhost:3000/new-tree")
    cy.get('[data-cy="address-error"]').should("be.visible")
  })
  
  it("should show a map marker and popup for the newly-created tree", () => {
    cy.get('[data-cy="form-submit"]').click()
    cy.get('.leaflet-container').click(285, 30)
    cy.get('[data-cy="popup-common"]').should("have.text", "Bigleaf Maple")
    cy.get('[data-cy="popup-sci"]').should("have.text", "Acer macrophyllum")
    cy.get('[data-cy="popup-address"]').should("have.text", "3029 NW 68th St")
    cy.get("table tr").first()
      .should("have.text", "approx. age:75 years")
      .next()
      .should("have.text", "approx. height:100 feet")
    cy.get('[data-cy="popup-author"]').should("have.text", "posted by: Bonnie Birch")
    cy.get('[data-cy="popup-thumbnail"]').invoke("attr", "src").should("eq", "https://www.treegirl.org/uploads/4/4/2/8/44289563/mossy-maple-moss-woman-3727-treegirl-6-10-22-900pix_orig.jpg")
  })
  
  it("should navigate to the newly-created tree's detail view", () => {
    cy.get('[data-cy="form-submit"]').click()
    cy.get('.leaflet-container').click(285, 30)
    cy.get('[data-cy="popup-button"]').click()
    cy.url().should("eq", "http://localhost:3000/5")
  })

  it("should display the correct data in the newly-created tree's detail view", () => {
    cy.get('[data-cy="form-submit"]').click()
    cy.get('.leaflet-container').click(285, 30)
    cy.get('[data-cy="popup-button"]').click()

    cy.get('[data-cy="details-common"]').should("have.text", "Bigleaf Maple")
    cy.get('[data-cy="details-sci"]').should("have.text", "Acer macrophyllum")
    cy.get('[data-cy="details-location"]').contains("3029 NW 68th St")
    cy.get('[data-cy="details-location"]').contains("Ballard")
    cy.get('[data-cy="details-table"] tr').first()
      .should("have.text", "approx. age:75 years")
      .next()
      .should("have.text", "approx. height:100 feet")
      .next()
      .should("have.text", "base circumference:80 inches")
      .next()
      .should("have.text", "Washington native:yes")
    cy.get('[data-cy="details-author"]').should("have.text", "posted by: Bonnie Birch")
    cy.get('[data-cy="details-image"]').invoke("attr", "src").should("eq", "https://www.treegirl.org/uploads/4/4/2/8/44289563/mossy-maple-moss-woman-3727-treegirl-6-10-22-900pix_orig.jpg")
  })
})