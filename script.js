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
    if (result.length > 24) {
        return result.toExponential();
    } else {
        return result;
    }
    
}

//initiate all variables needed by the calculator
let chosenOperator = ''; //stores the operator chosen by the user
let firstOperand = ''; //stores first number user chooses, gets value handed off from chosenNumber or calcResult
let chosenNumber = ''; //initially stores first number user chooses, then hands it off to firstOperand, takes second number for calculation
let operatorCalc = false; //boolean showing if calculation has just occured with operator button
let equalsCalc = false; //boolean showing if calculation has just occured with equals button
let calcResult = ''; //holds result of calculation

//function that clears the variables needed by the calculator, resets fontSize of display
function allClear() {
    chosenOperator = '';
    firstOperand = '';
    chosenNumber = '';
    operatorCalc = false; 
    equalsCalc = false; 
    calcResult = '';
    resultDisplay.style.fontSize = '2.5em';
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

//adding functionality to the AC button
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
//at the end invokes the function immediately
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
    if (resultDisplay.textContent.length > 12 && resultDisplay.textContent.length < 24) {
        resultDisplay.style.fontSize = '1.3em'
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
        //if recent calculation with operator button, set the result
        //to the new firstOperand and refresh chosenNumber allowing
        //for chaining of calculation
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
        } else if (chosenNumber.length < 24) {
           resultDisplay.textContent += numberClicked.textContent;
        }
        if (chosenNumber.length < 24) {
            chosenNumber += numberClicked.textContent;
        }
        callTheLogs();
   });
}

//resize display text if it gets too long
let allTheNumsArr = [...allTheNumbers];
allTheNumsArr.forEach(number => {
    number.addEventListener('click', () => {
        if (resultDisplay.textContent.length > 12) {
            resultDisplay.style.fontSize = '1.3em';
        }
    })
})



