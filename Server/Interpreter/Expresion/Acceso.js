"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Acceso = void 0;
const Error_1 = require("../Error/Error");
const ErrorList_1 = require("../StaticObjects/ErrorList");
const Expresion_1 = require("./Expresion");
class Acceso extends Expresion_1.Expresion {
    constructor(id, line, column) {
        super(line, column);
        this.id = id;
    }
    execute(ambito) {
        const value = ambito.getVal(this.id);
        if (value != null) {
            return { value: value.valor, type: value.type };
        }
        ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, 'Semantico', `No se encuentra la variable ${this.id}`));
    }
    graficar(nodo, num) {
        num++;
        let resultado = nodo + " -> " + "NodoAcceso" + num + ";\n";
        resultado += "NodoAcceso" + num + "[label=\"Acceso\"];\n";
        num++;
        resultado += "NodoAcceso" + (num - 1) + " -> " + "NodoAccesoID" + num + ";\n";
        resultado += "NodoAccesoID" + num + "[label=\"" + this.id + "\"];\n";
        return { "val": num, "result": resultado };
    }
}
exports.Acceso = Acceso;
