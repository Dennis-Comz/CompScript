export enum Type{
    ENTERO = 0,
    DOBLE = 1,
    BOOLEAN = 2,
    CARACTER = 3,
    CADENA = 4,
    ERROR = 5
}

export type Retorno = {
    value: any,
    type: any
}

// Tabla de tipos para la suma
// [[][][][][]]
export const tiposSuma = [
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
export const tiposResta = [
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
export const tiposMultiplicacion = [
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
export const tiposDivison = [
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
export const tiposPotencia = [
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
export const tiposModulo = [
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