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

//adding a border to all the buttons
let numberOperatorContainer = document.querySelector('#num-Operator-Container');
let allButtons = numberOperatorContainer.children;
for(let i = 0; i < allButtons.length; i++) {
    allButtons[i].style.border = "0.5px solid black";
}


//initiate all variables needed by the calculator
let chosenOperator = '';
let firstOperand = '';
let chosenNumber = '';
let operatorCalc = false;
let equalsCalc = false;
let calcResult = '';

function allClear () {
    chosenOperator = '';
    firstOperand = '';
    chosenNumber = '';
    equalsCalc = false;
    calcResult = '';
}

//define function that calculates the input values
function calculate() {
    if(firstOperand != '' && chosenOperator != '' && chosenNumber != '') {
        let numOperand = parseInt(firstOperand);
        let numChosenNumber = parseInt(chosenNumber);
        calcResult = operate(chosenOperator, numOperand, numChosenNumber);
        resultDisplay.textContent = operate(chosenOperator, numOperand, numChosenNumber);
        
    }
}
let equalsSign = document.querySelector('#equals');
equalsSign.addEventListener('click', () => {
    calculate();
    equalsCalc = true;
    console.log(chosenNumber);
    console.log(chosenOperator);
    console.log(firstOperand);
    console.log(equalsCalc);
    console.log(operatorCalc);
});


//grab the operators and assign them values equivalent to their operation
//add functionality to operator: when clicked, saves the chosenNumber value
let allTheOperators = document.getElementsByClassName('operator');
for(let i = 0; i < allTheOperators.length; i++) {
    let operatorClicked = allTheOperators[i];
    operatorClicked.addEventListener('click', () => {
        if (equalsCalc == true) {
            equalsCalc = false;
            firstOperand = calcResult;
            chosenOperator = operatorClicked.textContent;
            chosenNumber = '';
        //if we have two numbers to calculate and an operator chosen
        //then the operator button calculates and feeds up the result
        //and updates the chosenOperator
        } else if (chosenNumber != '' && firstOperand != '' && chosenOperator != '') {
            calculate();
            operatorCalc = true;
            chosenOperator = operatorClicked.textContent;
        //this else if is for the situation in which the firstOperand hasn't been chosen yet
        } else if (chosenNumber != '') {
            firstOperand = chosenNumber;
            chosenNumber = '';
            chosenOperator = operatorClicked.textContent;
        }
        console.log(chosenNumber);
        console.log(chosenOperator);
        console.log(firstOperand);
        console.log(equalsCalc);
        console.log(operatorCalc);
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
        }
        if (equalsCalc == true) {
            allClear();
            resultDisplay.textContent = numberClicked.textContent;
           // firstOperand = calcResult;
        } else if (firstOperand != '' && chosenNumber == '') {
            resultDisplay.textContent = numberClicked.textContent;
        } else if (resultDisplay.textContent == '0') {
           resultDisplay.textContent = numberClicked.textContent;
        } else {
           resultDisplay.textContent += numberClicked.textContent;
        }
        chosenNumber += numberClicked.textContent;
        console.log(chosenNumber);
        console.log(chosenOperator);
        console.log(firstOperand);
        console.log(equalsCalc);
        console.log(operatorCalc);
   });
}




