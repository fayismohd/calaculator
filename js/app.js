
const currentValue = document.getElementById("current-value");
const previousValue = document.getElementById("previous-value");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");
const actionButtons = document.querySelectorAll("[data-action]");

let currentNumber = "";
let previousNumber = "";
let operator = null;

function updateDisplay() {
  currentValue.textContent = currentNumber || "0";
}

// Number buttons
numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const number = button.dataset.number;

    if (number === "." && currentNumber.includes(".")) return;

    if (number === "." && currentNumber === "") {
      currentNumber = "0";
    }

    currentNumber += number;
    updateDisplay();
  });
});

// Operator buttons
operatorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (currentNumber === "") return;

    previousNumber = currentNumber;
    operator = button.dataset.operator;

    previousValue.textContent = `${previousNumber} ${operator}`;

    currentNumber = "";
    updateDisplay();
  });
});

// Calculate
function calculate() {
  if (previousNumber === "" || currentNumber === "" || operator === null) {
    return;
  }

  const first = Number(previousNumber);
  const second = Number(currentNumber);

  const expression = `${previousNumber} ${operator} ${currentNumber}`;

  let result;

  switch (operator) {
    case "+":
      result = first + second;
      break;

    case "-":
      result = first - second;
      break;

    case "*":
      result = first * second;
      break;

    case "/":
      if (second === 0) {
        currentValue.textContent = "Cannot divide by 0";
        return;
      }
      result = first / second;
      break;

    case "%":
      result = first % second;
      break;

    default:
      return;
  }

  currentNumber = String(Number(result.toFixed(10)));

  previousValue.textContent = expression;

  previousNumber = "";
  operator = null;

  updateDisplay();
}

// Action buttons
actionButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const action = button.dataset.action;

    if (action === "clear") {
      currentNumber = "";
      previousNumber = "";
      operator = null;
      previousValue.textContent = "";
      updateDisplay();
    }

    if (action === "delete") {
      currentNumber = currentNumber.slice(0, -1);
      updateDisplay();
    }

    if (action === "calculate") {
      calculate();
    }
  });
});
