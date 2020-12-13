describe('#mock', () => {
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
    const mockFunction = jest.fn().mockImplementation(() => 'Hello');
    // const mockFunction = jest.fn(() => 'Hello');
    expect(mockFunction()).toBe('Hello');
  });
  it('return `Hello` once then it returns `Goodbye`', () => {
    const mockFunction = jest.fn()
      .mockImplementationOnce(() => 'Hello')
      .mockImplementationOnce(() => 'Goodbye');
    expect(mockFunction()).toBe('Hello');
    expect(mockFunction()).toBe('Goodbye');
    expect(mockFunction()).toBe(undefined);
  });
});
