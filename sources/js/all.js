function formatCurrency(number) {

    const parts = number.split(".");
    let intPart = "";
    let decimal = "";
    if (number.length > 0) {
        const clean = parts[0].split(',').join('');

        let counter = 0;
        for (let index = clean.length - 1; index >= 0; index--) {

            const element = clean[index];
            counter++;
            intPart = element + intPart;
            if (counter % 3 == 0 && index > 0) {
                intPart = "," + intPart;
            }
        }
        if (parts[1] != undefined && parts[1].slice(0, 2) != "00") {
            let decimalPart = parts[1];

            decimal = decimalPart.length > 2 && getNumber(decimalPart[2]) >= 5 ? getNumber(decimalPart.slice(0, 2)) + 1 : decimalPart.slice(0, 2);

        } else {
            decimal = "00"
        }
    }

    return intPart + "." + decimal;
}

function getNumber(numberFormated) {

    return parseFloat(numberFormated.replace(/^\$|\,/g, ''));
}

function getInt(numberFormated) {
    
    return parseInt(numberFormated.replace(/^\$|\,/g, ''));
}


function validatePoints(text) {
    const matches = text.match(/\./g);
    const poinst = matches ? matches.length : 0;
    return poinst <= 1;
}

function validateInputCurrency(text) {
    return !/[a-zA-Z]/.test(text) && (!isNaN(text) || (text == "."));
}

function validateInputNumber(text) {
    return !/[a-zA-Z]/.test(text) && (!isNaN(text));
}

function commandSpecial(key) {
    const allowedKeys = [
        'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight',
        'Backspace', 'Delete', 'Tab', 'Enter', 'Escape',
        'Shift', 'Control', 'Alt', 'Meta', 'CapsLock',
        'Home', 'End', 'PageUp', 'PageDown', 'Insert', 'ContextMenu'
    ];

    return !allowedKeys.includes(key);
}

function actionAmounts(event, active) {


    if (event.keyCode == 46 || event.keyCode == 8 || (validatePoints(active.value) && validateInputCurrency(event.key))) {

    } else if ((event.keyCode >= 65 && event.keyCode <= 90) || (event.keyCode >= 97 && event.keyCode <= 122) || commandSpecial(event.key)) {
        event.preventDefault();
    }
}