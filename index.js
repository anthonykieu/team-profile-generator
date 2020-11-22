const inquirer = require('inquirer');
const Manager = require('./lib/Manager.js');
const Engineer = require('./lib/Engineer.js');
const Intern = require('./lib/Intern.js');
// const { requiresArg } = require('yargs');
// const { runInThisContext } = require('vm');

// const { writeFile, copyFile } = require('./utils/generate-site.js');

const generatePage = require('./src/page-template');


const promptManagerTeam = () => {
    this.team = [];
    this.manager;
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
                name: 'role',
                message: 'What is your role?'
            },
            {
                type: 'input',
                name: 'id',
                message: 'What is your employee identification?'
            },
            {
                type: 'input',
                name: 'email',
                message: 'What is your email?'
            },
            {
                type: 'input',
                name: 'officeNumber',
                message: 'What is your office number?'
            },
        ])
        .then(({ name, id, email, role, officeNumber }) => {
            this.manager = new Manager(name, id, email, role, officeNumber);
            // console.log(this.manager.getMgrInfo());
            this.team.push(this.manager);
            // console.log(this.team);
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
                            choices: ['engineer', 'intern']
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
                            when: (answers) => answers.role === 'engineer'
                        },
                        {
                            type: 'input',
                            name: 'school',
                            message: 'What is the school intern is attending?',
                            when: (answers) => answers.role === 'intern'
                        }

                    ])
                    .then(({ name, id, email, role, github, school }) => {
                        if (role === 'engineer') {
                            this.engineer = new Engineer( name, id, email, role, github, school );
                            // console.log(this.engineer.getEngInfo());
                            this.team.push(this.engineer);
                            // console.log(this.team);
                            promptMemberTeam()
                        } else {
                            this.intern = new Intern(name, id, email, role, school);
                            // console.log(this.intern.getInternInfo());
                            this.team.push(this.intern);
                            // console.log(this.team);
                            promptMemberTeam()
                        }
                    })

            } else {
                console.log('Your team page has been generated');
                teamArray = this.team
                // console.log(teamArray);
                console.log(teamArray);
                return teamArray;
            }

        });
};
promptManagerTeam()



    // .then(promptTeam)
    // .then(portfolioData => {
    //     return generatePage(portfolioData);
    // })
    // .then(pageHTML => {
    //     return writeFile(pageHTML);
    // })
    // .then(writeFileResponse => {
    //     console.log(writeFileResponse);
    //     return copyFile();
    // })
    // .then(copyFileResponse => {
    //     console.log(copyFileResponse);
    // })
    // .catch(err => {
    //     console.log(err);
    // });
