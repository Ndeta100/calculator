const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number) {
    // Replace current display value if first value is entered
    if (awaitingNextValue) {
      calculatorDisplay.textContent = number;
      awaitingNextValue = false;
    } else {
      // If current display value is 0, replace it, if not add number to display value
      const displayValue = calculatorDisplay.textContent;
      calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number;
    }
  }
function addDecimal(){
    // if operato pressed, don't add decimal
    if(awaitingNextValue) return
    // If no decimal, add one
    if(!calculatorDisplay.textContent.includes('.')){
     calculatorDisplay.textContent=`${calculatorDisplay.textContent}.`
    }
}
// Calculate first and second value depending on operator
const calculate={
    '/':(firstValue, secondNumber)=>firstValue/secondNumber,
    '*':(firstValue, secondNumber)=>firstValue*secondNumber,
    '+':(firstValue, secondNumber)=>firstValue+secondNumber,
    '-':(firstValue, secondNumber)=>firstValue-secondNumber,
    '=':(firstValue, secondNumber)=>secondNumber
}
function useOperator(operator){
    // Prevent multiple operators
    if(operator && awaitingNextValue){
        operatorValue=operator
        return
    }
    const currentValue=Number(calculatorDisplay.textContent)
    // Assign first value of no value
    if(!firstValue){
        firstValue=currentValue
    } else{
        console.log(firstValue, operatorValue,currentValue)
        const calculation=calculate[operatorValue](firstValue, currentValue)
        calculatorDisplay.textContent=calculation
        firstValue=calculation
    }
    // We are ready for the next value, store operator
    awaitingNextValue=true
    operatorValue=operator
}
  // Add Event Listeners for numbers, operators, decimal
inputBtns.forEach((inputBtn) => {
    if (inputBtn.classList.length === 0) {
      inputBtn.addEventListener('click', () => sendNumberValue(inputBtn.value));
    } else if (inputBtn.classList.contains('operator')) {
      inputBtn.addEventListener('click', () => useOperator(inputBtn.value));
    } else if (inputBtn.classList.contains('decimal')) {
      inputBtn.addEventListener('click', () => addDecimal());
    }
  });

//    Reset  all values ,display
function resetAll(){
     firstValue = 0;
 operatorValue = '';
 awaitingNextValue = false;
    calculatorDisplay.textContent='0'
}
// Event Listener
clearBtn.addEventListener('click', resetAll)