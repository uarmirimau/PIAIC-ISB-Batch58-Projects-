import inquirer from "inquirer";

// First create random number

let randomNumber = Math.random()
let randomNumberfloor = Math.floor((randomNumber * 10 )+1)


// Second asked to the user to enter guess number from 1-10
let guessNumber = await inquirer.prompt([{name:"guessnmb", type:"number", message:"Enter Guess Number between 1-10 : "}]);


if (guessNumber.guessnmb === randomNumberfloor){
    console.log("Congratulation Your Guess Number is Correct")
}else{
    console.log("Wrong Guess")
}