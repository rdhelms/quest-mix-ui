describe('Home', () => {
    it('Visits the app root url', () => {
        cy.visit('/')
        cy.contains('Quest Mix')
    })
})
