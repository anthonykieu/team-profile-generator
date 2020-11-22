const Employee = require('./Employee');


class Engineer extends Employee {
    constructor(name, id, email, role, github) {

        super(name, id, email, role);
        this.github = github;
    }

    getEngInfo() {
        return `
                Role: Engineer
                ${this.getName()}
                ${this.getId()}
                ${this.getEmail()}
                Github Link: ${this.github}`;

    }
}


module.exports = Engineer;