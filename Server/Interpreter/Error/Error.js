"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Error_ = void 0;
class Error_ {
    constructor(line, column, tipo, mensaje) {
        this.line = line;
        this.column = column;
        this.tipo = tipo;
        this.mensaje = mensaje;
    }
}
exports.Error_ = Error_;
