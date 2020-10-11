describe('#mock', () => {
  it('Check `jest.fn()` specification', () => {
    const mockFunction = jest.fn();
    expect(mockFunction()).toBe(undefined);
    expect(mockFunction).toHaveProperty('mock');
    expect(mockFunction.mock.calls.length).toBe(1);
    expect(mockFunction.mock.calls[0]).toEqual([]);
    expect(mockFunction.mock.results.length).toBe(1);
    expect(mockFunction.mock.results[0].type).toBe('return');
    expect(mockFunction.mock.results[0].value).toBe(undefined);
    expect(mockFunction.mock.instances[0]).toBe(undefined);
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
