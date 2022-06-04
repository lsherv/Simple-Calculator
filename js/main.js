const buttons = document.querySelector('.calculator-buttons');

buttons.addEventListener('click', event => {
    const {target} = event;
    const {value} = target;
    if (!target.matches('button')) {
        return;
    } else {
        calculator.parseInput(value);
        //console.log(value)
    }
})

const calculator = {
    displayText: '0',
    prevTotal: null,
    parseInput(value) {
        switch (value) {
            case '=' :
                this.calcAnswer(this.displayText)
                break;
            case 'C':
                this.clearAll()
                break;
            case '.':
                if (this.displayText == 0) {
                    this.addText('0.')
                } else {
                    this.addText(value)
                }
                break;
            default:
                this.addText(value)
                break;
        }
    },

    addText(value) {
        if (this.displayText === '0') {
            this.displayText = '';
        } else if (this.prevTotal !== null) {
            this.displayText = this.prevTotal;
            this.prevTotal = null;
        }
        if (isNaN(+(value)) && isNaN(+(this.displayText))) {
            if (isNaN(this.displayText.slice(-1))) {
                return;
            }
        }
        this.displayText += value;
        this.outputText(this.displayText);
    },

    outputText(text) {
        document.querySelector('.display').value = text;
    },

    calcAnswer(equation) {
        let result = Function("return " + equation)()
        this.outputText(result);
        this.prevTotal = result;
    },

    clearAll() {
        this.displayText = '0',
        this.prevTotal = null,
        this.outputText(this.displayText)
    },
}