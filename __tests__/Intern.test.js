const Intern = require('../lib/Intern');

test('creates a intern object', () => {
    const intern = new Intern('Dave', '99', 'manager', '@', '#');

    expect(intern.name).toEqual(expect.any(String));
    expect(intern.id).toEqual(expect.any(String));
    expect(intern.role).toEqual(expect.any(String));
    expect(intern.email).toEqual(expect.any(String));
    expect(intern.school).toEqual(expect.any(String));
    
});