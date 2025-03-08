class Part {
    constructor(type, value) {
        this.type = "";
        this.value = "";
    }
}

function computeExpression(exp) {
    let isValid = isValidExpression(exp);
    if (isValid != "") {
        return isValid;
    }
    return "";
}

function dieX(x) {
    // ts is what the skull does its some very weird thing
    try {
        let n = Number(x);
        n = Math.abs(n);
        if (n < 0.5) {
            n += 1;
        }
        console.log(n);
        let len = Math.round(Math.log10(Math.round(n))) + 1;
        let result = (-0.0231143* Math.pow(n, 4)) + (0.453579* Math.pow(n, 3)) + (-2.61579 * Math.pow(n, 2)) + (4.12515 * n) + 2.36018;
        console.log(len);
        return result % Math.pow(10, len);
    } catch {
        return "Error";
    }
}

function isNumber(num) {
    if (!isNaN(num)) {
        return true;
    } 
    return false;
} 

function isOperator(op) {
    let ops = ["+", "-", "*", "/"];
    if (ops.includes(op)) {
        return true;
    }
    return false;
}
document.addEventListener("keydown", (event) => {
    event.preventDefault(); // then pressing enter is weird
    if (event.key == "Backspace") {
        output = output.slice(0, -1);
    } else if (event.key == "=" || event.key == "Enter") {
        output = computeExpression(output);
    } else if (event.key == "Shift" || event.key == "Control") {

    } else if (event.key == "Escape") {
        output = "";
    }
    else {
        output += event.key;
    }
    output = output.toString();
    outputElement.textContent = output;
});
function replaceGoon(exp) {
    let search = "✋🤠";
    let searchI = 0;
    for (let i = 0; i < exp.length; i++) {
        if (exp[i] == search[searchI]) {
            searchI += 1;
            if (searchI + 1 == search.length) {
                console.log(searchI);
                console.log(`Found goon start${i-searchI+1} - end${i+1}`);
                let start = i-searchI+1;
                sub = ((12345/99999) * 100).toString();
                if (start > 0) {
                    console.log(exp[start-1] + isOperator(exp[start-1]));
                    if (!isOperator(exp[start-1])) {
                        sub = "*" + sub;
                    }
                }
                console.log((i+1).toString() + " " + exp.length);
                if (i+2 < exp.length) {
                    console.log("try");
                    if (!isOperator(exp[i+2])) {
                        sub = sub + "*";
                    }
                }
                sub = sub;
                exp = exp.slice(0, start) + sub + exp.slice(i+2);
                let difference = sub.length - search.length;
                i += difference;
                console.log(`new exp:${exp}`);
            }
        } else {
            searchI = 0;
        }
    }
    return exp;
}

function isValidExpression(exp) {
    try {
        exp = replaceGoon(exp);
        return parseFloat(eval(exp).toFixed(10));
    } catch {
        return "Error";
    }
}



let outputElement = document.getElementById("output-txt");
let output = "";
document.querySelectorAll(".btn").forEach(button => {
    button.addEventListener("click", (e) => {
        if (e.target.textContent == "AC") {
            output = "";
        } else if (e.target.textContent == "⌫") {
            output = output.slice(0, -1);
        } else if (e.target.textContent == "☠") {
            output = computeExpression(output);
            output = dieX(output);
        }
        else {
            if (e.target.textContent == "=") {
                output = computeExpression(output);
            } else {
                output += e.target.textContent;
            }
        }
        output = output.toString();
        outputElement.textContent = output;
    });
});