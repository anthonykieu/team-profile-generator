const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
const { generatePage, writeFile, copyFile } = require('./src/page-template');

let team = [];

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
            team.push(this.manager);
            console.log(team);
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
                            message: 'What is the link to guthub employee site?',
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
                            team.push(this.engineer);
                            console.log(team);
                            promptMemberTeam()
                        } else {
                            this.intern = new Intern(name, id, email, school);
                            team.push(this.intern);
                            console.log(team);
                            promptMemberTeam()
                        }
                    })

            } else {
                console.log('Your team page has been generated');
                console.log(team);
                
                const htmlPage = generatePage(team);

                writeFile(htmlPage);
                copyFile()
            }

        });

};
promptManagerTeam()

