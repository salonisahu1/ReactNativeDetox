describe('Example', () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  beforeEach(async () => {
    await device.reloadReactNative();
  });

  it('should login successfully', async () => {
    await expect(element(by.id('Login'))).toBeVisible();
    await element(by.id('Email')).typeText('saloni@geekyants.com');
    await element(by.id('Password')).typeText('goldtree9');
    await element(by.id('LoginButton')).tap();
    await waitFor(element(by.id('WelcomeText')))
      .toBeVisible()
      .withTimeout(2000);
    await element(by.id('LogoutButton')).tap();
  });
});
