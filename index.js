const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const { generatePage, writeFile, copyFile } = require('./src/page-template');

let employees = [];

const promptManagerTeam = () => {

    inquirer
        .prompt([
            {
                type: 'input',
                name: 'name',
                message: 'What is your name?',
                validate: nameInput => {
                    if (nameInput) {
                        return true;
                    } else {
                        console.log('Please enter your name!');
                        return false;
                    }
                }
            },
            {
                type: 'list',
                message: 'What is your title?',
                name: 'role',
                choices: ['Manager']
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your employee identification?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?',
                validate: emailInput => {
                    if (emailInput.includes('@')) {
                        return true;
                    } else {
                        return('Please enter a valid email!');
                    }
                }
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is your office number?'
            },
        ])
        .then(({ name, id, email, officeNumber }) => {
            this.manager = new Manager(name, id, email, officeNumber);
            employees.push(this.manager);
            // managerArray = this.manager;
            console.log(employees);
            promptMemberTeam()
        })
};

const promptMemberTeam = () => {


    inquirer
        .prompt({
            type: 'list',
            message: 'Would you like to add team member?',
            name: 'addMember',
            choices: ['Yes', 'No']

        })
        .then(({ addMember }) => {
            if (addMember === 'Yes') {
                inquirer
                    .prompt([
                        {
                            type: 'list',
                            message: 'Which team member would you like to add?',
                            name: 'role',
                            choices: ['Engineer', 'Intern']
                        },
                        {
                            type: 'input',
                            name: 'name',
                            message: 'Name of team member',
                            validate: nameInput => {
                                if (nameInput) {
                                    return true;
                                } else {
                                    console.log('Please enter name!');
                                    return false;
                                }
                            }
                        },
                        {
                            type: 'input',
                            name: 'id',
                            message: 'What is employee identification number?'
                        },
                        {
                            type: 'input',
                            name: 'email',
                            message: 'What is employee email?'
                        },
                        {
                            type: 'input',
                            name: 'github',
                            message: 'What is the link to guthub empployee site?',
                            when: (answers) => answers.role === 'Engineer'
                        },
                        {
                            type: 'input',
                            name: 'school',
                            message: 'What is the school intern is attending?',
                            when: (answers) => answers.role === 'Intern'
                        }

                    ])
                    .then(({ name, id, email, role, github, school }) => {
                        if (role === 'Engineer') {
                            this.engineer = new Engineer(name, id, email, github);
                            employees.push(this.engineer);
                            console.log(employees);
                            promptMemberTeam()
                        } else {
                            this.intern = new Intern(name, id, email, school);
                            employees.push(this.intern);
                            console.log(employees);
                            promptMemberTeam()
                        }
                    })

            } else {
                console.log('Your team page has been generated');
                console.log(employees);
                
                const htmlPage = generatePage(employees);

                writeFile(htmlPage);
                copyFile()
            }

        });

};
promptManagerTeam()

