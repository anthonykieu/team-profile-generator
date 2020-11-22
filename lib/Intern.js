const Employee = require('./Employee');


class Intern extends Employee {
    constructor(name, id, email, role, school) {

        super(name, id, email, role);
        this.school = school;
    }

    getInternInfo() {
        return `
                Role: Engineer
                ${this.getName()}
                ${this.getId()}
                ${this.getEmail()}
                School: ${this.school}`;

    }
}



module.exports = Intern;