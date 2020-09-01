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

let numberOperatorContainer = document.querySelector('#num-Operator-Container');
let allButtons = numberOperatorContainer.children;

for(let i = 0; i < allButtons.length; i++) {
    allButtons[i].style.border = "1px solid black";
}