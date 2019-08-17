//varivais iniciadas
let numberOne = '0';
let numberTwo = '';
let operation = '';
let result = '';
let validationClickEqual = false;
let xHighYClick = false;

//coloca um zoom de 125% na tela do usuário
(() => {
  document.body.style.zoom = 1.25;
})();

//mostra na tela
const showScreen = (value) => {
  document.querySelector('.value').innerHTML = value;
};

//limpa
const clean = () => {
  numberOne = '0';
  numberTwo = cleanString(numberTwo);
  operation = cleanString(operation);

  showScreen(numberOne);
};

//limpa strings
const cleanString = (string) => {
  return string = '';
};

const addNumber = (value) => {  
  //simples verificações para ter até 8 caracteres na tela
  if(numberTwo.length <= 7){
    if(operation !== '' || xHighYClick) {
      numberTwo = numberTwo + value;
      showScreen(numberTwo);
    } else {
      if(numberOne.length <= 7){
        if(numberOne === '0'){
          numberOne = value;
        } else{
          numberOne += value;
        }
      }

      showScreen(numberOne);
    }
  }

  //depois do calculo ser finalizado, ele seta o número na tela como o próximo que você clicar
  if(validationClickEqual){
    numberOne = value;
    validationClickEqual = false;
    showScreen(numberOne);
  }
};

//adiciona operação
const addOperation = (value) => {
  //seta valor da operation
  if(numberTwo === '' || operation === ''){
    operation = value;
  }
};

const addPoint = () => {
  //validações para adicionar somente um ponto no numberOne ou numberTwo
  if(operation && numberTwo === ''){
    if(numberTwo.indexOf('.') === -1){
      numberTwo += '0.';
    } else {
      numberTwo += '';
    }
  } else if(operation && numberTwo){
    if(numberTwo.indexOf('.') === -1){
      numberTwo += '.';
    } else {
      numberTwo += '';
    }
  } else {
    if(numberOne.indexOf('.') === -1){
      numberOne += '.';
    } else {
      numberOne += '';
    }
  }
};

//altera valor do xHighYClick
const xHighY = () => {
  xHighYClick = true;
};

//simples function para calcular a raiz quadrada
const squareRoot = () => {
  if(numberOne !== '0'){
    numberOne = Math.sqrt(numberOne).toFixed(2);
  }

  showScreen(numberOne);
};

//joga o resultado para a tela
const resultCalculation = () => {
  if(numberTwo !== '' && (operation !== '' || xHighYClick)){
    validationClickEqual = true;
    result = new String(calculate()).substr(0, 11);

    showScreen(result);
  }
};  

//faz as verificações de operações e de cálculos
const calculate = () => {
  numberOne = parseFloat(numberOne);
  numberTwo = parseFloat(numberTwo);

  if(operation){
    switch (operation) {
      case '/':
        numberOne = numberOne / numberTwo;
        break;
      case '*':
        numberOne = numberOne * numberTwo;
        break;
      case '+':
        numberOne = numberOne + numberTwo;
        break;
      case '-':
        numberOne = numberOne - numberTwo;
        break;
    } 
  } else if(xHighYClick){
    numberOne = Math.pow(numberOne, numberTwo);
  } else {
    numberOne = 0;
  }

  numberTwo = cleanString(numberTwo);
  operation = cleanString(operation);

  return numberOne;
};