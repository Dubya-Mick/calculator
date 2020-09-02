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


//grab the operators and assign them values equivalent to their operation
//add functionality to operator: when clicked, saves the chosenNumber value
let allTheOperators = document.getElementsByClassName('operator');
for(let i = 0; i < allTheOperators.length; i++) {
    let operatorClicked = allTheOperators[i];
    operatorClicked.addEventListener('click', () => {
        //if a number is chosen save the number as an
        //operand, reset chosenNumber, and set the chosenOperator
        if (chosenNumber != '') {
            firstOperand = chosenNumber;
            chosenOperator = operatorClicked.textContent;
        }
    });
}

//grab all numbers and give each one a function that changes the text content of
//the calculator's display and stores that number value in chosenNumber for calculation

let allTheNumbers = document.getElementsByClassName('number');
let resultDisplay = document.querySelector('#result-Display');
for(let i = 0; i < allTheNumbers.length; i++) {
    let numberClicked = allTheNumbers[i];
    numberClicked.addEventListener('click', () => {
        if (firstOperand != '' && chosenOperator != '' && firstOperand == chosenNumber) {
            chosenNumber = '';
            resultDisplay.textContent = ''; 
            resultDisplay.textContent = numberClicked.textContent;
        } else if (resultDisplay.textContent == '0') {
           resultDisplay.textContent = numberClicked.textContent;
        } else {
           resultDisplay.textContent += numberClicked.textContent;
        }
        chosenNumber += numberClicked.textContent;
   });
}



let equalsSign = document.querySelector('#equals');

//setting the first operand to the first chosen value of chosenNumber
//and reseting chosen number

function calculate() {
    if(firstOperand != '' && chosenOperator != '') {
        
    }
}

//function calculate() {
//    if (chosenNumber != '' )
//}