let currentInput = '';
let currentOperator = '';
let previousInput = '';

function appendNumber(number) {
    if (currentInput.length > 13) return; // Limit to max 14 chars
    currentInput += number;
    document.getElementById('mainOutput').textContent = `${previousInput} ${currentOperator} ${currentInput}`;
    if (number === ".") { // Disable decimal point for current input after use.
        var buttonDecimalPoint = document.getElementById('buttonDecimalPoint').removeAttribute("onclick");
        return; 
    }
}

function appendOperator(operator) {
    if (currentInput === '') return;
    var buttonDecimalPoint = document.getElementById('buttonDecimalPoint').setAttribute("onclick", "appendNumber('.')"); //Re-enable the decimal point.
    if (previousInput !== '') { // Calculate the previous operation before appending a new one if previousInput contains something.
        calculate(); 
    }
    currentOperator = operator;
    previousInput = currentInput;
    currentInput = '';
    document.getElementById('mainOutput').textContent = `${previousInput} ${currentOperator}`;
}

function calculate() {
    if (previousInput === '' || currentInput === '') return;
    let result;
    let prev = parseFloat(previousInput);
    let current = parseFloat(currentInput);

    switch (currentOperator) {
        case '+':
            result = prev + current;
            if (String(result).length > 15) result = result.toExponential(4); // Convert to exponential notation if length > 15
            break;
        case '-':
            result = prev - current;
            if (String(result).length > 15) result = result.toExponential(4); // Convert to exponential notation if length > 15
            break;
        case '*':
            result = prev * current;
            if (String(result).length > 15) result = result.toExponential(4); // Convert to exponential notation if length > 15
            break;
        case '/':
            if (current === 0) {
                alert("You can't divide by zero");
                clearDisplay();
                return;
            }
            result = prev / current;
            if (String(result).length > 15) result = result.toExponential(4); // Convert to exponential notation if length > 15
            break;
        default:
            return;
    }

    currentInput = result.toString();
    currentOperator = '';
    previousInput = '';
    document.getElementById('mainOutput').textContent = currentInput;
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    currentOperator = '';
    document.getElementById('mainOutput').textContent = '';
    var buttonDecimalPoint = document.getElementById('buttonDecimalPoint').setAttribute("onclick", "appendNumber('.')"); //Re-enable the decimal point.
}

function delKey() {
    if (document.getElementById('mainOutput').textContent === "") return; // Do nothing if the mainDisplayContent is already blank.
    if (currentInput.substring(currentInput.length - 1) === ".") { // Re-enable the decimal point if that was the last deleted value.
        var buttonDecimalPoint = document.getElementById('buttonDecimalPoint').setAttribute("onclick", "appendNumber('.')");
    }
    currentInput = currentInput.substring(0, currentInput.length - 1); // Delete the last character from currentInput.
    document.getElementById('mainOutput').textContent = `${previousInput} ${currentOperator} ${currentInput}`;
}

// Add a listener for key presses.
document.addEventListener('keydown', (event) => {
    // Prevent Firefox quick search from triggering if '/' pressed on either the full keyboard or numeric keypad.
    // Keycode is deprecated, but using Code doesn't allow prevention of default behaviour for the relevant keys.
    if (event.keyCode===191 || event.keyCode===111) event.preventDefault();
    //   if (event.Code==="NumpadDivide" || event.Code==="Slash") event.preventDefault();

    switch (event.key) {
        case '0': case '1': case '2': case '3': case '4': case '5': case '6': case '7': case '8': case '9': case ".":
           appendNumber(event.key);
           break;
        case '+': case '-': case '/': case '*':
            appendOperator(event.key);
            break;
        case '=':
            calculate();
            break;
        case 'Delete': case 'Backspace':
            delKey();
            break;
        case 'C': case 'c':
            clearDisplay();
            break;
        default:
            return;
    }
  }
)
