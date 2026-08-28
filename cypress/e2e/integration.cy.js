/**
 * PRUEBA E2E: Flujo asíncrono React -> Node
 */
describe('Integración Frontend-Backend', () => {
  it('Debería mostrar el loader y luego renderizar los datos del servidor', () => {
    
    // 1. Interceptamos la petición HTTP antes de visitar la página
    cy.intercept('GET', 'http://localhost:3001/api/status').as('getStatusAPI');

    // 2. Visitamos la aplicación
    cy.visit('/');

    // 3. Verificamos que el estado de carga (loader) se muestra inmediatamente
    cy.get('#loading-indicator').should('be.visible');

    //screen
    cy.screenshot('01-loader-visible');

    // 4. Esperamos de forma explícita y determinista a que la API responda.
    // Esto evita el uso de pausas manuales (ej. cy.wait(2000)) que causan flakiness.
    cy.wait('@getStatusAPI');

    // 5. Validamos que el loader desapareció y la UI final se renderizó correctamente
    cy.get('#loading-indicator').should('not.exist');
    cy.get('#success-panel').should('be.visible');
    cy.get('#server-data').should('have.text', '¡Sistemas operativos y sincronizados!');

    cy.screenshot('02-datos-cargados');
  });
});