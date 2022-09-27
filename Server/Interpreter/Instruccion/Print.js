"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Print = void 0;
const Instruccion_1 = require("./Instruccion");
const CadenaEstatica_1 = require("../StaticObjects/CadenaEstatica");
class Print extends Instruccion_1.Instruccion {
    constructor(value, line, column) {
        super(line, column);
        this.value = value;
    }
    execute(ambito) {
        const val = this.value.execute(ambito);
        const salto = /\\n/gi;
        const barraInvertida = /\\\\/gi;
        const comillasDobles = /\\\"/gi;
        const tabulacion = /\\t/gi;
        const comillasSimples = /\\\'/gi;
        if (val.value.search(salto) != -1) {
            const cadena = this.examinar_cadena(salto, "\n", val.value);
            CadenaEstatica_1.CadenaEstatica.agregarValor(cadena);
        }
        else if (val.value.search(barraInvertida) != -1) {
            const cadena = this.examinar_cadena(barraInvertida, "\\", val.value);
            CadenaEstatica_1.CadenaEstatica.agregarValor(cadena);
        }
        else if (val.value.search(comillasDobles) != -1) {
            const cadena = this.examinar_cadena(comillasDobles, "\"", val.value);
            CadenaEstatica_1.CadenaEstatica.agregarValor(cadena);
        }
        else if (val.value.search(tabulacion) != -1) {
            const cadena = this.examinar_cadena(tabulacion, "\t", val.value);
            CadenaEstatica_1.CadenaEstatica.agregarValor(cadena);
        }
        else if (val.value.search(comillasSimples) != -1) {
            const cadena = this.examinar_cadena(comillasSimples, "\'", val.value);
            CadenaEstatica_1.CadenaEstatica.agregarValor(cadena);
        }
        else {
            CadenaEstatica_1.CadenaEstatica.agregarValor(val.value);
        }
    }
    examinar_cadena(regex, caracter, cadena) {
        const index = cadena.replace(regex, caracter);
        return index;
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> Instruccion" + num + ";\n";
        resultado += "Instruccion" + (num) + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoPrint" + num + ";\n";
        resultado += "NodoPrint" + (num) + "[label = \"Print\"];\n";
        const valor = this.value.graficar("NodoPrint" + (num), num);
        num = valor.val;
        resultado += valor.result;
        return { "val": num, "result": resultado };
    }
}
exports.Print = Print;
