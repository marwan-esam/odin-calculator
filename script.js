class Calculator{
    constructor () {
        this.methods = {
            '+' : (num1, num2) => num1 + num2,
            '-' : (num1, num2) => num1 - num2,
            '*' : (num1, num2) => num1 * num2,
            '/' : (num1, num2) => num1 / num2,
        }
        this.num1 = 0;
        this.op = null;
        this.num2 = null;
        this.ans = 0;
        this.displayValue = '0';
        this.lastButtonValue = null;

        this.display = document.querySelector('.display');
        this.display.textContent = this.displayValue;
        this.buttons = document.querySelectorAll('button');
        this.buttons.forEach((button) => button.addEventListener('click', this.populateDisplay.bind(this)));
    }
    operate (num1, num2, op) {
        this.num1 = num1;
        this.num2 = num2;
        this.op = op;
        if(isNaN(this.num1) || isNaN(this.num2) || this.methods[this.op] === undefined) return null;
        return this.methods[this.op](this.num1, this.num2);
    }
    populateDisplay(e) {
        const buttonValue = e.target.value;
        const buttonClassValue = e.target.classList.value;
        switch(true) {
            case (buttonClassValue.includes('digit')):
                setDisplayNumber.bind(this)();
                break;
            case (buttonClassValue === 'op'):
                setOperator.bind(this)();
                break;
            case (buttonValue === 'c'):
                clearDisplay.bind(this)();
                break;
            case (buttonValue === 'd'):
                undoValue.bind(this)();
                break;
            case (buttonValue === '='):
                evaluate.bind(this)();
                break;
            
        }

        function setDisplayNumber () {
            if(this.displayValue === '0' || (this.lastButtonValue === '+' || this.lastButtonValue === '-' || this.lastButtonValue === '*' || this.lastButtonValue === '/')){
                this.displayValue = buttonValue;
            }
            else{
                this.displayValue += buttonValue;
            }
            if(this.op){
                this.num2 = +(this.displayValue);
            }
            else{
                this.num1 = +(this.displayValue);
            }
            this.display.textContent = this.displayValue;
            this.lastButtonValue = buttonValue;
        }

        function setOperator () {
            if(this.op === null){
                this.op = buttonValue;
            }
            else if(this.lastButtonValue === '+' || this.lastButtonValue === '-' || this.lastButtonValue === '*' || this.lastButtonValue === '/'){
                if(buttonValue === this.lastButtonValue){
                    this.num2 = this.num1;
                    this.displayValue = this.operate(this.num1, this.num2, this.op).toString();
                    this.display.textContent = this.displayValue;
                    this.num1 = +(this.displayValue);
                }
                else{
                    this.op = buttonValue;
                }
            }
            else{
                this.num2 = +(this.displayValue);
                this.displayValue = this.operate(this.num1, this.num2, this.op).toString();
                this.display.textContent = this.displayValue;
                this.num1 = +(this.displayValue);
                this.op = buttonValue;
            }
            this.lastButtonValue = buttonValue;
        }

        function clearDisplay () {
            this.num1 = 0;
            this.op = null;
            this.num2 = null;
            this.ans = 0;
            this.displayValue = '0';
            this.lastButtonValue = null;
            this.display.textContent = this.displayValue;
        }

        function undoValue () {
            // if(this.displayValue.length === 1){
            //     this.displayValue = '0';
            //     this.display.textContent = this.displayValue;
            //     return;
            // }
            // const split = this.displayValue.split('');
            // split.pop();
            // this.displayValue = split.join('');
            // this.display.textContent = this.displayValue;
        }

        function evaluate() {
            if(this.lastButtonValue === '='){
                this.num1 = this.num2 = +(this.displayValue);
            }
            this.displayValue = this.operate(this.num1, this.num2, this.op);
            this.display.textContent = this.displayValue;
        }
    }
}

const calculator = new Calculator();

