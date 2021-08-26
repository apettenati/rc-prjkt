import 'cypress-react-selector';

/// <reference types="cypress" />
import { user } from '../fixtures/user';

describe('Form Validation', () => {
    beforeEach(() => {
        cy.visit('/');
        cy.login(user);
        cy.visit('/');
        cy.waitForReact();
    });

    it('Title field validation displays error when focused and unfocused without value', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'title' } }).click();
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('title is required');
    });

    it('Description field displays error when value is < 20 characters', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('textarea', { props: { name: 'description' } }).type('a');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('must be 20 characters or longer');
    });

    it('Description field displays error when value is > 480 characters', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('textarea', { props: { name: 'description' } }).type(
            'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.',
        );
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('must be 480 characters or less');
    });

    it('Github Link field field displays error when url is not formatted properly (two `dots`)', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'githubLink' } }).type('github..c');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('enter a valid url');
    });

    it('Github Link field field displays error when url is not formatted properly (no prefix)', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'githubLink' } }).type('.com');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('enter a valid url');
    });

    it('Github Link field field displays error when url is not formatted properly (no `.com`)', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.react('input', { props: { name: 'githubLink' } }).type('guugel');
        cy.get('[data-testid=add-project-modal-title]').click();
        cy.get('.MuiFormHelperText-root').contains('enter a valid url');
    });

    it('A project cannot be submitted with a required field missing (title)', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // focus & unfocus title field
        cy.react('input', { props: { name: 'title' } }).click();
        cy.get('[data-testid=add-project-modal-title]').click();

        // add description
        cy.react('textarea', { props: { name: 'description' } }).type('sample description here');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add github link
        cy.react('input', { props: { name: 'githubLink' } }).type('github.com');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add collaborators
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .last()
                .click();
        });

        // select single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
        });

        // create single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type('javascript{enter}');
        });

        // submit
        cy.get('[data-testid=form-submit-button]').click();
        cy.get('[data-testid=form-submit-button]').should('be.visible');
    });

    it('A project cannot be submitted if the description length is too short', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // focus & unfocus title field
        cy.react('input', { props: { name: 'title' } }).type('Sample Title');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add description
        cy.react('textarea', { props: { name: 'description' } }).type('a');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add github link
        cy.react('input', { props: { name: 'githubLink' } }).type('github.com');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add collaborators
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .last()
                .click();
        });

        // select single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
        });

        // create single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type('javascript{enter}');
        });

        // submit
        cy.get('[data-testid=form-submit-button]').click();
        cy.get('[data-testid=form-submit-button]').should('be.visible');
    });

    it('A project cannot be submitted if the description length is too long', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // focus & unfocus title field
        cy.react('input', { props: { name: 'title' } }).type('Sample Title');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add description
        cy.react('textarea', { props: { name: 'description' } }).type(
            'It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair, we had everything before us, we had nothing before us, we were all going direct to Heaven, we were all going direct the other way – in short, the period was so far like the present period, that some of its noisiest authorities insisted on its being received, for good or for evil, in the superlative degree of comparison only.',
        );
        cy.get('[data-testid=add-project-modal-title]').click();

        // add github link
        cy.react('input', { props: { name: 'githubLink' } }).type('github.com');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add collaborators
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .last()
                .click();
        });

        // select single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
        });

        // create single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type('javascript{enter}');
        });

        // submit
        cy.get('[data-testid=form-submit-button]').click();
        cy.get('[data-testid=form-submit-button]').should('be.visible');
    });

    it('A project cannot be submitted if the github link is not properly formatted', () => {
        cy.get('[data-testid="add-project-button"]').click();
        cy.wait(500);

        // focus & unfocus title field
        cy.react('input', { props: { name: 'title' } }).type('Sample Title');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add description
        cy.react('textarea', { props: { name: 'description' } }).type(
            'This is a sample description for a sample project',
        );
        cy.get('[data-testid=add-project-modal-title]').click();

        // add github link
        cy.react('input', { props: { name: 'githubLink' } }).type('github.,co');
        cy.get('[data-testid=add-project-modal-title]').click();

        // add collaborators
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(1)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .last()
                .click();
        });

        // select single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]')
                .click(0, 0, { force: true })
                .get('[class*="-menu"]')
                .find('[class*="-option"]')
                .first()
                .click();
        });

        // create single tag
        cy.get('.MuiGrid-spacing-xs-2 > :nth-child(2)').within(() => {
            cy.get('[class*="-control"]').click(0, 0, { force: true }).type('javascript{enter}');
        });

        // submit
        cy.get('[data-testid=form-submit-button]').click();
        cy.get('[data-testid=form-submit-button]').should('be.visible');
    });
});
