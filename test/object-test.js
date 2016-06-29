const expect= require('expect');


describe('learningObjects', () => {
  it('should be made with object literals', () => {
    const object = {};

    expect(object).toEqual({});
  });

  it('can have value(s) set when being created with an object literal', () => {
    const object = { foo:'bar' };
    expect(object).toEqual({foo: 'bar'});
  });

  it('can have multiple values set when createdd with an object with an object literal', () => {
    const object = {
      name: "Abbey",
      email: 'abbeyhrt@gmail.com'
    };
    expect(object).toEqual({
      name: "Abbey",
      email: 'abbeyhrt@gmail.com'
    });
  });
   it('can have a value set on it after being created', () => {
     const object = {};
     expect(object).toEqual({});
     object.foo = 'bar';
     object['name'] = 'Jenny';

     expect(object).toEqual({foo: 'bar', name: 'Jenny' });
   });
});
