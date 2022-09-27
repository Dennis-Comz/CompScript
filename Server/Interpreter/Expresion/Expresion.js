"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Expresion = void 0;
const Retorno_1 = require("./Retorno");
const Retorno_2 = require("./Retorno");
class Expresion {
    constructor(line, column) {
        this.line = line;
        this.column = column;
    }
    tipoDominanteSuma(tipo1, tipo2) {
        return Retorno_1.tiposSuma[tipo1][tipo2];
    }
    tipoDominanteResta(tipo1, tipo2) {
        return Retorno_1.tiposResta[tipo1][tipo2];
    }
    tipoDominanteDivision(tipo1, tipo2) {
        return Retorno_1.tiposDivison[tipo1][tipo2];
    }
    tipoDominanteMulti(tipo1, tipo2) {
        return Retorno_1.tiposMultiplicacion[tipo1][tipo2];
    }
    tipoDominanteModulo(tipo1, tipo2) {
        return Retorno_2.tiposModulo[tipo1][tipo2];
    }
    tipoDominantePotencia(tipo1, tipo2) {
        return Retorno_2.tiposPotencia[tipo1][tipo2];
    }
}
exports.Expresion = Expresion;
