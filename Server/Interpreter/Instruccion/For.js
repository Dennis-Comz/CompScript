"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.For = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const Ambito_1 = require("../Extra/Ambito");
const ErrorList_1 = require("../StaticObjects/ErrorList");
const Instruccion_1 = require("./Instruccion");
class For extends Instruccion_1.Instruccion {
    constructor(variable, condicion, paso, cuerpo, line, column) {
        super(line, column);
        this.variable = variable;
        this.condicion = condicion;
        this.paso = paso;
        this.cuerpo = cuerpo;
    }
    execute(ambito) {
        const nuevo_ambito = new Ambito_1.Ambito(ambito);
        this.variable.execute(nuevo_ambito);
        let condition = this.condicion.execute(nuevo_ambito);
        if (condition.type != Retorno_1.Type.BOOLEAN) {
            ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"));
        }
        while (condition.value) {
            const salida = this.cuerpo.execute(nuevo_ambito);
            if (salida != null && salida != undefined) {
                if (salida.type == "Break") {
                    break;
                }
                else if (salida.type == "Continue") {
                    this.paso.execute(nuevo_ambito);
                    condition = this.condicion.execute(nuevo_ambito);
                    continue;
                }
            }
            this.paso.execute(nuevo_ambito);
            condition = this.condicion.execute(nuevo_ambito);
        }
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "Instruccion" + num + ";\n";
        resultado += "Instruccion" + (num) + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoFor" + num + ";\n";
        resultado += "NodoFor" + num + "[label=\"For\"];\n";
        num++;
        const oldValue = num - 1;
        const vr = this.variable.graficar("NodoFor" + oldValue, num);
        resultado += vr.result;
        num = vr.val + 1;
        resultado += "NodoFor" + oldValue + " -> " + "NodoExpresionFor" + num + ";\n";
        resultado += "NodoExpresionFor" + num + "[label=\"Expresion\"];\n";
        const cn = this.condicion.graficar("NodoExpresionFor" + num, num + 1);
        resultado += cn.result;
        num = cn.val + 1;
        const p = this.paso.graficar("NodoFor" + oldValue, num + 1);
        resultado += p.result;
        num = p.val + 1;
        const cp = this.cuerpo.graficar("NodoFor" + oldValue, num + 1);
        resultado += cp.result;
        num = cp.val + 1;
        return { "val": num, "result": resultado };
    }
}
exports.For = For;
