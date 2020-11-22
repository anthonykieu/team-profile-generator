const Employee = require('../lib/Employee');

test('creates a employee object', () => {
    const employee = new Employee('Dave', '99', 'manager', '@');

    expect(employee.name).toEqual(expect.any(String));
    expect(employee.id).toEqual(expect.any(String));
    expect(employee.email).toEqual(expect.any(String));
    expect(employee.role).toEqual(expect.any(String));   
});