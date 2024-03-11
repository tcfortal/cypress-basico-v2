/// <reference types="Cypress" />

const { Button } = require("bootstrap")

describe('Central de Atendimento ao Cliente TAT', function() {
const THREE_SECONDS_IN_MS = 3000    
this.beforeEach(function() {
    cy.visit('./src/index.html')
})

    it('verifica o titulo da aplicacao', function() {
        cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
    })

    it.only('preenche os campos obrigatórios e envia formulário', function() {
        const textLong = "teste - teste - teste - teste- teste - teste - teste- teste - teste - teste- teste - teste - teste- teste - teste - teste- teste - teste - teste- teste - teste - teste- teste - teste - teste"
        cy.clock()
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('costa')
        cy.get('#email').type('thiagocesarcosta13@gmail.com')
        cy.get('#open-text-area').type(textLong, {delay:0})
        cy.contains('button', 'Enviar').click()

        cy.get('.success').should('be.visible')
         cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')


    })

    it.only('exibe mensagem de erro ao submeter o formulário com um email com formatação', function(){
        cy.clock()
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('costa')
        cy.get('#email').type('thiagocesarcosta13@gmail,com')
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
        cy.tick(THREE_SECONDS_IN_MS)
        cy.get('.success').should('not.be.visible')

    })

    it('campo telefone continua vazio quando preenchido com valor nao numerico', function() {
        cy.get('#phone')
        .type('123456')
        .should('have.value', '123456')

    })

    it('exibe mensagem de erro quando o telefone se torna um item obrigatório, mas nao é preenchido', function() {
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('costa')
        cy.get('#email').type('thiagocesarcosta13@gmail,com')
        cy.get('#phone-checkbox').click()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('exibe mensagem de erro quando o telefone se torna um item obrigatório, mas nao é preenchido', function() {
        cy.get('#firstName').type('Thiago')
        cy.get('#lastName').type('costa')
        cy.get('#email').type('thiagocesarcosta13@gmail.com')
        cy.get('#phone-checkbox').check()
        cy.get('#open-text-area').type('teste')
        cy.get('button[type="submit"]').click()

        cy.get('.error').should('be.visible')
    })

    it('preenche e limpa os campos nome, sobrenome, email, telefone', function() {+
    cy.get('#firstName').type('thiago').should('have.value', 'thiago')
    .clear().should('have.value', '')
    cy.get('#lastName').type('costa').should('have.value', 'costa')
    .clear().should('have.value', '')
    cy.get('#phone').type('12345678').should('have.value', '12345678')
    .clear().should('have.value', '')
    })


    it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function() {
        cy.get('button[type="submit"]').click()
        cy.get('.error').should('be.visible')
    })

    it('envia o formulário com sucesso usando um comando customizado', function() {
        cy.fillMandatoryFieldsAndSubmit()
        cy.get('.error').should('be.visible')
    })

    it('seleciona um produto (youtube) por seu texto', function() {
        cy.get('#product').select('youtube').should('have.value', 'youtube')
    })

    it('seleciona um produto (mentoria) por seu valor (value)', function() {
        cy.get('#product')
        .select('mentoria')
        .should('have.value', 'mentoria')
    })

    it('selecionar um produto pelo seu indice', function() {
        cy.get('#product')
        .select(1)
        .should('have.value', 'blog')
    })

    it('marcar um radio button', function(){
        cy.get('input[type="radio"][value="elogio"]').check()
        .should('have.value', 'elogio')
        
    })

    it('marca cada tipo de radio button e valida', function(){
      cy.get('input[type="radio"]').should('have.length', 3)
      .each(function($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    })

    it('marcar ambos os checkbox, depois desmarcar o ultimo ', function(){
     cy.get('input[type="checkbox"]').check()
     .last().uncheck().should('not.be.checked')
    })

    it('selecione um arquivo da pasta fixtures', function(){
        cy.get('input[type="file"]').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json')
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')

        })
    })

    it('seleciona um arquivo simulando um drag-and-drop', function(){
        cy.get('input[type="file"]').should('not.have.value')
        .selectFile('./cypress/fixtures/example.json', {action: 'drag-drop'})
        .should(function($input) {
            expect($input[0].files[0].name).to.equal('example.json')

        })
    })

    it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', function(){
        cy.fixture('example.json').as('sampleFile')
        cy.get('input[type="file"]')
        .selectFile('@sampleFile')
        .should(function($input){
            expect($input[0].files[0].name).to.equal('example.json')
        })
    })

    it('verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', function(){
        cy.get('#privacy a').should('have.attr', 'target', '_blank')
    })

    it('acessa a pagina de politica de privacidade removendo o target e entao clicando no link', function(){
        cy.get('#privacy a').invoke('removeAttr', 'target').click()

        cy.contains('Talking About Testing').should('be.visible')
    })

    it('testa a pagina de politica de privacidade de forma independente', function(){
     cy.visit('./src/privacy.html')
    })

    
})