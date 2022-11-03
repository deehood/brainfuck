function brainLuck(code, inputStr) {
    let ip = 0;
    const dp = new dataPointer();

    let input = [...inputStr].map((char) => char.charCodeAt(0));
    let output = "";

    const brackets = bracketsMap(code);

    dp.data = Array(5000).fill(0);

    let exit = false;

    while (ip < code.length && dp.address < 5000 && exit === false) {
        switch (code[ip]) {
            case ">":
                dp.incDataPointer();
                break;
            case "<":
                dp.decDataPointer();
                break;
            case "+":
                dp.incValue();
                break;
            case "-":
                dp.decValue();
                break;
            case "[":
                if (dp.data[dp.address] === 0) ip = brackets.get(ip);
                break;
            case "]":
                if (dp.data[dp.address] !== 0)
                    ip = [...brackets].find(([key, val]) => val === ip)[0];
                break;
            case ",":
                dp.data[dp.address] = input[0];
                input.length > 0 ? input.splice(0, 1) : (exit = true);
                break;
            case ".":
                output += String.fromCharCode(dp.data[dp.address]);
                break;
        }
        ip++;
    }
    return output;
}

function dataPointer() {
    return {
        data: [],
        address: 0,

        incDataPointer() {
            this.address++;
        },
        decDataPointer() {
            this.address--;
        },
        incValue() {
            this.data[this.address]++;
            if (this.data[this.address] > 255) this.data[this.address] = 0;
        },
        decValue() {
            this.data[this.address]--;
            if (this.data[this.address] < 0) this.data[this.address] = 255;
        },
    };
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
