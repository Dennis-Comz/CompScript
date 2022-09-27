"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Break = void 0;
const Instruccion_1 = require("./Instruccion");
class Break extends Instruccion_1.Instruccion {
    constructor(line, column) {
        super(line, column);
    }
    execute(ambito) {
        return { type: "Break", line: this.line, column: this.column };
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "Instruccion" + num + ";\n";
        resultado += "Instruccion" + num + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoBreak" + num + ";\n";
        resultado += "NodoBreak" + num + "[label=\"break\"];\n";
        return { "val": num, "result": resultado };
    }
}
exports.Break = Break;
