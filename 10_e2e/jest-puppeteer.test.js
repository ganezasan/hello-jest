
describe('Open Google with jest-puppeteer', () => {
  it('should be titled "Google"', async () => {
    await page.goto('https://google.com');
    await expect(page.title()).resolves.toMatch('Google');
  });
});