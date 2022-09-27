"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Case = void 0;
const Instruccion_1 = require("./Instruccion");
class Case extends Instruccion_1.Instruccion {
    constructor(value, code, line, column) {
        super(line, column);
        this.value = value;
        this.code = code;
    }
    execute(ambito) {
        for (const inst of this.code) {
            try {
                const retorno = inst.execute(ambito);
                if (retorno != null && retorno != undefined) {
                    return retorno;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    getValue() {
        return this.value;
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "Instruccion" + num + ";\n";
        resultado += "Instruccion" + (num) + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoCase" + num + ";\n";
        resultado += "NodoCase" + (num) + "[label = \"Case\"];\n";
        num++;
        resultado += "NodoCase" + (num - 1) + " -> " + "NodoExpresionCase" + num + ";\n";
        resultado += "NodoExpresionCase" + (num) + "[label = \"Expresion\"];\n";
        let oldValue = num - 1;
        const rs = this.value.graficar("NodoExpresionCase" + num, num);
        resultado += rs.result;
        num = rs.val + 1;
        for (const inst of this.code) {
            try {
                const retorno = inst.graficar("NodoCase" + oldValue, num + 1);
                resultado += retorno.result;
                num = retorno.val + 1;
            }
            catch (error) {
                console.log(error);
            }
        }
        return { "val": num, "result": resultado };
    }
}
exports.Case = Case;
