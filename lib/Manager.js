const Employee = require('./Employee');


class Manager extends Employee {
    constructor(name, id, email, role, officeNumber) {

        super(name, id, email, role);
        this.officeNumber = officeNumber;
    }

    getMgrInfo() {
        return `
            Role: Manager
            ${this.getName()}
            ${this.getId()}
            ${this.getEmail()}
            Office Number: ${this.officeNumber}`;

    }
}

module.exports = Manager;