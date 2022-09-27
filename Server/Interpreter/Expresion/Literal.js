"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLiteral = exports.Literal = void 0;
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Literal extends Expresion_1.Expresion {
    constructor(value, tipo, line, column) {
        super(line, column);
        this.value = value;
        this.tipo = tipo;
    }
    execute(ambito) {
        if (this.tipo == TipoLiteral.ENTERO) {
            return { value: parseInt(this.value), type: Retorno_1.Type.ENTERO };
        }
        else if (this.tipo == TipoLiteral.DOBLE) {
            return { value: parseFloat(this.value), type: Retorno_1.Type.DOBLE };
        }
        else if (this.tipo == TipoLiteral.CADENA) {
            return { value: this.value.toString(), type: Retorno_1.Type.CADENA };
        }
        else if (this.tipo == TipoLiteral.CARACTER) {
            return { value: this.value.charCodeAt(0), type: Retorno_1.Type.CARACTER };
        }
        else if (this.tipo == TipoLiteral.BOOLEAN) {
            if (this.value.toString().toLowerCase() == 'true') {
                return { value: true, type: Retorno_1.Type.BOOLEAN };
            }
            return { value: false, type: Retorno_1.Type.BOOLEAN };
        }
    }
    graficar(nodo, num) {
        num++;
        let resultado = nodo + " -> " + "NodoLiteral" + (num) + ";\n";
        resultado += "NodoLiteral" + num + "[label=\"Literal\"];\n";
        num++;
        resultado += "NodoLiteralValor" + num + "[label=\"" + this.value + "\"];\n";
        resultado += "NodoLiteral" + (num - 1) + " -> NodoLiteralValor" + num + ";\n";
        return { "val": num, "result": resultado };
    }
}
exports.Literal = Literal;
var TipoLiteral;
(function (TipoLiteral) {
    TipoLiteral[TipoLiteral["ENTERO"] = 0] = "ENTERO";
    TipoLiteral[TipoLiteral["DOBLE"] = 1] = "DOBLE";
    TipoLiteral[TipoLiteral["BOOLEAN"] = 2] = "BOOLEAN";
    TipoLiteral[TipoLiteral["CARACTER"] = 3] = "CARACTER";
    TipoLiteral[TipoLiteral["CADENA"] = 4] = "CADENA";
})(TipoLiteral = exports.TipoLiteral || (exports.TipoLiteral = {}));
