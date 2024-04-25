#! /usr/bin/env node
import inquirer from "inquirer";
let answers = await inquirer.prompt([
    { message: "Enter Your First Number", type: "number", name: "firstNumber" },
    { message: "Enter Your Second Number", type: "number", name: "secondNumber" },
]);
let operator = await inquirer.prompt([
    { message: "Enter Your operator", type: "list", name: "operator", choices: ["addition", "subtraction", "division", "multiply"] },
]);
if (operator.operator === "addition") {
    console.log(answers.firstNumber + answers.secondNumber);
}
else if (operator.operator === "subtraction") {
    console.log(answers.firstNumber - answers.secondNumber);
}
else if (operator.operator === "division") {
    console.log(answers.firstNumber / answers.secondNumber);
}
else if (operator.operator === "multiply") {
    console.log(answers.firstNumber * answers.secondNumber);
}
