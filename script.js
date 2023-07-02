class Calculator{
    constructor () {
        this.methods = {
            '+' : (num1, num2) => num1 + num2,
            '-' : (num1, num2) => num1 - num2,
            '*' : (num1, num2) => num1 * num2,
            '/' : (num1, num2) => num1 / num2,
            '%' : (num1, num2) => num1 % num2, 
        }
        this.num1 = 0;
        this.op = null;
        this.num2 = null;
        this.typeValue = '0';
        this.operationValue = '';
        this.lastButtonValue = null;

        this.typeSpace = document.querySelector('.type-space');
        this.operationSpace = document.querySelector('.operation-space');
        this.typeSpace.textContent = this.typeValue;
        this.buttons = document.querySelectorAll('button');
        this.buttons.forEach((button) => button.addEventListener('click', this.populateDisplay.bind(this)));
    }
    operate (num1, num2, op) {
        this.num1 = num1;
        this.num2 = num2;
        this.op = op;
        if(isNaN(this.num1) || isNaN(this.num2) || this.methods[this.op] === undefined) return NaN;
        return this.methods[this.op](this.num1, this.num2);
    }
    populateDisplay(e) {
        const buttonValue = e.target.value;
        const methodsKeys = Object.keys(this.methods);
        const operationValueLength = this.operationValue.length - 1;
        switch(true) {
            case (buttonValue >= '0' && buttonValue <= '9'):
                setDisplayNumber.bind(this)();
                break;
            case (methodsKeys.includes(buttonValue)):
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
            case (buttonValue === '.'):
                addDot.bind(this)();
                break;
        }

        function setDisplayNumber () {
            if(methodsKeys.includes(this.operationValue.charAt(operationValueLength))) this.typeValue = buttonValue;
            if(this.typeValue.length === 10) return;
            else if(this.typeValue === '0') this.typeValue = buttonValue;
            else if(!methodsKeys.includes(this.operationValue.charAt(operationValueLength)))this.typeValue += buttonValue;
            if(this.operationValue === '0') this.operationValue = buttonValue;
            else {
                if(methodsKeys.includes(this.operationValue.charAt(operationValueLength))){
                    this.operationValue += ' ' + buttonValue;
                }
                else this.operationValue += buttonValue;
            }
            this.operationSpace.textContent = this.operationValue;
            this.typeSpace.textContent = this.typeValue;
            if(this.op){
                this.num2 = +this.typeValue;
            }
            else{
                this.num1 = +this.typeValue;
            }
        }

        function setOperator () {
            let split = this.operationValue.split(' ');
            if(split.length === 3){
                this.num1 = +split[0];
                this.num2 = +split[2];
                this.op = split[1];
                this.typeValue = this.operate(+this.num1, +this.num2, this.op);
                if(!isNaN(this.typeValue)) this.typeValue = this.typeValue.toString();
                this.num1 = +this.typeValue;
                this.operationValue = `${this.typeValue} ${buttonValue}`;
                this.typeSpace.textContent = this.typeValue;
                this.operationSpace.textContent = this.operationValue;
            } 
            else{
                if(this.operationValue === ''){
                    this.operationValue = '0';
                    this.operationSpace.textContent = this.operationValue;
                }
                if(Object.keys(this.methods).includes(this.operationValue.charAt(operationValueLength))){
                    split.splice(split.length -1 , 1, buttonValue);
                    this.operationValue = split.join(' ');
                }
                else{
                    this.operationValue += ' ' + buttonValue;
                }
                this.operationSpace.textContent = this.operationValue;
                this.op = buttonValue;
            }
        }

        function clearDisplay () {
            this.num1 = 0;
            this.op = null;
            this.num2 = null;
            this.typeValue = '0';
            this.operationValue = '';
            this.typeSpace.textContent = this.typeValue;
            this.operationSpace.textContent = this.operationValue;
        }

        function undoValue () {
            // for type value
            this.typeValue = this.typeValue.slice(0, this.typeValue.length - 1);
            if(this.typeValue.length === 0) this.typeValue = '0';
            this.typeSpace.textContent = this.typeValue;
            // for operation value
            const split = this.operationValue.split(' ');
            split[split.length - 1] = split[split.length - 1].slice(0, split[split.length - 1].length - 1);
            if(split[split.length - 1] === ''){
                split.splice(split.length - 1, 1);
            }
            this.operationValue = split.join(' ');
            this.num1 = split[0] === undefined ? 0 : +split[0];
            this.op = split[1] === undefined ? null : split[1];
            this.num2 = split[2] === undefined ? null : +split[2];
            this.operationSpace.textContent = this.operationValue;
        }

        function evaluate () {
            const split = this.operationValue.split(' ');
            console.log(split);
            if(split.length === 3){
                this.num1 = +split[0];
                this.op = split[1];
                this.num2 = +split[2];
                this.typeValue = this.operationValue = this.operate(this.num1, this.num2, this.op).toString();
                this.typeSpace.textContent = this.operationSpace.textContent = this.typeValue;
                console.log(this.typeValue);
            }
            else if(split.length > 0 && split.length <= 2){
                this.num1 = +split[0];
                this.typeValue = this.operationValue = this.num1.toString();
                this.typeSpace.textContent = this.typeValue;
                this.operationSpace.textContent = this.operationValue;
            }
        }

        function addDot () {
            const split = this.operationValue.split(' ');
            if(split.length === 3){
                if(!split[2].includes('.')){
                    split[2] += '.';
                }
                this.num2 = split[2];
                this.typeValue = this.num2;
            }
            else if(split.length === 2){
                split.push('0.');
                this.num2 = split[2];
                this.typeValue = this.num2;
            }
            else if(split.length === 1){
                if(split[0] === ''){
                    split[0] = '0.';
                }
                else if(!split[0].includes('.')){
                    split[0] += '.';
                }
                this.num1 = split[0];
                this.typeValue = this.num1;
            }
            this.operationValue = split.join(' ');
            this.typeSpace.textContent = this.typeValue;
            this.operationSpace.textContent = this.operationValue;
        }
    }
}

const calculator = new Calculator();

