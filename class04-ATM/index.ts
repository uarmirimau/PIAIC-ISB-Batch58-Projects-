#! /usr/bin/env node

import inquirer from 'inquirer';
import chalk from 'chalk';

const baseCurrency: string = 'USD';
const currencyList: any = {
    'USD': 1,
    'EUR': 0.93,
    'GBP': 0.80,
    'CNY': 7.24,
    'JPY': 153,
    'INR': 83.44,
    'PKR': 278.50,
    'SAR': 3.75,
    'AED': 3.67
}

const converter = await inquirer.prompt([
    {
        type: 'list',
        name: 'currencyFrom',
        message: 'Select Currency From: ',
        choices: Object.keys(currencyList)
    },
    {
        type: 'list',
        name: 'currencyTo',
        message: 'Select Currency To: ',
        choices: Object.keys(currencyList)
    },
    {
        type: 'number',
        name: 'currencyAmount',
        message: 'Enter amount to Convert: ',
        validate(value: number) {
            if (!value || isNaN(value)) {
                return 'Please enter a valid amount.';
            }
            return true;
        },
    }
]);

let exchangeRate = currencyList[baseCurrency] / currencyList[converter.currencyFrom] * currencyList[converter.currencyTo];
let convertedAmount = (exchangeRate * converter.currencyAmount).toFixed(2);

console.log(chalk.blue('=========================='));
console.log(chalk.blue('   Currency Conversion    '));
console.log(chalk.blue('-------------------------'));
console.log(chalk.green(`Converted Value: ${convertedAmount} ${converter.currencyTo} `));
console.log(chalk.blue('=========================='));