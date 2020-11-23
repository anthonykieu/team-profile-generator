const Employee = require('../lib/Employee');

test('creates a employee object', () => {
    const employee = new Employee('Dave', '99', '@');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(String));
    expect(employee.email).toEqual(expect.any(String));
     
});

