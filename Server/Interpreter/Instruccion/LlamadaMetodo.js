"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LlamadaMetodo = void 0;
const Error_1 = require("../Error/Error");
const Ambito_1 = require("../Extra/Ambito");
const ErrorList_1 = require("../StaticObjects/ErrorList");
const Instruccion_1 = require("./Instruccion");
class LlamadaMetodo extends Instruccion_1.Instruccion {
    constructor(id, params, line, column) {
        super(line, column);
        this.id = id;
        this.params = params;
    }
    execute(ambito) {
        const method = ambito.getMetodo(this.id);
        if (method != undefined) {
            if (this.params.length == method.param.length) {
                const nuevo_ambito = new Ambito_1.Ambito(ambito.getGlobal());
                for (const i in this.params) {
                    const value = this.params[i].execute(ambito);
                    const validez_parametro = method.param[i];
                    if (validez_parametro.type == value.type) {
                        nuevo_ambito.setVal(method.param[i].id, value.value, value.type, this.line, this.column);
                    }
                    else {
                        ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", `El tipo de dato del parametro no coincide.`));
                    }
                }
                method.statement.execute(nuevo_ambito);
            }
            else {
                ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", `Cantidad de Parametros Incorrecta`));
            }
        }
        else {
            ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", `Metodo ${this.id} no encontrado`));
        }
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "Instruccion" + num + ";\n";
        resultado += "Instruccion" + (num) + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoLlamadaMetodo" + num + ";\n";
        resultado += "NodoLlamadaMetodo" + (num) + "[label = \"Lllamada Metodo\"];\n";
        num++;
        const oldValue = num - 1;
        resultado += "NodoLlamadaMetodo" + oldValue + " -> " + "NodoIdLlamadaMetodo" + num + ";\n";
        resultado += "NodoIdLlamadaMetodo" + (num) + "[label = \"" + this.id + "\"];\n";
        num++;
        for (const exp of this.params) {
            const pr = exp.graficar("NodoLlamadaMetodo" + oldValue, num + 1);
            resultado += pr.result;
            num = pr.val + 1;
        }
        return { "val": num, "result": resultado };
    }
}
exports.LlamadaMetodo = LlamadaMetodo;
