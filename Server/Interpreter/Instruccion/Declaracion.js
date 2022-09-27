"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Declaracion = void 0;
const Error_1 = require("../Error/Error");
const Retorno_1 = require("../Expresion/Retorno");
const ErrorList_1 = require("../StaticObjects/ErrorList");
const Instruccion_1 = require("./Instruccion");
class Declaracion extends Instruccion_1.Instruccion {
    constructor(type, id, value, line, column) {
        super(line, column);
        this.type = type;
        this.id = id;
        this.value = value;
        if (this.type != null) {
            this.type = this.type.toLowerCase();
        }
    }
    execute(ambito) {
        let val;
        if (this.value != null) {
            val = this.value.execute(ambito);
        }
        for (const identificador of this.id) {
            if (val != null) {
                const tipoEntrada = this.getTypeName(val.type);
                if (this.type === "int" && val.type === Retorno_1.Type.ENTERO) {
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column);
                }
                else if (this.type === "double" && val.type === Retorno_1.Type.DOBLE) {
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column);
                }
                else if (this.type === "boolean" && val.type === Retorno_1.Type.BOOLEAN) {
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column);
                }
                else if (this.type === "string" && val.type === Retorno_1.Type.CADENA) {
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column);
                }
                else if (this.type === "char" && val.type === Retorno_1.Type.CARACTER) {
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column);
                }
                else if (this.type === null) {
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column);
                }
                else {
                    ErrorList_1.ErrorList.addError(new Error_1.Error_(this.line, this.column, "Semantico", this.type + " No puede tener valor de " + tipoEntrada));
                }
            }
            else {
                ambito.setVal(identificador, null, null, this.line, this.column);
            }
        }
    }
    graficar(nodos, num) {
        let resultado = nodos + " -> " + "Instruccion" + num + ";\n";
        resultado += "Instruccion" + (num) + "[label=\"Instruccion\"];\n";
        num++;
        resultado += "Instruccion" + (num - 1) + " -> " + "NodoDeclaracion" + num + ";\n";
        resultado += "NodoDeclaracion" + num + "[label=\"Declaracion\"];\n";
        num++;
        if (this.type != null) {
            resultado += "NodoDeclaracion" + (num - 1) + " -> NodoTipoDeclaracion" + num + ";\n";
            resultado += "NodoTipoDeclaracion" + num + "[label=\"" + this.type + "\"];\n";
        }
        const oldValue = num - 1;
        for (let index = 0; index < this.id.length; index++) {
            resultado += "NodoDeclaracion" + oldValue + " -> NodoIdDeclaracion" + num + ";\n";
            resultado += "NodoIdDeclaracion" + num + "[label=\"" + this.id[index] + "\"];\n";
            num++;
        }
        if (this.value != null) {
            const valor = this.value.graficar("NodoDeclaracion" + oldValue, num + 1);
            resultado += valor.result;
        }
        return { "val": num, "result": resultado };
    }
    getId() {
        return { identificador: this.id[0] };
    }
    getTypeName(type) {
        if (type === 0) {
            return "ENTERO";
        }
        else if (type === 1) {
            return "DOUBLE";
        }
        else if (type === 2) {
            return "BOOLEAN";
        }
        else if (type === 3) {
            return "CHARACTER";
        }
        else if (type === 4) {
            return "STRING";
        }
        else {
            return "";
        }
    }
}
exports.Declaracion = Declaracion;
