import { Component } from '@angular/core';
import { CHAR_CONSTS, DIGITS, ERORR_TEXT, isDigit, MATH_SYMBOLS_HTML_ENTITIES, MATH_SYMBOLS_OPERATOR, OPERATORS, OPERATORS_REGEX } from './calc.util';

@Component({
  selector: 'app-calc',
  templateUrl: './calc.component.html',
  styleUrls: ['./calc.component.css']
})
export class CalcComponent {
  inputExpression: string;
  result: string;
  errorText: string = ERORR_TEXT;
  hasError: boolean;
  resultShown: boolean;


  inputBoardBtn: string[] = [...DIGITS, CHAR_CONSTS.DECIMAL]

  operations: string[] = [...OPERATORS]


  isFirstInput(): boolean {
    return this.inputExpression === '' || this.inputExpression === CHAR_CONSTS.ZERO;
  }

  get lastInputChar() {
    return this.inputExpression[this.inputExpression.length - 1];
  }

  get lastButOneInputChar() {
    return this.inputExpression[this.inputExpression.length - 2];

  }

  initializeInput() {
    this.hasError = false;
    this.resultShown = false;
    this.inputExpression = CHAR_CONSTS.ZERO;
    this.result = '';
  }


  constructor() {
    this.initializeInput();
  }

  /**
   * Builds input expression by validating and appending user inputs
   * @param userInput user input char
   */
  appendInput(userInput: string) {
    let inputToAppend = userInput;

    // Check if input should start with new expression
    if (this.resultShown) {
      this.initializeInput();
    }

    // Handle decimal without preceding digit
    if ((!this.lastInputChar || this.lastInputChar === CHAR_CONSTS.ZERO || !isDigit(this.lastInputChar))
      && userInput === CHAR_CONSTS.DECIMAL) {
      inputToAppend = CHAR_CONSTS.ZERO + CHAR_CONSTS.DECIMAL;
    }

    // Handle '(' without preceding operator 
    if (!this.isFirstInput() && userInput === CHAR_CONSTS.BRACE_START && isDigit(this.lastInputChar)) {
      inputToAppend = MATH_SYMBOLS_OPERATOR[MATH_SYMBOLS_HTML_ENTITIES.TIMES] + userInput;
    }

    // Not allowing to enter more that one decimal point in expression unit
    if (userInput === CHAR_CONSTS.DECIMAL && this.inputExpression.split(OPERATORS_REGEX)
      .pop().match(/\./g)) {
      return;
    }

    // Not allowing consecutive operators
    if (this.operations.includes(userInput) &&
      this.operations.includes(this.inputExpression[this.inputExpression.length - 1])) {
      return;
    }

    // Not allowing 0, ) & Operators at beginning
    if (this.isFirstInput() && (userInput === '0' || userInput === CHAR_CONSTS.BRACE_END
      || this.operations.includes(userInput))) {
      return;
    }

    // Handle OPERATORS and BRACES after DECIMAL
    if (this.lastInputChar === CHAR_CONSTS.DECIMAL &&
      (this.operations.includes(userInput) || userInput === CHAR_CONSTS.BRACE_START
        || userInput === CHAR_CONSTS.BRACE_END)) {
      inputToAppend = this.inputExpression + CHAR_CONSTS.ZERO;
    }

    // Handle operator input
    if (this.operations.includes(userInput)) {
      inputToAppend = MATH_SYMBOLS_OPERATOR[userInput];
    }

    // Handle first user input
    if (this.inputExpression === CHAR_CONSTS.ZERO) {
      this.inputExpression = inputToAppend;
    } else {
      this.inputExpression += inputToAppend;
    }
  }

  /**
   * Clears display and result
   */
  clearDisplay() {
    this.inputExpression = CHAR_CONSTS.ZERO;
    this.result = '';
    this.hasError = false;
  }

  /**
   * Calculates the input expression
   */
  calculateResult() {
    try {
      this.result = eval(this.inputExpression);
      this.resultShown = true;
    } catch (err) {
      this.hasError = true;
      this.resultShown = true;
    }
  }

}
