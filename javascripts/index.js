"use strict";

$('header').css('display', 'block');
$('main').css('display', 'flex');
$('footer').css('display', 'block');
var firstNumber,
    secondNumber,
    sign,
    result = undefined;
var boxResult = $('#box-result');
var firstTextOnBoxResult = boxResult.text();
var textHelper = $('#text-helper');

var resetVariables = function resetVariables() {
    firstNumber = secondNumber = sign = result = undefined;
    boxResult = $('#box-result');
};

var setNoResults = function setNoResults() {
    boxResult.text(firstTextOnBoxResult);
};

var isNoResults = function isNoResults(text) {
    return text === firstTextOnBoxResult && text !== "0";
};

var isThereFirstNumber = function isThereFirstNumber() {
    return firstNumber != undefined && firstNumber != "";
};

var isThereSign = function isThereSign() {
    return sign != undefined;
};

var isThereSecondNumber = function isThereSecondNumber() {
    return secondNumber != undefined && secondNumber != "";
};

var isLengthTwelveOrLess = function isLengthTwelveOrLess() {
    var number = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return number.length < 9;
};

var isThereDot = function isThereDot() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    return text.includes('.');
};

var isThereTwoCharactersAfterDot = function isThereTwoCharactersAfterDot() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var numberSeparated = text.split('.');

    if (numberSeparated.length > 1) {
        return numberSeparated[1].length > 1;
    }

    ;
};

var removeFinalDot = function removeFinalDot() {
    var text = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

    if (text[text.length - 1] === '.') {
        return text.substring(0, text.length - 1);
    } else {
        return text;
    }

    ;
};

var createResult = function createResult(number, result) {
    if (result) {
        boxResult.text("".concat(isThereTwoCharactersAfterDot(result.toString()) ? result.toFixed(2) : result));
    } else {
        boxResult.text("".concat(number));
    }

    ;
};

var putText = function putText(first, sign, second, finished) {
    if (finished) {
        textHelper.text("".concat(first || '', " ").concat(sign || '', " ").concat(sign ? second || 0 : second || '', " = ").concat(isThereTwoCharactersAfterDot(finished.toString()) ? finished.toFixed(2) : finished).trim());
    } else {
        textHelper.text("".concat(first || '', " ").concat(sign || '', " ").concat(sign ? second || 0 : second || '').trim());
    }

    ;
};

var clearCalculator = function clearCalculator() {
    if (!isNoResults(boxResult.text())) {
        resetVariables();
        setNoResults();
        putText('0');
    }

    ;
};

var cancelEntry = function cancelEntry() {
    if (!result) {
        if (!isNoResults(boxResult.text())) {
            if (isThereFirstNumber() && !isThereSign() && !isThereSecondNumber()) {
                firstNumber = firstNumber.substring(0, firstNumber.length - 1);
                createResult(firstNumber || 0);
            } else if (isThereFirstNumber() && isThereSign() && isThereSecondNumber()) {
                secondNumber = secondNumber.substring(0, secondNumber.length - 1);
                createResult(secondNumber || 0);
            }

            ;
            putText(firstNumber || '0', sign, secondNumber);
        }

        ;
    } else {
        clearCalculator();
    }

    ;
};

var add = function add(arg, dot) {
    if (result) {
        clearCalculator();
    }

    ;
    var type = isNaN(arg) && !dot ? 'sign' : 'number';

    if (!isThereSecondNumber() && !isThereSign() && type === 'number') {
        if (isLengthTwelveOrLess(firstNumber) && (!dot || !isThereDot(firstNumber))) {
            if (!isThereTwoCharactersAfterDot(firstNumber)) {
                if (dot) {
                    isThereFirstNumber() ? firstNumber += dot : firstNumber = 0 + dot;
                } else {
                    isThereFirstNumber() ? firstNumber += arg : arg === '0' && !firstNumber ? firstNumber = '0' + arg : firstNumber = arg;
                }

                ;
                createResult(firstNumber);
                putText(firstNumber);
            }

            ;
        }

        ;
    } else if (isThereFirstNumber() && !isThereSecondNumber() && type === 'sign' && !dot) {
        sign = arg;
        putText(removeFinalDot(firstNumber), sign);
        createResult(0);
    } else if (isThereSign() && type === 'number') {
        if (isLengthTwelveOrLess(secondNumber) && (!dot || !isThereDot(secondNumber))) {
            if (!isThereTwoCharactersAfterDot(secondNumber)) {
                if (dot) {
                    isThereSecondNumber() ? secondNumber += dot : secondNumber = 0 + dot;
                } else {
                    isThereSecondNumber() ? secondNumber += arg : arg === '0' && !secondNumber ? secondNumber = '0' + arg : secondNumber = arg;
                }

                ;
                createResult(secondNumber);
                putText(removeFinalDot(firstNumber), sign, secondNumber);
            }

            ;
        }

        ;
    }

    ;
};

var calculate = function calculate() {
    if (!result) {
        if (isThereSign()) {
            var numOne = parseFloat(firstNumber || 0);
            var numTwo = parseFloat(secondNumber || 0);

            switch (sign) {
                case "+":
                    result = numOne + numTwo || "0";
                    createResult(undefined, result);
                    putText(removeFinalDot(firstNumber), sign, removeFinalDot(secondNumber), result);
                    break;

                case "−":
                    result = numOne - numTwo || "0";
                    createResult(undefined, result);
                    putText(removeFinalDot(firstNumber), sign, removeFinalDot(secondNumber), result);
                    break;

                case "×":
                    result = numOne * numTwo || "0";
                    createResult(undefined, result);
                    putText(removeFinalDot(firstNumber), sign, removeFinalDot(secondNumber), result);
                    break;

                case "÷":
                    result = numOne / numTwo || "0";
                    createResult(undefined, result);
                    putText(removeFinalDot(firstNumber), sign, removeFinalDot(secondNumber), result);
                    break;
            }

            ;
        }

        ;
    } else {
        clearCalculator();
    }

    ;
};

$('a[onclick]').on('keydown', function (event) {
    if (event.keyCode === 13) {
        this.onclick();
        this.focus();
    }

    ;
});