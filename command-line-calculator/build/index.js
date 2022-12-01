"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = require("inquirer");
class Main {
    constructor() {
        this.firstNumber = 0;
        this.lastNamber = 0;
        this.sum = 0;
        this.welcome();
    }
    /**
     * welcome to calculator and ask for operation
     * @param isAgain
     * @param message
     */
    welcome(isAgain = false, message = 'Welcome to the calculator, Press enter to continue') {
        return __awaiter(this, void 0, void 0, function* () {
            let response = { name: false };
            if (isAgain) {
                response = yield (0, inquirer_1.prompt)({
                    name: 'name',
                    message,
                    type: 'confirm',
                });
            }
            else {
                response = yield (0, inquirer_1.prompt)({
                    name: 'name',
                    message,
                    type: 'confirm',
                });
            }
            if (response.name) {
                const response1 = yield (0, inquirer_1.prompt)({
                    name: 'operator',
                    message: 'What operation do you want to perform?',
                    type: 'list',
                    choices: ['Addition', 'Subtraction', 'Multiplication', 'Division'],
                });
                switch (response1.operator) {
                    case 'Addition':
                        this.operate('add');
                        break;
                    case 'Division':
                        this.operate('div');
                        break;
                    case 'Multiplication':
                        this.operate('mul');
                        break;
                    case 'Subtraction':
                        this.operate('sub');
                        break;
                    default:
                        this.welcome(true);
                        break;
                }
            }
        });
    }
    /**
     * first digit input
     * @returns {Promise<{firstNumber: number}>}
     */
    firstDigit() {
        return __awaiter(this, void 0, void 0, function* () {
            let first = { firstNumber: 0 };
            return (first = yield (0, inquirer_1.prompt)({
                name: 'firstNumber',
                message: 'Enter the first number',
                type: 'number',
            }));
        });
    }
    /**
     * second digit input
     * @returns {Promise<{secondNumber: number}>}
     */
    secondDigit() {
        return __awaiter(this, void 0, void 0, function* () {
            let second = { secondNumber: 0 };
            return (second = yield (0, inquirer_1.prompt)({
                name: 'secondNumber',
                message: 'Enter the second number',
                type: 'number',
            }));
        });
    }
    /**
     * operation of calculator
     * @param operator
     * @returns void
     */
    operate(operator) {
        return __awaiter(this, void 0, void 0, function* () {
            let first = { firstNumber: 0 };
            first = yield this.firstDigit();
            if (isNaN(first.firstNumber)) {
                this.welcome(true, 'Please enter valid number');
                first = yield this.firstDigit();
            }
            let second = { secondNumber: 0 };
            second = yield this.secondDigit();
            if (isNaN(second.secondNumber)) {
                this.welcome(true, 'Please enter valid number');
                second = yield this.secondDigit();
            }
            switch (operator) {
                case 'sub':
                    this.sum = first.firstNumber - second.secondNumber;
                    break;
                case 'div':
                    if (second.secondNumber === 0) {
                        return this.welcome(true, "You can't divide by zero");
                    }
                    this.sum = first.firstNumber / second.secondNumber;
                    break;
                case 'mul':
                    this.sum = first.firstNumber * second.secondNumber;
                    break;
                default:
                    this.sum = first.firstNumber + second.secondNumber;
                    break;
            }
            this.welcome(true, `The result is ${this.sum}, Do you want to continue?`);
        });
    }
}
const main = new Main();
