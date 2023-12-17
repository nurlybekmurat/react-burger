describe('Тестирование отправки заказа', () => {
  beforeEach(() => {
    cy.intercept("POST", "api/auth/login", { fixture: "login.json" });
    cy.intercept("GET", "api/auth/user", { fixture: "user.json" });
    cy.intercept("POST", "api/orders", { fixture: "order.json" }).as("postOrder");

    window.localStorage.setItem(
      "accessToken",
      JSON.stringify("test-accessToken")
    );
    cy.visit("http://localhost:3000");
  });
  
  it('Заказ должен успешно отправляться с добавленными ингредиентами', () => {
    cy.get('[data-test="Краторная булка N-200i"]').trigger('dragstart');
    cy.get('[data-test="BurgerConstructor"]').trigger('drop');
    cy.get('[data-test="Краторная булка N-200i"]').trigger('dragover');

    cy.get('[data-test="Соус Spicy-X"]').trigger('dragstart');
    cy.get('[data-test="BurgerConstructor"]').trigger('drop');
    cy.get('[data-test="Соус Spicy-X"]').trigger('dragover');


    cy.get('[data-test="SendOrder"]').click();
    cy.get('[id="modal"]').contains('123');
  })
})