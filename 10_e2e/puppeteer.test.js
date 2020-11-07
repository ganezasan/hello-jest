import puppeteer from 'puppeteer';

describe('e2e test with puppeteer', () => {
  let chromeDriver = {};

  beforeAll(async () => {
    chromeDriver = await puppeteer.launch();
  });

  afterAll(async () => {
    await chromeDriver.close();
  });

  it('When using Chrome, the search keyword would be the title in the page on google.com', async () => {
    // google.comにアクセス
    const page = await chromeDriver.newPage();

    await page.goto('https://www.google.com/ncr');
    // 検索ボックスの要素を探し、webdriver`、エンターキーを入力
    await page.type('input[name="q"]', 'webdriver');
    await page.keyboard.press("Enter");

    // ページのタイトルが`webdriver - Google Search`に切り替わるまで待つ
    await page.waitForNavigation({ timeout: 2000 });
    await expect(page.title()).resolves.toBe('webdriver - Google Search');
  });
});