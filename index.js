function brainLuck(code, inputStr) {
    const data = Array(5000).fill(0);
    const brackets = bracketsMap(code);

    let ip = 0;
    let address = 0;

    let input = [...inputStr].map((char) => char.charCodeAt(0));
    let output = "";

    let exit = false;

    while (ip < code.length && address < 5000 && exit === false) {
        switch (code[ip]) {
            case ">":
                address++;
                break;
            case "<":
                address--;
                break;
            case "+":
                data[address]++;
                if (data[address] > 255) data[address] = 0;
                break;
            case "-":
                data[address]--;
                if (data[address] < 0) data[address] = 255;
                break;
            case "[":
                if (data[address] === 0) ip = brackets.get(ip);
                break;
            case "]":
                if (data[address] !== 0)
                    ip = [...brackets].find(([key, val]) => val === ip)[0];
                break;
            case ",":
                data[address] = input[0];
                input.length > 0 ? input.splice(0, 1) : (exit = true);
                break;
            case ".":
                output += String.fromCharCode(data[address]);
                break;
        }
        ip++;
    }
    return output;
}

function bracketsMap(code) {
    const brackets = new Map();

    for (let i = 0; i < code.length; i++) {
        if (code[i] === "[") brackets.set(i, -1);
        if (code[i] === "]") {
            let found = false;
            let temp = i;
            while (!found) {
                temp--;
                if (code[temp] === "[" && brackets.get(temp) === -1)
                    found = true;
            }
            brackets.set(temp, i);
        }
    }
    console.log(brackets);
    return brackets;
}

console.log("1 ", brainLuck(",+[-.,+]", "Codewars"), "\n");

console.log(
    "2 ",
    brainLuck(",+[-.,+]", "Codewars" + String.fromCharCode(255)),
    "\n"
);

console.log("3 ", brainLuck(",[.[-],]", "oktreta"), "\n");

console.log(
    "4 ",
    brainLuck(",>,<[>[->+>+<<]>>[-<<+>>]<<<-]>>.", String.fromCharCode(8, 9)),
    "\n"
);
console.log("5 ", brainLuck(",[.[-],]", ""), "\n");

console.log(
    "6 ",
    brainLuck(
        ">+++++++++[<++++++++>-]<.>+++++++[<++++>-]<+.+++++++..+++.[-]>++++++++[<++++>-] <.>+++++++++++[<++++++++>-]<-.--------.+++.------.--------.[-]>++++++++[<++++>- ]<+.[-]++++++++++.",
        "ola"
    )
);

console.log(
    "7 ",
    brainLuck(
        "++++++++++[>+>+++>+++++++>++++++++++<<<<-]>>>++.>+.+++++++..+++.<<++.>+++++++++++++++.>.+++.------.--------.<<+.<.",
        ""
    )
);
