describe('Flipkart Login - Request OTP', () => {
  it('opens site, enters mobile, requests OTP and sees validation', () => {
    cy.visit('/', { failOnStatusCode: false });
    cy.get('body').type('{esc}');
    cy.xpath("//button[@aria-label='Close' or contains(., '✕')]").then($b => { if ($b.length) cy.wrap($b[0]).click({ force: true }); });

    cy.xpath("//a[contains(@href,'/account/login')] | //span[normalize-space()='Login' or normalize-space()='Log in']/ancestor::a[1] | //div[normalize-space()='Login']/ancestor::a[1] | //span[normalize-space()='Login' or normalize-space()='Log in']")
      .should('be.visible')
      .click({ force: true });

    cy.url({ timeout: 20000 }).should('include', '/account/login');

    cy.xpath("//input[contains(@class, 'r4vIwl') and contains(@class, 'BV+Dqf')]")
      .should('be.visible')
      .clear()
      .type('99987654323');

    cy.xpath("//button[.//span[contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'request otp')] or contains(translate(.,'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'request otp') or contains(.,'CONTINUE') or contains(.,'Continue')]")
      .click({ force: true });

    cy.xpath("//*[contains(normalize-space(.), 'Please enter valid Email ID/Mobile number')]")
      .should('be.visible');
  });
});