import "./support/commands"

declare global {
  namespace Cypress {
    interface Chainable {
      getByData(value: string): Chainable<JQuery<HTMLElement>>
    }
  }
}