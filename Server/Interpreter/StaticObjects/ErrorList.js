"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorList = void 0;
class ErrorList {
    static addError(error) {
        if (error != null || error != undefined) {
            this.errores.push(error);
        }
    }
}
exports.ErrorList = ErrorList;
ErrorList.errores = [];
