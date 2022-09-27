"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tiposModulo = exports.tiposPotencia = exports.tiposDivison = exports.tiposMultiplicacion = exports.tiposResta = exports.tiposSuma = exports.Type = void 0;
var Type;
(function (Type) {
    Type[Type["ENTERO"] = 0] = "ENTERO";
    Type[Type["DOBLE"] = 1] = "DOBLE";
    Type[Type["BOOLEAN"] = 2] = "BOOLEAN";
    Type[Type["CARACTER"] = 3] = "CARACTER";
    Type[Type["CADENA"] = 4] = "CADENA";
    Type[Type["ERROR"] = 5] = "ERROR";
})(Type = exports.Type || (exports.Type = {}));
// Tabla de tipos para la suma
// [[][][][][]]
exports.tiposSuma = [
    [
        Type.ENTERO, Type.DOBLE, Type.ENTERO, Type.ENTERO, Type.CADENA
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.CADENA
    ],
    [
        Type.ENTERO, Type.DOBLE, Type.ERROR, Type.ERROR, Type.CADENA
    ],
    [
        Type.ENTERO, Type.DOBLE, Type.ERROR, Type.CADENA, Type.CADENA
    ],
    [
        Type.CADENA, Type.CADENA, Type.CADENA, Type.CADENA, Type.CADENA
    ]
];
// Tabla de tipos para la resta
exports.tiposResta = [
    [
        Type.ENTERO, Type.DOBLE, Type.ENTERO, Type.ENTERO, Type.ERROR
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.DOBLE, Type.ERROR
    ],
    [
        Type.ENTERO, Type.DOBLE, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ENTERO, Type.DOBLE, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ]
];
// Tabla de tipos para la multiplicacion
exports.tiposMultiplicacion = [
    [
        Type.ENTERO, Type.DOBLE, Type.ERROR, Type.ENTERO, Type.ERROR
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.ERROR, Type.DOBLE, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ENTERO, Type.DOBLE, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ]
];
// Tabla de tipos para la division
exports.tiposDivison = [
    [
        Type.DOBLE, Type.DOBLE, Type.ERROR, Type.DOBLE, Type.ERROR
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.ERROR, Type.DOBLE, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ]
];
// Tabla de tipos para la potencia
exports.tiposPotencia = [
    [
        Type.ENTERO, Type.DOBLE, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ]
];
// Tabla de tipos para la modulo
exports.tiposModulo = [
    [
        Type.DOBLE, Type.DOBLE, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.DOBLE, Type.DOBLE, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ],
    [
        Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR, Type.ERROR
    ]
];
