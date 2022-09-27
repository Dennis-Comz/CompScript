"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoAritmetica = exports.Aritmetica = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
const Error_1 = require("../Error/Error");
const ErrorList_1 = require("../StaticObjects/ErrorList");
class Aritmetica extends Expresion_1.Expresion {
    constructor(left, right, tipo, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipo = tipo;
    }
    execute(ambito) {
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);
        const leftType = this.getTypeName(leftValue.type);
        const rightType = this.getTypeName(rightValue.type);
        if (this.tipo == TipoAritmetica.SUMA) {
            if (leftValue.type == 3 && rightValue.type == 3) {
                leftValue.value = String.fromCharCode(leftValue.value);
                rightValue.value = String.fromCharCode(rightValue.value);
            }
            else if (leftValue.type == 3 && rightValue.type == 4) {
                leftValue.value = String.fromCharCode(leftValue.value);
            }
            else if (leftValue.type == 4 && rightValue.type == 3) {
                rightValue.value = String.fromCharCode(rightValue.value);
            }
            let dominanteSuma = this.tipoDominanteSuma(leftValue.type, rightValue.type);
            if (dominanteSuma == Retorno_1.Type.CADENA) {
                return { value: leftValue.value + rightValue.value, type: Retorno_1.Type.CADENA };
            }
            else if (dominanteSuma == Retorno_1.Type.ENTERO) {
                return { value: leftValue.value + rightValue.value, type: Retorno_1.Type.ENTERO };
            }
            else if (dominanteSuma == Retorno_1.Type.DOBLE) {
                return { value: (leftValue.value + rightValue.value), type: Retorno_1.Type.DOBLE };
            }
            else {
                ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftType + ' _ ' + rightType));
            }
        }
        else if (this.tipo == TipoAritmetica.RESTA) {
            let dominanteResta = this.tipoDominanteResta(leftValue.type, rightValue.type);
            if (dominanteResta == Retorno_1.Type.ENTERO) {
                return { value: leftValue.value - rightValue.value, type: Retorno_1.Type.ENTERO };
            }
            else if (dominanteResta == Retorno_1.Type.DOBLE) {
                return { value: (leftValue.value - rightValue.value), type: Retorno_1.Type.DOBLE };
            }
            else {
                ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftType + ' _ ' + rightType));
            }
        }
        else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            let dominanteMulti = this.tipoDominanteMulti(leftValue.type, rightValue.type);
            if (dominanteMulti == Retorno_1.Type.ENTERO) {
                return { value: leftValue.value * rightValue.value, type: Retorno_1.Type.ENTERO };
            }
            else if (dominanteMulti == Retorno_1.Type.DOBLE) {
                return { value: (leftValue.value * rightValue.value), type: Retorno_1.Type.DOBLE };
            }
            else {
                ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftType + ' _ ' + rightType));
            }
        }
        else if (this.tipo == TipoAritmetica.DIVISION) {
            let dominanteDivision = this.tipoDominanteDivision(leftValue.type, rightValue.type);
            if (dominanteDivision == Retorno_1.Type.DOBLE) {
                if (rightValue.value == 0) {
                    ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", "No se puede divir entre 0"));
                }
                return { value: (leftValue.value / rightValue.value), type: Retorno_1.Type.DOBLE };
            }
            else {
                ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftType + ' _ ' + rightType));
            }
        }
        else if (this.tipo == TipoAritmetica.POTENCIA) {
            let dominantePotencia = this.tipoDominantePotencia(leftValue.type, rightValue.type);
            if (dominantePotencia == Retorno_1.Type.ENTERO) {
                return { value: leftValue.value ** rightValue.value, type: Retorno_1.Type.ENTERO };
            }
            else if (dominantePotencia == Retorno_1.Type.DOBLE) {
                return { value: (leftValue.value ** rightValue.value), type: Retorno_1.Type.DOBLE };
            }
            else if (dominantePotencia == Retorno_1.Type.ERROR) {
                ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftType + ' _ ' + rightType));
            }
        }
        else if (this.tipo == TipoAritmetica.MODULO) {
            let dominanteModulo = this.tipoDominanteModulo(leftValue.type, rightValue.type);
            if (dominanteModulo == Retorno_1.Type.DOBLE) {
                return { value: (leftValue.value % rightValue.value), type: Retorno_1.Type.DOBLE };
            }
            else {
                ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, 'Semantico', 'No se puede operar: ' + leftType + ' _ ' + rightType));
            }
        }
    }
    graficar(nodo, num) {
        num++;
        let resultado = nodo + " -> " + "NodoExpresion" + (num) + ";\n";
        // Crear Nodo expresion que se conecta a el nodo pasado por parametro
        resultado += "NodoExpresion" + num + "[label=\"Expresion\"];\n";
        // expresion - expresion - expresion
        //               signo
        // Para obtener la expresion del lado izquierdo y todos sus derivadoa
        // Se llama a la expresion a la izquierda
        const oldValue = num;
        const leftValue = this.left.graficar("NodoExpresion" + oldValue, num + 1);
        resultado += leftValue.result;
        num = leftValue.val + 1;
        // Valores que van en el centro de la expresion
        if (this.tipo == TipoAritmetica.SUMA) {
            resultado += "NodoSuma" + (num) + "[label=\"+\"];\n";
            resultado += "NodoExpresion" + (oldValue) + " -> " + "NodoSuma" + (num) + ";\n";
        }
        else if (this.tipo == TipoAritmetica.RESTA) {
            resultado += "NodoResta" + (num) + "[label=\"-\"];\n";
            resultado += "NodoExpresion" + (oldValue) + " -> " + "NodoResta" + (num) + ";\n";
        }
        else if (this.tipo == TipoAritmetica.MULTIPLICACION) {
            resultado += "NodoMultiplicacion" + (num) + "[label=\"*\"];\n";
            resultado += "NodoExpresion" + (oldValue) + " -> " + "NodoMultiplicacion" + (num) + ";\n";
        }
        else if (this.tipo == TipoAritmetica.DIVISION) {
            resultado += "NodoDivision" + (num) + "[label=\"/\"];\n";
            resultado += "NodoExpresion" + (oldValue) + " -> " + "NodoDivision" + (num) + ";\n";
        }
        else if (this.tipo == TipoAritmetica.POTENCIA) {
            resultado += "NodoPotencia" + (num) + "[label=\"^\"];\n";
            resultado += "NodoExpresion" + (oldValue) + " -> " + "NodoPotencia" + (num) + ";\n";
        }
        else if (this.tipo == TipoAritmetica.MODULO) {
            resultado += "NodoModulo" + (num) + "[label=\"%\"];\n";
            resultado += "NodoExpresion" + (oldValue) + " -> " + "NodoModulo" + (num) + ";\n";
        }
        // Para obtener la expresion del lado derecho y derivados
        // se llama a la expresion de la derecha
        const rightValue = this.right.graficar("NodoExpresion" + oldValue, num + 1);
        resultado += rightValue.result;
        num = rightValue.val + 1;
        return { "val": num, "result": resultado };
    }
    getTypeName(type) {
        if (type === 0) {
            return "ENTERO";
        }
        else if (type === 1) {
            return "DOUBLE";
        }
        else if (type === 2) {
            return "BOOLEAN";
        }
        else if (type === 3) {
            return "CHARACTER";
        }
        else if (type === 4) {
            return "STRING";
        }
        else {
            return "";
        }
    }
}
exports.Aritmetica = Aritmetica;
var TipoAritmetica;
(function (TipoAritmetica) {
    TipoAritmetica[TipoAritmetica["SUMA"] = 0] = "SUMA";
    TipoAritmetica[TipoAritmetica["RESTA"] = 1] = "RESTA";
    TipoAritmetica[TipoAritmetica["MULTIPLICACION"] = 2] = "MULTIPLICACION";
    TipoAritmetica[TipoAritmetica["DIVISION"] = 3] = "DIVISION";
    TipoAritmetica[TipoAritmetica["MODULO"] = 4] = "MODULO";
    TipoAritmetica[TipoAritmetica["POTENCIA"] = 5] = "POTENCIA";
})(TipoAritmetica = exports.TipoAritmetica || (exports.TipoAritmetica = {}));
