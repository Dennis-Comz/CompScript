"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CadenaEstatica = void 0;
class CadenaEstatica {
    static agregarValor(val) {
        this.cadena += val;
    }
}
exports.CadenaEstatica = CadenaEstatica;
// Variable
CadenaEstatica.cadena = "";
