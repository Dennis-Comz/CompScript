"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.If = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const ErrorList_1 = require("../StaticObjects/ErrorList");
const Instruccion_1 = require("./Instruccion");
class If extends Instruccion_1.Instruccion {
    constructor(condicion, cuerpo, Else, line, column) {
        super(line, column);
        this.condicion = condicion;
        this.cuerpo = cuerpo;
        this.Else = Else;
    }
    execute(ambito) {
        const value = this.condicion.execute(ambito);
        if (value.type != Retorno_1.Type.BOOLEAN) {
            ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"));
        }
        if (value.value) {
            return this.cuerpo.execute(ambito);
        }
        else if (this.Else != null) {
            return this.Else.execute(ambito);
        }
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "Instruccion" + num + ";\n";
        resultado += "Instruccion" + (num) + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoIf" + num + ";\n";
        resultado += "NodoIf" + (num) + "[label = \"If\"];\n";
        num++;
        const oldValue = num - 1;
        resultado += "NodoIf" + oldValue + " -> " + "NodoExpresionIf" + num + ";\n";
        resultado += "NodoExpresionIf" + num + "[label=\"Expresion\"];\n";
        const cn = this.condicion.graficar("NodoExpresionIf" + num, num + 1);
        resultado += cn.result;
        num = cn.val + 1;
        const cp = this.cuerpo.graficar("NodoIf" + oldValue, num + 1);
        resultado += cp.result;
        num = cp.val + 1;
        if (this.Else != null) {
            resultado += "NodoIf" + oldValue + " -> " + "NodoElse" + num + ";\n";
            resultado += "NodoElse" + num + "[label=\"Else\"];\n";
            const el = this.Else.graficar("NodoElse" + num, num + 1);
            resultado += el.result;
            num = el.val + 1;
        }
        return { "val": num, "result": resultado };
    }
}
exports.If = If;
