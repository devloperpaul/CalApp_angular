export const CHAR_CONSTS = {
    DECIMAL : '.',
    ZERO : '0',
    BRACE_START: '(',
    BRACE_END: ')'
}

export const ERORR_TEXT = 'Invalid expression';

export const MATH_SYMBOLS_HTML_ENTITIES = {
    PLUS: '&plus;',
    MINUS: '&minus;',
    TIMES: '&times;',
    DIVIDE: '&divide;'

}
export const MATH_SYMBOLS_OPERATOR = {
    '&plus;' : '+',
    '&minus;': '-',
    '&times;': '*',
    '&divide;' : '/'
}

// Ordered in the manner to be shown on calculator
export const DIGITS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0'];

export const OPERATORS = [...Object.keys(MATH_SYMBOLS_OPERATOR)];

export const OPERATORS_REGEX = /[+\-*/()]/g;

export const isOperator = (char: string): boolean => {
    return OPERATORS.includes(char)
}

export const isDigit = (char: string): boolean => {
    return DIGITS.includes(char)
}