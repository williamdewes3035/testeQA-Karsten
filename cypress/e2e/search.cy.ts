/// <reference types="Cypress" />

describe('search functionality', () => {
    //Funcionalidade implementada pois ao acessar site da Karsten, Cypress recebe uma exception e nao consegue seguir com os testes
    Cypress.on('uncaught:exception', (err, runnable) => {
        return false
    });

    it('Search for "blue towel"', () => {
        //Necessário aplicar wait de 2 sec pois a aplicação faz diversas requisições em todas as telas.
        //Como o Cypress aguarda todas as req anteriores serem finalizadas para continuar o teste, ele quebra o teste pois os gets feitos abaixo quebram por exceder 4 sec sem encontrar o elemento solicitado.
        cy.viewport(1366,768);
        cy.visit('https://www.karsten.com.br');

        cy.wait(3000);
        cy.get('.iokarsten-store-1-x-popup_news_container')
            .children()
            .first()
            .click({force:true})
            .as('close-modal');

        cy.get('.mw7')
            .type('Toalha Azul{enter}');

        cy.wait(2000);

        cy.get('#gallery-layout-container')
            .children()
            .first()
            .children()
            .invoke('text')
            .should('contain', 'Toalha')
            .and('contain', 'Azul')
    });
});