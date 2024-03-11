/// <reference types="Cypress" />

const { Button } = require("bootstrap")

describe('Central de Atendimento ao Cliente TAT', function() {
const THREE_SECONDS_IN_MS = 3000    
this.beforeEach(function() {
    cy.visit('./src/index.html')
})

Cypress._.times(1, function(){
    it('testa a pagina de politica de privacidade de forma independente', function(){
        cy.visit('./src/privacy.html')

        cy.contains('Talking About Testing').should('be.visible')
    })

    it("exibe e esconde as mensagens de sucesso e erro usando o .invoke", () => {
        cy.visit('./src/index.html')
        cy.get('.success')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', 'Mensagem enviada com sucesso.')
            .invoke('hide')
            .should('not.be.visible')
        cy.get('.error')
            .should('not.be.visible')
            .invoke('show')
            .should('be.visible')
            .and('contain', "Valide os campos obrigatórios")
            .invoke('hide')
            .should('not.be.visible')
    })

    it('preenche area de texto usando o comando invoke', function() {
       const longText = Cypress._.repeat('texto', 10)
        cy.visit('./src/index.html')
        cy.get('#open-text-area')
        .invoke('val',longText)
        .should('have.value', longText)
    })

    it('faz uma requisição HTTP', function() {
        cy.request('https://cac-tat.s3.eu-central-1.amazonaws.com/index.html')
        .should(function(res){
            const {status, statusText, body} = res
            expect(status).to.equal(200)
            expect(statusText).to.equal('OK')
            expect(body).to.include('CAC TAT')
        })
    })

    it('encontrar o gato', function() {
        cy.visit('./src/index.html')
        cy.get('#cat')
        .should('not.be.visible')
        .invoke('show')
        .should('be.visible')
    } )

    
})
})
