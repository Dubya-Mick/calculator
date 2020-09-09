//definition of calculation functions
function add(x, y) {
    let sum = x + y;
    return sum;
}

function subtract(x, y) {
    let difference = x - y;
    return difference;
}

function divide(x, y) {
    let quotient = x / y;
    return quotient;
}

function multiply(x, y) {
    let product = x * y;
    return product;
}

//definition of function that executes one of the above calculations
//depending on the chosen operator
function operate(operator, x, y) {
    let result;
    switch(operator) {
        case '+':
            result = add(x, y);
            break;
        case '-':
            result = subtract(x, y);
            break;
        case '/':
            result = divide(x, y);
            break;
        case '*':
            result = multiply(x, y);
            break;
    }
    return result;
}

//initiate all variables needed by the calculator
let chosenOperator = '';
let firstOperand = '';
let chosenNumber = '';
let operatorCalc = false;
let equalsCalc = false;
let calcResult = '';

//function that clears the variables needed by the calculator
function allClear() {
    chosenOperator = '';
    firstOperand = '';
    chosenNumber = '';
    operatorCalc = false;
    equalsCalc = false;
    calcResult = '';
}

//function that calls the logs of the variables needed
function callTheLogs() {
    console.log(chosenOperator);
    console.log(firstOperand);
    console.log(chosenNumber); 
    console.log(operatorCalc);
    console.log(equalsCalc);
    console.log(calcResult); 
}

let allClearButton = document.querySelector('#AC');
allClearButton.addEventListener('click', () => {
    allClear();
    resultDisplay.textContent = '0';
    callTheLogs();
    });

//define function that calculates the input values
//if the numbers are floats, they get parsed as floats
//if they're integers they get parsed as integers
//surrounding the function with () and adding the () 
//at the end invokeas the function immediately
function calculate() {
    let numOperand = (function() {
        if (/[.]/.test(firstOperand)) {
            return parseFloat(firstOperand); 
        } else {
            return parseInt(firstOperand);
        }
    }());
    let numChosenNumber = (function() {
        if (/[.]/.test(chosenNumber)) {
            return parseFloat(chosenNumber); 
        } else {
            return parseInt(chosenNumber);
        }
    }());
    if (numChosenNumber == 0 && chosenOperator == "/") {
        alert("Can't divide by zero!");
        allClear();
    } else {
        calcResult = operate(chosenOperator, numOperand, numChosenNumber);
        resultDisplay.textContent = calcResult;
    }
    
}

//set the equals sign to execute the calculate function and change
//the equalsCalc boolean
let equalsSign = document.querySelector('#equals');
equalsSign.addEventListener('click', () => {
    if (firstOperand != '' 
        && chosenOperator != '' 
        && chosenNumber != '' 
        && chosenNumber != '0.') {
            calculate();
            equalsCalc = true;
            callTheLogs();
    }
});

//define function of the decimal button
let decimalButton = document.querySelector('#decimal');
decimalButton.addEventListener('click', () => {
    if(equalsCalc == true) {
        allClear();
        chosenNumber = "0.";
        resultDisplay.textContent = "0.";
    } else if (operatorCalc == true) {
        operatorCalc = false;
        firstOperand = calcResult;
        chosenNumber = '0.';
        resultDisplay.textContent = '0.'
    } else if (resultDisplay.textContent == '0') {
        resultDisplay.textContent = "0."
        chosenNumber = "0."
    } else if (!/[.]/.test(chosenNumber) && !/[.]/.test(resultDisplay.textContent)) {
        chosenNumber += '.';
        resultDisplay.textContent += '.';
    }
    callTheLogs();
});


//define function of the +/- button
let negativeButton = document.querySelector('#pos-Neg');
negativeButton.addEventListener('click', () => {
    if (equalsCalc == true) {
        calcResult = (function () {
            if (calcResult[0] != '-') {
                return calcResult = '-' + calcResult;
            } else {
                return calcResult.replace('-', '');
            }
        }());
        resultDisplay.textContent = calcResult;
        chosenNumber = calcResult;
        chosenOperator = '';
        firstOperand = '';
        equalsCalc = false;
    } else if (resultDisplay.textContent != '0' && chosenNumber != '0' && chosenNumber != '') {
        chosenNumber = (function () {
            if (chosenNumber[0] != '-') {
                return chosenNumber = '-' + chosenNumber;
            } else {
                return chosenNumber.replace('-', '');
            }
        }());
        resultDisplay.textContent = chosenNumber;
    }
});

//define function of the percentage button
let percentButton = document.querySelector('#percent');
percentButton.addEventListener('click', () => {
    if (equalsCalc == true) {
        equalsCalc = false;
        chosenNumber = calcResult / 100;
        resultDisplay.textContent = chosenNumber;
        firstOperand = '';
        chosenOperator = '';
    } else if (chosenNumber != '0' && chosenNumber != '0.' && operatorCalc !== true) {
        chosenNumber = chosenNumber / 100;
        resultDisplay.textContent =  chosenNumber;
    }
})





//grab the operators and assign them values equivalent to their operation
let allTheOperators = document.getElementsByClassName('operator');
for(let i = 0; i < allTheOperators.length; i++) {
    let operatorClicked = allTheOperators[i];
    operatorClicked.addEventListener('click', () => {
        //if a calculation has recently been performed by the equals sign
        //then set the first operand to the result of the previous caclulation
        //update the operator, and refresh the chosenNumber 
        if (equalsCalc == true) {
            equalsCalc = false;
            firstOperand = calcResult;
            chosenOperator = operatorClicked.textContent;
            chosenNumber = '';
        //if we have two numbers to calculate and an operator chosen
        //then the operator button calculates and feeds up the result
        //and updates the chosenOperator
        } else if (chosenNumber != '' 
                && firstOperand != '' 
                && chosenOperator != '' 
                && chosenNumber != '0.'
                && chosenNumber != '-') {
            calculate();
            operatorCalc = true;
            chosenOperator = operatorClicked.textContent;
        //this else if is for the situation in which the firstOperand hasn't been chosen yet
        } else if (chosenNumber != '' && chosenNumber != '0.') {
            firstOperand = chosenNumber;
            chosenNumber = '';
            chosenOperator = operatorClicked.textContent;
        }
        callTheLogs();
    });
}

//grab all numbers and give each one a function that changes the text content of
//the calculator's display and stores that number value in chosenNumber for calculation
let allTheNumbers = document.getElementsByClassName('number');
let resultDisplay = document.querySelector('#result-Display');
for(let i = 0; i < allTheNumbers.length; i++) {
    let numberClicked = allTheNumbers[i];
    numberClicked.addEventListener('click', () => {
        if (operatorCalc == true) {
            operatorCalc = false;
            firstOperand = calcResult;
            chosenNumber = '';
            resultDisplay.textContent = numberClicked.textContent;
        } else if (equalsCalc == true) {
            allClear();
            resultDisplay.textContent = numberClicked.textContent;
        } else if (firstOperand != '' && chosenNumber == '') {
            resultDisplay.textContent = numberClicked.textContent;
        } else if (resultDisplay.textContent == '0') {
           resultDisplay.textContent = numberClicked.textContent;
        } else {
           resultDisplay.textContent += numberClicked.textContent;
        }
        chosenNumber += numberClicked.textContent;
        callTheLogs();
   });
}






