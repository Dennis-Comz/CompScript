"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.While = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const ErrorList_1 = require("../StaticObjects/ErrorList");
const Instruccion_1 = require("./Instruccion");
class While extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
    }
    execute(ambito) {
        let value = this.condicion.execute(ambito);
        if (value.type != Retorno_1.Type.BOOLEAN) {
            ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"));
        }
        while (value.value) {
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
        }
    }
    // Para generar arbol
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "Instruccion" + num + ";\n";
        resultado += "Instruccion" + (num) + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoWhile" + num + ";\n";
        resultado += "NodoWhile" + num + "[label=\"While\"];\n";
        num++;
        const oldValue = num - 1;
        resultado += "NodoWhile" + oldValue + " -> " + "NodoExpresionWhile" + num + ";\n";
        resultado += "NodoExpresionWhile" + num + "[label=\"Expresion\"];\n";
        const val2 = this.condicion.graficar("NodoExpresionWhile" + num, num + 1);
        resultado += val2.result;
        num = val2.val + 1;
        resultado += "NodoWhile" + oldValue + " -> " + "NodoInstruccionWhile" + num + ";\n";
        resultado += "NodoInstruccionWhile" + num + "[label=\"Instruccion\"];\n";
        const val = this.cuerpo.graficar("NodoInstruccionWhile" + num, num + 1);
        resultado += val.result;
        num = val.val + 1;
        return { "val": num, "result": resultado };
    }
}
exports.While = While;
