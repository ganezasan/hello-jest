describe('#jest.fn', () => {
  it('Check `jest.fn()` specification', () => {
    const mockFunction = jest.fn();
    expect(mockFunction()).toBe(undefined); // mockFunction関数の結果は`undefined`である
    expect(mockFunction).toHaveProperty('mock'); // mockFunction関数はmockプロパティを持っている
    expect(mockFunction.mock.calls.length).toBe(1); // mockFunction関数は1度呼び出された
    expect(mockFunction.mock.calls[0]).toEqual([]); // mockFunction関数が1度呼び出された際に、引数は空だった
    expect(mockFunction.mock.results.length).toBe(1); // mockFunction関数の結果は1つある
    expect(mockFunction.mock.results[0].type).toBe('return'); // mockFunction関数が1度目に呼び出された結果は正常にリターンされている
    expect(mockFunction.mock.results[0].value).toBe(undefined); // mockFunction関数の1度目の結果は`undefined`である
    expect(mockFunction.mock.instances[0]).toBe(undefined); // mockFunction関数からnewを利用してインスタンスを作成していない
  });
  it('return `Hello`', () => {
    const mockFunction = jest.fn().mockImplementation(() => 'Hello'); // mockFunction関数の返り値にHelloを設定
    // const mockFunction = jest.fn(() => 'Hello');
    expect(mockFunction()).toBe('Hello');
  });
  it('return `Hello` once then it returns `Goodbye`', () => {
    const mockFunction = jest.fn()
      .mockImplementationOnce(() => 'Hello')
      .mockImplementationOnce(() => 'Goodbye');
    expect(mockFunction()).toBe('Hello');
    expect(mockFunction()).toBe('Goodbye');
    expect(mockFunction()).toBe(undefined); // デフォルトの返り値である`undefined`がリターンされる
  });
});

describe('#spyOn', () => {
  const spy = jest.spyOn(Math, 'random').mockImplementation(() => 1) // Math.random()は1を返す、オリジナルの関数では0から1以下を返します

  afterEach(() => {
    spy.mockRestore();
    // jest.restoreAllMocks(); // 他にモック化している関数があれば、こちら1行ですべてのモック化した関数を元に戻すことができます
  });

  it('Math.random return 1', () => {
    expect(Math.random()).toEqual(1);
  });

  it('Math.random return under 1', () => {
    expect(Math.random()).toBeLessThan(1); // 1未満である
    // expect(Math.random() < 1).toEqual(true); // toEqualで1未満であることを評価する
  });
});

describe('#reset mocks with spyOn', () => {
  const mockDate = new Date('2019-12-21'); // 1年前の今日
  const originalDate = new Date('2020-12-25');
  let spy = null;
  beforeEach(() => {
    spy = jest.spyOn(global, "Date").mockImplementation(() => mockDate);
  });

  afterEach(() => {
    spy.mockRestore();
  });

  it('jest.clearAllMocks', () => {
    // Dateに引数で他の日時を与えても、mockDateが返される
    expect(new Date('2020-12-25')).toEqual(mockDate);
    expect(spy.mock.calls).toEqual([['2020-12-25']]);
    expect(spy.mock.instances).toEqual([{}]); // mock関数の返り値がオブジェクトである場合、mockInstanceは作成されない。こちらの挙動について、なぜそうなるのかJestのissueで確認しています https://github.com/facebook/jest/issues/10965
    expect(spy.mock.results).toEqual([ { type: 'return', value: mockDate } ]);

    // リセット
    jest.clearAllMocks();

    // mockのプロパティがすべてリセットされる
    expect(spy.mock.calls).toEqual([]);
    expect(spy.mock.instances).toEqual([]);
    expect(spy.mock.results).toEqual([]);

    // mock関数は引き続き利用できる
    expect(new Date('2020-12-25')).toEqual(mockDate);
  });

  it('jest.resetAllMocks', () => {
    expect(new Date('2020-12-25')).toEqual(mockDate);
    expect(spy.mock.calls).toEqual([['2020-12-25']]);
    expect(spy.mock.instances).toEqual([{}]);
    expect(spy.mock.results).toEqual([ { type: 'return', value: mockDate } ]);

    jest.resetAllMocks();

    // mockのプロパティがすべてリセットされる
    expect(spy.mock.calls).toEqual([]);
    expect(spy.mock.instances).toEqual([]);
    expect(spy.mock.results).toEqual([]);

    // mock関数はリセットされ、デフォルトでは`{}`が返される
    expect(new Date('2020-12-25')).toEqual({});
  });

  it('jest.restoreAllMocks', () => {
    expect(new Date('2020-12-25')).toEqual(mockDate);
    expect(spy.mock.calls).toEqual([['2020-12-25']]);
    expect(spy.mock.instances).toEqual([{}]);
    expect(spy.mock.results).toEqual([ { type: 'return', value: mockDate } ]);

    jest.restoreAllMocks();

    // mockのプロパティはリセットされない
    expect(spy.mock.calls).toEqual([['2020-12-25']]);
    expect(spy.mock.instances).toEqual([{}]);
    expect(spy.mock.results).toEqual([ { type: 'return', value: mockDate } ]);

    // mock関数がリセットされ、オリジナルのDate関数が実行される
    expect(new Date('2020-12-25')).toEqual(originalDate);
  });
});

describe('#reset mocks with jest.fn', () => {
  const mockDate = new Date('2019-12-21'); // 1年前の今日
  const originalDate = new Date('2020-12-25');

  beforeEach(() => {
    Date = jest.fn(() => mockDate);
  });

  it('jest.clearAllMocks', () => {
    expect(new Date('2020-12-25')).toEqual(mockDate);
    expect(Date.mock.calls).toEqual([['2020-12-25']]);
    expect(Date.mock.instances).toEqual([{}]);
    expect(Date.mock.results).toEqual([ { type: 'return', value: mockDate } ]);

    // リセット
    jest.clearAllMocks();

    // mockのプロパティがすべてリセットされる
    expect(Date.mock.calls).toEqual([]);
    expect(Date.mock.instances).toEqual([]);
    expect(Date.mock.results).toEqual([]);

    // mock関数は引き続き利用できる
    expect(new Date('2020-12-25')).toEqual(mockDate);
  });

  it('jest.resetAllMocks', () => {
    expect(new Date('2020-12-25')).toEqual(mockDate);
    expect(Date.mock.calls).toEqual([['2020-12-25']]);
    expect(Date.mock.instances).toEqual([{}]);
    expect(Date.mock.results).toEqual([ { type: 'return', value: mockDate } ]);

    jest.resetAllMocks();

    // mockのプロパティがすべてリセットされる
    expect(Date.mock.calls).toEqual([]);
    expect(Date.mock.instances).toEqual([]);
    expect(Date.mock.results).toEqual([]);

    // mock関数はリセットされ、デフォルトでは`{}`が返される
    expect(new Date('2020-12-25')).toEqual({});
  });

  it('jest.restoreAllMocks', () => {
    expect(new Date('2020-12-25')).toEqual(mockDate);
    expect(Date.mock.calls).toEqual([['2020-12-25']]);
    expect(Date.mock.instances).toEqual([{}]);
    expect(Date.mock.results).toEqual([ { type: 'return', value: mockDate } ]);

    jest.restoreAllMocks();

    // mockのプロパティはリセットされない
    expect(Date.mock.calls).toEqual([['2020-12-25']]);
    expect(Date.mock.instances).toEqual([{}]);
    expect(Date.mock.results).toEqual([ { type: 'return', value: mockDate } ]);

    // spyOnの場合と異なり、jest.fnで関数にモック関数を上書きした場合は、restoreAllMocksを利用してもオリジナルの関数へは元に戻らない
    expect(new Date('2020-12-25')).not.toEqual(originalDate);
    expect(new Date('2020-12-25')).toEqual(mockDate);
  });
});
  