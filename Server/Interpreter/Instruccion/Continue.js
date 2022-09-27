"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Continue = void 0;
const Instruccion_1 = require("./Instruccion");
class Continue extends Instruccion_1.Instruccion {
    constructor(line, column) {
        super(line, column);
    }
    execute(ambito) {
        return { type: "Continue", line: this.line, column: this.column };
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "Instruccion" + num + ";\n";
        resultado += "Instruccion" + num + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoContinue" + num + ";\n";
        resultado += "NodoContinue" + num + "[label=\"continue\"];\n";
        return { "val": num, "result": resultado };
    }
}
exports.Continue = Continue;
