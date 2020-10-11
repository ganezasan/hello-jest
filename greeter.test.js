import greeter, { greet } from './greeter';

describe('#greeter', () => {
  describe('#greet', () => {
    const noonTime = new Date('2020-10-10T13:00:00');
    const morningTime = new Date('2020-10-10T11:00:00');
    
    beforeEach(() => {
      Date = jest.fn(() => noonTime);
    });

    describe('mock date function', () => {
      it('Hello <name> when the time is 12:00 - 05:59', () => {
        expect(greet('taka')).toEqual('Hello Taka!');
      });

      it('Good morning <name> when the time is 06:00-11:59', () => {
        Date = jest.fn(() => morningTime);
        expect(greet('daniel')).toEqual('Good morning Daniel!');
      });
    });

    describe('#testing greet function with babel-plugin-rewire', () => {
      beforeAll(() => {
        greeter.__set__({
          'capitalize': jest.fn().mockImplementation(() => "REWIER")
        });
      })
      afterAll(() => {
        greeter.__ResetDependency__('capitalize');
      })

      it('return `Hello REWIER`', () => {
        expect(greet('rewire')).toBe('Hello REWIER!');
      });
    });
  });

  describe('#capitalize', () => {
    const capitalize = greeter.__get__('capitalize');

    it('return string which the first char is capitalized', () => {
      expect(capitalize('maru')).toBe('Maru');
    });
  });
});
