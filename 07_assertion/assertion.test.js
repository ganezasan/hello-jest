// イコールを評価する`toBe`と`toEqual`

const can1 = {
  flavor: 'grapefruit',
  ounces: 12,
};
const can2 = {
  flavor: 'grapefruit',
  ounces: 12,
};

const can3 = can2;

test('have all the same properties', () => {
  expect(can1).toEqual(can2);
});

test('are not the exact same can', () => {
  expect(can1).not.toBe(can2);
});

test('are the same value', () => {
  expect(can1.ounces).toBe(can2.ounces);
  expect(can1.ounces).toEqual(can2.ounces);
});

test('are the same references', () => {
  expect(can2).toBe(can3);
});

test('toEqual can\'t compare class name', () => {
  class Foo {
    constructor () {
      this.message = 'hello';
    }
  }
  
  class Bar extends Foo {
    constructor () {
      super();
    }
  }

  const foo = new Foo();
  const bar = new Bar();
  expect(foo).toEqual(bar);
  expect(foo.constructor.name).not.toEqual(bar.constructor.name);
});

// Errorの評価

test('throw Error when passing no variable', () => {
  class Foo {
    constructor ({ message }) {
      this.message = message;
    }
  }

  expect(() => new Foo()).toThrow();
  expect(() => new Foo()).toThrow(TypeError); //型のチェック
  expect(() => new Foo()).toThrow("Cannot destructure property 'message' of 'undefined' as it is undefined."); //エラーメッセージのチェック
});


// 非同期の関数の結果の評価
// callback
const fetchDataWithCallback = callback => {
  setTimeout(callback, 3000, 'lemon');
};

test('return lemon', done => {
  const callback = data => {
    expect(data).toBe('lemon');
    done();
  };

  fetchDataWithCallback(callback);
});

// promise
const fetchData = (category='fruit') => category === 'fruit'
  ? Promise.resolve('lemon') 
  : Promise.reject(new Error('not exist'));

test('resolves to lemon', () => {
  return expect(fetchData()).resolves.toBe('lemon');
});

test('resolves to lemon with async/await', async () => {
  await expect(fetchData()).resolves.toBe('lemon');
});

test('rejects with fish', () => {
  return expect(fetchData('fish')).rejects.toThrow(
    'not exist',
  );
});