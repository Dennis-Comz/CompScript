"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Statement = void 0;
const Ambito_1 = require("../Extra/Ambito");
const Instruccion_1 = require("./Instruccion");
class Statement extends Instruccion_1.Instruccion {
    constructor(code, line, column) {
        super(line, column);
        this.code = code;
    }
    execute(ambito) {
        const nuevo_Ambito = new Ambito_1.Ambito(ambito);
        for (const inst of this.code) {
            try {
                const retorno = inst.execute(nuevo_Ambito);
                if (retorno != null && retorno != undefined) {
                    return retorno;
                }
            }
            catch (error) {
                console.log(error);
            }
        }
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "NodoStatement" + num + ";\n";
        resultado += "NodoStatement" + (num) + "[label=\"Statement\"];\n";
        num++;
        const oldValue = num - 1;
        for (const inst of this.code) {
            const c = inst.graficar("NodoStatement" + oldValue, num + 1);
            resultado += c.result;
            num = c.val + 1;
        }
        return { "val": num, "result": resultado };
    }
}
exports.Statement = Statement;
