function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
        let str2 = [0,0,0];
        let buffer = expr.replace(/-/g, "- ");
        let bracket = '';
        // Проверка на парные скобки
        if (buffer.split('(').length != buffer.split(')').length)  
            throw "ExpressionError: Brackets must be paired";
        // Находим значение в скобках
        if (buffer.includes('(')) {
            while (buffer.includes('(')) {
                for(let i = 0; i < buffer.length; i++) {
                    if (buffer[i] == '(') {
                        str2[2]++;
                        str2[0] = i;
                    }
                    if (buffer[i] == ')') {
                            str2[1] = i;
                            break;
                    }
                }
                bracket = buffer.slice(str2[0] + 1, str2[1]);
                buffer = String(buffer.slice(0, str2[0])) + String(sum(bracket)) + String(buffer.slice(str2[1]+1));
            }
            return sum(buffer);
        }
        return sum(buffer);

        function sum(str) {
            let result = 0
            let plus = str.split('+');
            for (let i = 0; i < plus.length; i++)   
                result += +splitSubtraction(plus[i]);
            if (result === Infinity)    
                throw "TypeError: Division by zero."
            return result;
        }

        function splitSubtraction(expr) {
            let res = 0;
            expr = expr.split('- ');
            res = splitMultiply(expr[0]);
            for (let i = 1; i < expr.length; i++)
                res -= splitMultiply(expr[i]);
            return res;
        }

        function splitMultiply(expr) {
            let res = 1;
            expr = expr.split('*');
            for (let i = 0; i < expr.length; i++)
                res *= splitDivide(expr[i]);
            return res;
        }

        function splitDivide(expr) {
            let res = 1;
            if (!expr.match(/\//g))
                return expr;
            expr = expr.split('/');
            res = splitDivide(expr[0]);
            for (let i = 1; i < expr.length; i++) {
                res /= expr[i];
            }
            return res;
        }
}

module.exports = {
    expressionCalculator
}