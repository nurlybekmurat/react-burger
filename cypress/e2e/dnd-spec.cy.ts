describe('Тестирование D&D', () => {
  it('Ингредиенты должны перетаскиваться в конструктор', () => {
    cy.visit('http://localhost:3000/');
    // ингредиент
    cy.get('[data-test="Соус Spicy-X"]').trigger('dragstart');
    cy.get('[data-test="BurgerConstructor"]').trigger('drop');
    cy.get('[data-test="Соус Spicy-X"]').trigger('dragover');
    cy.get('[data-test="BurgerConstructor"]').contains('Соус Spicy-X');
  })
  it('а булка должна отображаться сверху и снизу', () => {
    cy.visit('http://localhost:3000/');
    cy.get('[data-test="Краторная булка N-200i"]').trigger('dragstart');
    cy.get('[data-test="BurgerConstructor"]').trigger('drop');
    cy.get('[data-test="Краторная булка N-200i"]').trigger('dragover');


    // cy.get('[data-test="BurgerConstructor"]').contains('Краторная булка N-200i (верх)');
    // cy.get('[data-test="BurgerConstructor"]').contains('Краторная булка N-200i (низ)');
  })
})