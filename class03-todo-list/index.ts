import inquirer from "inquirer";
import chalk from "chalk";

let todo = [];
let condition = true;

while(condition){
let addTask = await inquirer.prompt([
    
    {
        name: "whatTaskAdd",
        type: "input",
        message: chalk.bgGreen("wchich task you want add in todo list : ")
    },
    {
        name: "nextTask",
        type: "confirm",
        message: chalk.bgBlue("Do you want to add Next Task : "),
        default: "false"
    }
]
);
todo.push(addTask.whatTaskAdd)
condition = addTask.nextTask
console.log(todo)
}



