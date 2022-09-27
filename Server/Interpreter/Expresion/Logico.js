"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TipoLogica = exports.Logico = void 0;
const Error_1 = require("../Error/Error");
const ErrorList_1 = require("../StaticObjects/ErrorList");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Logico extends Expresion_1.Expresion {
    constructor(left, right, tipo, line, column) {
        super(line, column);
        this.left = left;
        this.right = right;
        this.tipo = tipo;
    }
    execute(ambito) {
        let leftValue;
        if (this.left != null) {
            leftValue = this.left.execute(ambito);
        }
        const rightValue = this.right.execute(ambito);
        if (((leftValue === null || leftValue === void 0 ? void 0 : leftValue.type) == Retorno_1.Type.BOOLEAN || (leftValue === null || leftValue === void 0 ? void 0 : leftValue.type) == null) && rightValue.type == Retorno_1.Type.BOOLEAN) {
            if (this.tipo == TipoLogica.AND) {
                const result = leftValue.value && rightValue.value;
                return { value: result, type: Retorno_1.Type.BOOLEAN };
            }
            else if (this.tipo == TipoLogica.OR) {
                const result = leftValue.value || rightValue.value;
                return { value: result, type: Retorno_1.Type.BOOLEAN };
            }
            else if (this.tipo == TipoLogica.NOT) {
                const result = !rightValue.value;
                return { value: result, type: Retorno_1.Type.BOOLEAN };
            }
        }
        else {
            ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, 'Semantico', "Las Expresiones a evaluar no son booleanas"));
        }
    }
    graficar(nodo, num) {
        num++;
        let resultado = nodo + " -> " + "NodoLogico" + num + ";\n";
        // Crear Nodo expresion que se conecta a el nodo pasado por parametro
        resultado += "NodoLogico" + num + "[label=\"Logico\"];\n";
        // expresion - expresion - expresion
        //               signo
        // Para obtener la expresion del lado izquierdo y todos sus derivadoa
        // Se llama a la expresion a la izquierda
        const oldValue = num;
        let leftValue;
        if (this.left != null) {
            leftValue = this.left.graficar("NodoLogico" + oldValue, num + 1);
            resultado += leftValue.result;
            num = leftValue.val + 1;
        }
        // Valores que van en el centro de la expresion
        if (this.tipo == TipoLogica.AND) {
            resultado += "NodoAnd" + num + "[label=\"&&\"];\n";
            resultado += "NodoLogico" + oldValue + " -> " + "NodoAnd" + num + ";\n";
        }
        else if (this.tipo == TipoLogica.OR) {
            resultado += "NodoOr" + num + "[label=\"||\"];\n";
            resultado += "NodoLogico" + oldValue + " -> " + "NodoOr" + num + ";\n";
        }
        else if (this.tipo == TipoLogica.NOT) {
            resultado += "NodoNot" + num + "[label=\"!\"];\n";
            resultado += "NodoLogico" + oldValue + " -> " + "NodoNot" + num + ";\n";
        }
        // Para obtener la expresion del lado derecho y derivados
        // se llama a la expresion de la derecha
        const rightValue = this.right.graficar("NodoLogico" + oldValue, num + 1);
        resultado += rightValue.result;
        num = rightValue.val + 1;
        return { "val": num, "result": resultado };
    }
}
exports.Logico = Logico;
var TipoLogica;
(function (TipoLogica) {
    TipoLogica[TipoLogica["AND"] = 0] = "AND";
    TipoLogica[TipoLogica["OR"] = 1] = "OR";
    TipoLogica[TipoLogica["NOT"] = 2] = "NOT";
})(TipoLogica = exports.TipoLogica || (exports.TipoLogica = {}));
