const fetchData = () => new Promise(resolve => setTimeout(resolve, 1000, 'lemon'));

const runMultipleTests = n => {
  Array.from(new Array(n).keys()).map(i => {
    it.concurrent(`test-${i}: return lemon`, async () => {
      await expect(fetchData()).resolves.toBe('lemon');
    });
  });
};

describe.skip('parallel tests', () => {
  runMultipleTests(100);
});
