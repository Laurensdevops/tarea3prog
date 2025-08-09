const { Builder, By, Key, until } = require('selenium-webdriver');
const assert = require('assert');

describe('Pruebas automatizadas con Selenium', function () {
  this.timeout(30000);
  let driver;

  before(async () => {
    driver = await new Builder().forBrowser('chrome').build();
  });

  after(async () => {
    await driver.quit();
  });

  it('Debe buscar "Selenium" en Google y verificar título', async () => {
    await driver.get('https://www.google.com');
    await driver.findElement(By.name('q')).sendKeys('Selenium', Key.RETURN);
    await driver.wait(until.titleContains('Selenium'), 5000);
    const title = await driver.getTitle();
    assert.ok(title.includes('Selenium'), 'El título no contiene Selenium');
  });

  it('Debe iniciar sesión correctamente con usuario y contraseña válidos', async () => {
    // Cambia esta URL por la URL local o remota de tu app
    await driver.get('http://localhost:8080/auth');

    // Cambia los selectores según tu formulario
    await driver.findElement(By.id('email')).sendKeys('christofer@influborn.com');
    await driver.findElement(By.id('password')).sendKeys('tu_contraseña');

    await driver.findElement(By.id('loginBtn')).click();

    // Esperar a que la URL cambie o algún indicador de login exitoso
    await driver.wait(until.urlContains('/dashboard'), 10000);

    const url = await driver.getCurrentUrl();
    assert.ok(url.includes('/dashboard'), 'No se logró iniciar sesión correctamente');
  });

  it('Prueba simple para validar Mocha funcionando', function() {
    assert.strictEqual(1 + 1, 2);
  });
});
