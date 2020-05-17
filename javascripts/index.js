$('header').css('display', 'block');
$('main').css('display', 'flex');
$('footer').css('display', 'block');

let firstNumber, secondNumber, sign, result = undefined;
let boxResult = $('#box-result');
let firstTextOnBoxResult = boxResult.text();
let textHelper = $('#text-helper');

const resetVariables = function(){
    firstNumber = secondNumber = sign = result = undefined;
    boxResult = $('#box-result');
};

const setNoResults = function(){
    boxResult.text(firstTextOnBoxResult);
};

const isNoResults = function(text){
    return text === firstTextOnBoxResult && text !== "0";
};

const isThereFirstNumber = function(){
    return firstNumber != undefined && firstNumber != "";
};

const isThereSign = function(){
    return sign != undefined;
};

const isThereSecondNumber = function(){
    return secondNumber != undefined && secondNumber != "";
};

const isLengthTwelveOrLess = function(number = ''){
    return number.length < 9;
};

const isThereDot = function(text = ''){
    return text.includes('.');
};

const isThereTwoCharactersAfterDot = function(text = ''){
    let numberSeparated = text.split('.');

    if(numberSeparated.length > 1){
        return numberSeparated[1].length > 1;
    };
};

const removeFinalDot = function(text = ''){
    if(text[text.length - 1] === '.'){
        return text.substring(0, (text.length - 1))
    } else{
        return text;
    };
};

const createResult = function(number, result){
    if(result){
        boxResult.text(`${isThereTwoCharactersAfterDot(result.toString()) ? result.toFixed(2) : result}`);
    } else{
        boxResult.text(`${number}`);
    };
};

const putText = function(first, sign, second, finished){
    if(finished){
        textHelper.text(`${first || ''} ${sign || ''} ${sign ? second || 0 : second || ''} = ${isThereTwoCharactersAfterDot(finished.toString()) ? finished.toFixed(2) : finished}`.trim());
    }else{
        textHelper.text(`${first || ''} ${sign || ''} ${sign ? second || 0 : second || ''}`.trim());
    };
};

const clearCalculator = function(){
    if(!isNoResults(boxResult.text())){
        resetVariables();
        setNoResults();
        putText('0');
    };
};

const cancelEntry = function(){
    if(!result){
        if(!isNoResults(boxResult.text())){
            if(isThereFirstNumber() && !isThereSign() && !isThereSecondNumber()){
                firstNumber = firstNumber.substring(0,(firstNumber.length - 1));
                createResult(firstNumber || 0);
            } else if(isThereFirstNumber() && isThereSign() && isThereSecondNumber()){
                secondNumber = secondNumber.substring(0,(secondNumber.length - 1));
                createResult(secondNumber || 0);
            };

            putText(firstNumber || '0', sign, secondNumber);
        };
    } else{
        clearCalculator();
    };
};

const add = function(arg, dot){
    if(result) {
        clearCalculator();
    };

    let type = isNaN(arg) && !dot ? 'sign' : 'number';

    if(!isThereSecondNumber() && !isThereSign() && type === 'number'){
        if(isLengthTwelveOrLess(firstNumber) && (!dot || !isThereDot(firstNumber))){
            if(!isThereTwoCharactersAfterDot(firstNumber)) {
                if(dot){
                    isThereFirstNumber() ? firstNumber += dot : firstNumber = (0 + dot);
                } else{
                    isThereFirstNumber() ? firstNumber += arg : (arg === '0' && !firstNumber ? firstNumber = '0' + arg : firstNumber = arg);
                };

                createResult(firstNumber);
                putText(firstNumber);
            };
        };
    } else if(isThereFirstNumber() && !isThereSecondNumber() && type === 'sign' && !dot){
        sign = arg;
        putText(removeFinalDot(firstNumber), sign);
        createResult(0);
    } else if(isThereSign() && type === 'number'){
        if(isLengthTwelveOrLess(secondNumber) && (!dot || !isThereDot(secondNumber))){
            if(!isThereTwoCharactersAfterDot(secondNumber)){
                if(dot){
                    isThereSecondNumber() ? secondNumber += dot : secondNumber = (0 + dot);
                } else{
                    isThereSecondNumber() ? secondNumber += arg : (arg === '0' && !secondNumber ? secondNumber = '0' + arg : secondNumber = arg);
                };

                createResult(secondNumber);
                putText(removeFinalDot(firstNumber), sign, secondNumber);
            };
        };
    };
};

const calculate = function(){
    if(!result) {
        if(isThereSign()){
            let numOne = parseFloat(firstNumber || 0);
            let numTwo = parseFloat(secondNumber || 0);

            switch(sign) {
                case "+":
                    result = (numOne + numTwo) || "0";

                    createResult(undefined, result);
                    putText(removeFinalDot(firstNumber), sign, removeFinalDot(secondNumber), result);
                    break;
                case "−":
                    result = (numOne - numTwo) || "0";

                    createResult(undefined, result);
                    putText(removeFinalDot(firstNumber), sign, removeFinalDot(secondNumber), result);
                    break;
                case "×":
                    result = (numOne * numTwo) || "0";

                    createResult(undefined, result);
                    putText(removeFinalDot(firstNumber), sign, removeFinalDot(secondNumber), result);
                    break;
                case "÷":
                    result = (numOne / numTwo) || "0";

                    createResult(undefined, result);
                    putText(removeFinalDot(firstNumber), sign, removeFinalDot(secondNumber), result);
                    break;
            };
        };
    }else{
        clearCalculator();
    };
};

$('a[onclick]').on('keydown', function(event){
    if(event.keyCode === 13){
        this.onclick();
        this.focus();
    };
});