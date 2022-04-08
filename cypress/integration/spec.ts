import { outils } from "cypress/support/TodoList.page"


describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/')
    outils.tailleListe(0).ajouterElement("hello, world").tailleListe(1);
  })
})
