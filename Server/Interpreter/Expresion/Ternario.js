"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ternario = void 0;
const Error_1 = require("../Error/Error");
const ErrorList_1 = require("../StaticObjects/ErrorList");
const Expresion_1 = require("./Expresion");
const Retorno_1 = require("./Retorno");
class Ternario extends Expresion_1.Expresion {
    constructor(condicion, segundo, tercero, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.segundo = segundo;
        this.tercero = tercero;
    }
    execute(ambito) {
        const condition = this.condicion.execute(ambito);
        const second = this.segundo.execute(ambito);
        const third = this.tercero.execute(ambito);
        if (condition.type != Retorno_1.Type.BOOLEAN) {
            ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"));
        }
        if (condition.value) {
            return second;
        }
        else {
            return third;
        }
    }
    graficar(nodo, num) {
        num++;
        let resultao = nodo + " -> " + "NodoTernario" + num + ";\n";
        resultao += "NodoTernario" + num + "[label=\"Operador Ternario\"];\n";
        const oldValue = num;
        num++;
        const cond = this.condicion.graficar("NodoTernario" + oldValue, num + 1);
        resultao += cond.result;
        num = cond.val + 1;
        num++;
        const seg = this.segundo.graficar("NodoTernario" + oldValue, num + 1);
        resultao += seg.result;
        num = seg.val + 1;
        num++;
        const ter = this.tercero.graficar("NodoTernario" + oldValue, num + 1);
        resultao += ter.result;
        num = ter.val + 1;
        return { "val": num, "result": resultao };
    }
}
exports.Ternario = Ternario;
