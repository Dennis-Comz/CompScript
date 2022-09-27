"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoRelacional = exports.Relacional = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Relacional extends Expresion_1.Expresion {
    constructor(left, right, tipo, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipo = tipo;
    }
    execute(ambito) {
        const leftValue = this.left.execute(ambito);
        const rightValue = this.right.execute(ambito);
        if (this.tipo == TipoRelacional.IGUALIGUAL) {
            const result = leftValue.value == rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.NO_IGUAL) {
            const result = leftValue.value != rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MAYOR) {
            const result = leftValue.value > rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MAYOR_IGUAL) {
            const result = leftValue.value >= rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MENOR) {
            const result = leftValue.value < rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
        else if (this.tipo == TipoRelacional.MENOR_IGUAL) {
            const result = leftValue.value <= rightValue.value;
            return { value: result, type: Retorno_1.Type.BOOLEAN };
        }
    }
    graficar(nodo, num) {
        num++;
        let resultado = nodo + " -> " + "NodoRelacional" + num + ";\n";
        // Crear Nodo expresion que se conecta a el nodo pasado por parametro
        resultado += "NodoRelacional" + num + "[label=\"Relacional\"];\n";
        // expresion - expresion - expresion
        //               signo
        // Para obtener la expresion del lado izquierdo y todos sus derivadoa
        // Se llama a la expresion a la izquierda
        const oldValue = num;
        num++;
        const leftValue = this.left.graficar("NodoRelacional" + oldValue, num + 1);
        resultado += leftValue.result;
        num = leftValue.val + 1;
        if (this.tipo == TipoRelacional.IGUALIGUAL) {
            resultado += "NodoIgualIgual" + num + "[label=\"==\"];\n";
            resultado += "NodoRelacional" + oldValue + " -> " + "NodoIgualIgual" + num + ";\n";
        }
        else if (this.tipo == TipoRelacional.NO_IGUAL) {
            resultado += "NodoNoIgual" + num + "[label=\"!=\"];\n";
            resultado += "NodoRelacional" + oldValue + " -> " + "NodoNoIgual" + num + ";\n";
        }
        else if (this.tipo == TipoRelacional.MAYOR) {
            resultado += "NodoMayor" + num + "[label=\">\"];\n";
            resultado += "NodoRelacional" + oldValue + " -> " + "NodoMayor" + num + ";\n";
        }
        else if (this.tipo == TipoRelacional.MAYOR_IGUAL) {
            resultado += "NodoMayorIgual" + num + "[label=\">=\"];\n";
            resultado += "NodoRelacional" + oldValue + " -> " + "NodoMayorIgual" + num + ";\n";
        }
        else if (this.tipo == TipoRelacional.MENOR) {
            resultado += "NodoMenor" + num + "[label=\"<\"];\n";
            resultado += "NodoRelacional" + oldValue + " -> " + "NodoMenor" + num + ";\n";
        }
        else if (this.tipo == TipoRelacional.MENOR_IGUAL) {
            resultado += "NodoMenorIgual" + num + "[label=\"<=\"];\n";
            resultado += "NodoRelacional" + oldValue + " -> " + "NodoMenorIgual" + num + ";\n";
        }
        // Para obtener la expresion del lado derecho y derivados
        // se llama a la expresion de la derecha
        const rightValue = this.right.graficar("NodoRelacional" + oldValue, num + 1);
        resultado += rightValue.result;
        num = rightValue.val + 1;
        return { "val": num, "result": resultado };
    }
}
exports.Relacional = Relacional;
var TipoRelacional;
(function (TipoRelacional) {
    TipoRelacional[TipoRelacional["IGUALIGUAL"] = 0] = "IGUALIGUAL";
    TipoRelacional[TipoRelacional["NO_IGUAL"] = 1] = "NO_IGUAL";
    TipoRelacional[TipoRelacional["MAYOR"] = 2] = "MAYOR";
    TipoRelacional[TipoRelacional["MAYOR_IGUAL"] = 3] = "MAYOR_IGUAL";
    TipoRelacional[TipoRelacional["MENOR"] = 4] = "MENOR";
    TipoRelacional[TipoRelacional["MENOR_IGUAL"] = 5] = "MENOR_IGUAL";
})(TipoRelacional = exports.TipoRelacional || (exports.TipoRelacional = {}));
