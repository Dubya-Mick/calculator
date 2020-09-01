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

//grab all numbers and give each one a function that changes the text content of
//the calculator's display and stores that number value in chosenNumber for calculation

let chosenNumber = 0;
let allTheNumbers = document.getElementsByClassName('number');
let resultDisplay = document.querySelector('#result-Display');
for(let i = 0; i < allTheNumbers.length; i++) {
    allTheNumbers[i].addEventListener('click', () => {
        resultDisplay.textContent = allTheNumbers[i].textContent;
        chosenNumber += parseInt(allTheNumbers[i].textContent);
    })
}