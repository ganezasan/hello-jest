import { Builder, By, Key, until, Capabilities } from 'selenium-webdriver';

jest.setTimeout(10000); // タイムアウトを10秒に延長

describe('e2e test with selenium', () => {
  let chromeDriver = {};
  let geckoDriver = {};

  beforeAll(async () => {
    const chromeCapabilities = Capabilities.chrome();
    const fireFoxCapabilities = Capabilities.firefox();
    chromeCapabilities.set('goog:chromeOptions', {
      args: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--lang=en-US',
        // '--user-data-dir=./tmp_user_data', //--headlessを外す場合は有効化する
      ],
    });

    fireFoxCapabilities.set('moz:firefoxOptions', {
      args: [
        '-headless',
      ],
    });

    chromeDriver = await new Builder().withCapabilities(chromeCapabilities).build();
    geckoDriver = await new Builder().withCapabilities(fireFoxCapabilities).build();
  });

  afterAll(async () => {
    await chromeDriver.quit();
    await geckoDriver.quit();
  });

  it('When using Chrome, the search keyword would be the title in the page on google.com', async () => {
    // google.comにアクセス
    await chromeDriver.get('https://www.google.com/ncr');
    // 検索ボックスの要素を探し、webdriver`、エンターキーを入力
    await chromeDriver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    // ページのタイトルが`webdriver - Google Search`に切り替わるまで待つ
    const results = await chromeDriver.wait(until.titleIs('webdriver - Google Search'), 5000);
    expect(results).toBe(true);
  });

  it('When using Firefox, the search keyword would be the title on the page in google.com', async () => {
    // google.comにアクセス
    await geckoDriver.get('https://www.google.com/ncr');
    // 検索ボックスの要素を探し、webdriver`、エンターキーを入力
    await geckoDriver.findElement(By.name('q')).sendKeys('webdriver', Key.RETURN);
    // ページのタイトルが`webdriver - Google Search`に切り替わるまで待つ
    const results = await geckoDriver.wait(until.titleIs('webdriver - Google Search'), 5000);
    expect(results).toBe(true);
  });
});