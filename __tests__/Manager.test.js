const Manager = require('../lib/Manager');

test('creates a manager object', () => {
    const manager = new Manager('Dave', '99', 'manager', '@', '#');

    expect(manager.name).toEqual(expect.any(String));
    expect(manager.id).toEqual(expect.any(String));
    expect(manager.role).toEqual(expect.any(String));
    expect(manager.email).toEqual(expect.any(String));
    expect(manager.officeNumber).toEqual(expect.any(String));
    
});

