const isSour = item => item === 'lemonade' ? true : false;

describe('#isSour', () => {
  test('cola is not sour', () => {
    expect(isSour('cola')).toBe(false);
  });

  it('lemonade is sour', () => {
    expect(isSour('lemonade')).toBe(true);
  });
});


const getBeverage = age => {
  const beverages = [
    {name: 'coke', alcohol: false}, 
    {name: 'lemonade', alcohol: false},
    {name: 'beer', alcohol: true},
  ];

  // 二十歳未満の場合はalcoholがfalseのモノのみ抽出する
  const filteredBeverages = age >= 20 ? beverages : beverages.filter(b => b.alcohol === false);

  // 乱数を取得
  const seed = Math.floor(Math.random() * Math.floor(filteredBeverages.length));
  return filteredBeverages[seed];
};

describe('#getBeverageFlavor', () => {
  const spy = jest.spyOn(Math, 'random')
    .mockImplementationOnce(() => 0.7) // 乱数を3へ
    .mockImplementationOnce(() => 0); // 乱数を1へ
  const adult = 20;

  afterAll(() => {
    spy.mockRestore();
    // jest.restoreAllMocks();
  });

  test('return beer when age is 20', () => {
    expect(getBeverage(adult).name).toBe('beer');
  });

  it('return cola when age is 20', () => {
    expect(getBeverage(adult).name).toBe('coke');
  });
});

test('Math.random returns number which less than 1', () => {
  console.log(Math.random())
  expect(Math.random() < 1).toBe(true);
});

// 前後処理の実行されるタイミング
describe('before/after timing', () => {
  beforeAll(() => console.log('1 - beforeAll'));
  afterAll(() => console.log('1 - afterAll'));
  beforeEach(() => console.log('1 - beforeEach'));
  afterEach(() => console.log('1 - afterEach'));
  test('', () => console.log('1 - test'));
  describe('Scoped / Nested block', () => {
    beforeAll(() => console.log('2 - beforeAll'));
    afterAll(() => console.log('2 - afterAll'));
    beforeEach(() => console.log('2 - beforeEach'));
    afterEach(() => console.log('2 - afterEach'));
    test('', () => console.log('2 - test'));
  });
});