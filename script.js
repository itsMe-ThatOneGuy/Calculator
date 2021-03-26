const screen = document.querySelector("#screen");
const numberBtn = document.querySelectorAll("[data-number]");
const operatorBtn = document.querySelectorAll(".operator");
const clearBtn = document.querySelector("#clear-btn");
const delBtn = document.querySelector("#delete-btn");
const pointBtn = document.querySelector("#point-btn");
const equalesBtn = document.querySelector("#equales");

let firstOperand = "";
let secondOperand = "";
let currentOperation = null;
let shouldClearScreen = false;

window.addEventListener("keydown", keyInput);
clearBtn.addEventListener("click", clearInputs);
delBtn.addEventListener("click", delNum);
pointBtn.addEventListener("click", point);

numberBtn.forEach((button) =>
  button.addEventListener("click", () => updateScreen(button.textContent))
);
operatorBtn.forEach((button) =>
  button.addEventListener("click", () => setOperator(button.textContent))
);
equalesBtn.addEventListener("click", evaluate)

function updateScreen(number) {
    if (screen.textContent === "0" || shouldClearScreen) clearScreen();
    screen.textContent += number;
}

function keyInput(e) {
    if (e.key >= 0 && e.key <= 9) updateScreen(e.key);
    if (e.key === "Escape") clearInputs();
    if (e.key === "Backspace") delNum();
    if (e.key === ".") point();
    if (e.key === "Enter") evaluate();
    if (e.key === "/" || e.key === "*" || e.key === "-" || e.key === "+") {
        setOperator(keyOperator(e.key));
    } 
}

function keyOperator(keyboardOperator) {
    if (keyboardOperator === "/") return "÷";
    if (keyboardOperator === "*") return "x";
    if (keyboardOperator === "-") return "-";
    if (keyboardOperator === "+") return "+";
}

function clearScreen() {
    screen.textContent = "";
    shouldClearScreen = false;
}

function clearInputs() {
    screen.textContent = "0";
    firstOperand = "";
    secondOperand = "";
    currentOperation = null;
}

function delNum() {
    screen.textContent = screen.textContent.slice(0, -1);
}

function point() {
    if (shouldClearScreen) clearScreen();
    if (screen.textContent === "") screen.textContent = "0";
    if (screen.textContent.includes(".")) return;
    screen.textContent += "."
}

function setOperator(operator) {
    if (currentOperation !== null) evaluate();
    firstOperand = screen.textContent;
    currentOperation = operator;
    shouldClearScreen = true;
}

function roundResults(number) {
    return Math.round((number * 1000) / 1000);
}

function evaluate() {
    if (currentOperation === null || shouldClearScreen) return;
    if (currentOperation === "÷" && screen.textContent === "0") {
        alert("You can not divide by 0");
        clearInputs();
        return;
    }
    secondOperand = screen.textContent;
    screen.textContent = roundResults(operate(currentOperation, firstOperand, secondOperand));
    currentOperation = null;
    shouldClearScreen = true;
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply (a, b) {
    return a * b;
}

function divide(a , b) {
    return a / b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);
    switch (operator) {
        case "+":
        return add(a, b);
        case "-":
        return subtract(a, b);
        case "x":
        return multiply(a, b);
        case "÷":
        if (b === 0) return null;
        else return divide(a, b);
        default:
        return null;
    }
}