"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Do_While = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const ErrorList_1 = require("../StaticObjects/ErrorList");
const Instruccion_1 = require("./Instruccion");
class Do_While extends Instruccion_1.Instruccion {
    constructor(cuerpo, condicion, line, column) {
        super(line, column);
        this.cuerpo = cuerpo;
        this.condicion = condicion;
    }
    execute(ambito) {
        let value = this.condicion.execute(ambito);
        if (value.type != Retorno_1.Type.BOOLEAN) {
            ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"));
        }
        do {
            const salida = this.cuerpo.execute(ambito);
            if (salida != null && salida != undefined) {
                if (salida.type == "Break") {
                    break;
                }
                else if (salida.type == "Continue") {
                    continue;
                }
            }
            value = this.condicion.execute(ambito);
        } while (value.value);
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "Instruccion" + num + ";\n";
        resultado += "Instruccion" + (num) + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoDoWhile" + num + ";\n";
        resultado += "NodoDoWhile" + num + "[label=\"Do_While\"];\n";
        num++;
        const oldValue = num - 1;
        resultado += "NodoDoWhile" + oldValue + " -> " + "NodoInstruccionDoWhile" + num + ";\n";
        resultado += "NodoInstruccionDoWhile" + num + "[label=\"Instruccion\"];\n";
        const val = this.cuerpo.graficar("NodoInstruccionDoWhile" + num, num + 1);
        resultado += val.result;
        num = val.val + 1;
        resultado += "NodoDoWhile" + oldValue + " -> " + "NodoExpresionDoWhile" + num + ";\n";
        resultado += "NodoExpresionDoWhile" + num + "[label=\"Expresion\"];\n";
        const val2 = this.condicion.graficar("NodoExpresionDoWhile" + num, num + 1);
        resultado += val2.result;
        num = val2.val + 1;
        return { "val": num, "result": resultado };
    }
}
exports.Do_While = Do_While;
