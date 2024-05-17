#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
let usersName;
let usersPin;
console.log(chalk.greenBright("Hello, Welcome to Gringotts Wizarding Bank"));
userVerification();
// asking and confirming username and pin from user
async function userVerification() {
    const verUser = await inquirer.prompt([
        {
            name: "username",
            type: "input",
            message: chalk.gray("Please enter your username:")
        },
        {
            name: "userpin",
            type: "password",
            message: chalk.gray("Please enter your 4 digit pin:")
        }
    ]);
    const { username, userpin } = verUser;
    if (username && userpin) {
        usersName = username;
        usersPin = userpin;
        console.log(chalk.greenBright(`Hello ${usersName.toUpperCase()}`));
        startTransaction();
    }
    else {
        console.log("Sorry you entered the wrong details. Try again");
        userVerification();
    }
}
;
// starting loop inside a function for transaction, user will be asked what task they want to perform
async function startTransaction() {
    let condition = true;
    while (condition) {
        const atmTrans = await inquirer.prompt([
            {
                name: "transactionType",
                type: "list",
                choices: ["Fast Cash", "Other Amount", "Balance Inquiry", "Change Username", "Change Pin"],
                message: chalk.gray("Please choose what transaction you want to perform:")
            },
            {
                name: "accountType",
                type: "list",
                choices: ["Current", "Savings", "Pension", "Government Income Fund"],
                message: chalk.gray("Please choose your account type:")
            },
            {
                name: "selectAmount",
                type: "list",
                choices: ["1000", "5000", "10000", "20000", "50000"],
                message: chalk.gray("Please select the amount you want to withdraw:"),
                when: (atmTrans) => atmTrans.transactionType == "Fast Cash"
            },
            {
                name: "enterAmount",
                type: "input",
                message: chalk.gray("Please enter the amount you want to withdraw:"),
                when: (atmTrans) => atmTrans.transactionType == "Other Amount"
            },
            {
                name: "changeUsername",
                type: "input",
                message: chalk.gray("Please enter new username:"),
                when: (atmTrans) => atmTrans.transactionType == "Change Username"
            },
            {
                name: "changePin",
                type: "input",
                message: chalk.gray("Please enter your new pin:"),
                when: (atmTrans) => atmTrans.transactionType == "Change Pin"
            }
        ]);
        //destructuring the above object
        const { transactionType, accountType, selectAmount, enterAmount, changeUsername, changePin } = atmTrans;
        // generating random values as user balance, this will actually come from database
        let balanceCS = Math.floor(Math.random() * 100000);
        let balancePG = Math.floor(Math.random() * 50000);
        // performing actions according to the users input taken above
        if (transactionType == "Fast Cash" || transactionType == "Other Amount") {
            if (accountType == "Current" || accountType == "Savings") {
                if (balanceCS >= selectAmount || balanceCS >= enterAmount) {
                    const balanceNewCS = balanceCS - selectAmount || balanceCS - enterAmount;
                    console.log(chalk.cyanBright("Thankyou, Please take your card and money"));
                    console.log(chalk.yellowBright(`Your remaining account balance is: ${balanceNewCS}`));
                }
                else {
                    console.log(chalk.redBright("Sorry, Insufficient balance"));
                    console.log(chalk.yellowBright(`Your account balance is: ${balanceCS}`));
                }
                ;
            }
            else if (accountType == "Pension" || accountType == "Government Income Fund") {
                if (balancePG >= selectAmount || balancePG >= enterAmount) {
                    const balanceNewPG = balancePG - selectAmount || balancePG - enterAmount;
                    console.log(chalk.cyanBright("Thankyou, Please take your card and money"));
                    console.log(chalk.yellowBright(`Your remaining account balance is: ${balanceNewPG}`));
                }
                else {
                    console.log(chalk.redBright("Sorry, Insufficient balance"));
                    console.log(chalk.yellowBright(`Your account balance is: ${balancePG}`));
                }
                ;
            }
            ;
        }
        else if (transactionType == "Balance Inquiry") {
            if (accountType == "Current" || accountType == "Savings") {
                console.log(chalk.greenBright(`Your account balance is: ${balanceCS}`));
            }
            else if (accountType == "Pension" || accountType == "Government Income Fund") {
                console.log(chalk.greenBright(`Your account balance is: ${balancePG}`));
            }
            ;
        }
        else if (transactionType == "Change Username") {
            usersName = changeUsername;
            console.log("Username changed successfully");
            console.log(chalk.cyanBright(`Your new Username is: ${usersName.toUpperCase()}`));
        }
        else if (transactionType == "Change Pin") {
            usersPin = changePin;
            console.log(chalk.cyanBright(`Your new Pin is: ${usersPin}`));
        }
        ;
        // asking user whether to start the transaction again?
        const startAgain = await inquirer.prompt([
            {
                name: "restartTransaction",
                type: "confirm",
                default: "true",
                message: chalk.gray("Do you want to perform another transaction?")
            }
        ]);
        if (!startAgain.restartTransaction) {
            condition = startAgain.restartTransaction;
            console.log(chalk.greenBright(`Thankyou for using "Gringotts Wizarding Bank"`));
        }
        ;
    }
    ;
}
;
