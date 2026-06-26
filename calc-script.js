// Select required elements from DOM
const currentDisplay = document.getElementById('display-current');
const historyDisplay = document.getElementById('display-history');
const buttonsContainer = document.querySelector('.calc-buttons');

let currentOperand = '';
let previousOperand = '';
let operation = undefined;

// Reset operational states
function clear() {
    currentOperand = '0';
    previousOperand = '';
    operation = undefined;
}

// Remove last single character
function deleteNumber() {
    if (currentOperand === '0' || currentOperand === '') return;
    currentOperand = currentOperand.toString().slice(0, -1);
    if (currentOperand === '') currentOperand = '0';
}

// Append digits securely
function appendNumber(number) {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
        currentOperand = number.toString();
    } else {
        currentOperand = currentOperand.toString() + number.toString();
    }
}

// Select math sign operator
function chooseOperation(opSymbol) {
    if (currentOperand === '') return;
    if (previousOperand !== '') {
        compute();
    }
    operation = opSymbol;
    previousOperand = currentOperand;
    currentOperand = '';
}

// Run basic calculations safely
function compute() {
    let computation;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    switch (operation) {
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case '×':
            computation = prev * current;
            break;
        case '÷':
            if (current === 0) {
                alert("Cannot divide by zero!");
                clear();
                return;
            }
            computation = prev / current;
            break;
        default:
            return;
    }
    currentOperand = computation.toString();
    operation = undefined;
    previousOperand = '';
}

// Keep screen text synchronous
function updateDisplay() {
    currentDisplay.innerText = currentOperand;
    if (operation != null) {
        historyDisplay.innerText = `${previousOperand} ${operation}`;
    } else {
        historyDisplay.innerText = '';
    }
}

// Event Delegation Architecture for buttons
buttonsContainer.addEventListener('click', (e) => {
    if (!e.target.matches('button')) return;

    const button = e.target;
    const action = button.dataset.action;
    const buttonContent = button.innerText;

    if (!action) {
        appendNumber(buttonContent);
    } else if (button.classList.contains('operator')) {
        chooseOperation(buttonContent);
    } else if (action === 'clear') {
        clear();
    } else if (action === 'delete') {
        deleteNumber();
    } else if (action === 'decimal') {
        appendNumber('.');
    } else if (action === 'calculate') {
        compute();
    }

    updateDisplay();
});

// Initialize on execution start
clear();
updateDisplay();