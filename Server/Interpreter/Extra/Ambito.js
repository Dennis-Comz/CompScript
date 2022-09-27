"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ambito = void 0;
const Error_1 = require("../Error/Error");
const Simbolo_1 = require("./Simbolo");
class Ambito {
    constructor(anterior) {
        this.anterior = anterior;
        this.variables = new Map();
        this.metodos = new Map();
    }
    setVal(id, value, type, line, column) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                const val = env.variables.get(id);
                if (val != undefined) {
                    if (val.type == type || val.type == null) {
                        env.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
                    }
                    else if (type == 0 && val.type == 1) {
                        env.variables.set(id, new Simbolo_1.Simbolo(Math.ceil(value), id, type));
                    }
                    else if (type == 1 && val.type == 0) {
                        env.variables.set(id, new Simbolo_1.Simbolo(parseFloat(value), id, type));
                    }
                    else {
                        throw new Error_1.Error_(line, column, 'Semantico', 'No se puede asignar: ' + type + ' _ ' + val.type);
                    }
                }
            }
            env = env.anterior;
        }
        this.variables.set(id, new Simbolo_1.Simbolo(value, id, type));
    }
    getVal(id) {
        let env = this;
        while (env != null) {
            if (env.variables.has(id)) {
                return env.variables.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    guardarMetodo(id, metodo) {
        this.metodos.set(id, metodo);
    }
    getMetodo(id) {
        let env = this;
        while (env != null) {
            if (env.metodos.has(id)) {
                return env.metodos.get(id);
            }
            env = env.anterior;
        }
        return undefined;
    }
    getGlobal() {
        let env = this;
        while ((env === null || env === void 0 ? void 0 : env.anterior) != null) {
            env = env.anterior;
        }
        return env;
    }
}
exports.Ambito = Ambito;
