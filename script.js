class Calculator{
    constructor () {
        this.methods = {
            '+' : (num1, num2) => num1 + num2,
            '-' : (num1, num2) => num1 - num2,
            '*' : (num1, num2) => num1 * num2,
            '/' : (num1, num2) => num1 / num2,
        }
        this.num1 = null;
        this.op = null;
        this.num2 = null;
        this.displayValue = 0;

        const display = document.querySelector('.display');
        display.textContent = this.displayValue;
    }
    operate (num1, num2, op) {
        this.num1 = num1;
        this.num2 = num2;
        this.op = op;
        if(isNaN(this.num1) || isNaN(this.num2) || this.methods[this.op] === undefined) return NaN;
        return this.methods[this.op](this.num1, this.num2);
    }
}

const calculator = new Calculator();

