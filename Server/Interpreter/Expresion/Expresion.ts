import { Ambito } from "../Extra/Ambito";
import { tiposSuma, tiposResta, tiposDivison, tiposMultiplicacion } from "./Retorno";
import { tiposModulo, tiposPotencia, Type, Retorno } from "./Retorno";

export abstract class Expresion{
    public line: number;
    public column: number;
    constructor(line: number, column: number){
        this.line = line
        this.column = column
    }

    public abstract execute(ambito:Ambito):Retorno|any;

    public abstract graficar(nodo:string,num:number):any;

    public tipoDominanteSuma(tipo1: Type, tipo2: Type): Type{
        return tiposSuma[tipo1][tipo2];
    }

    public tipoDominanteResta(tipo1: Type, tipo2: Type): Type{
        return tiposResta[tipo1][tipo2];
    }
    
    public tipoDominanteDivision(tipo1: Type, tipo2: Type): Type{
        return tiposDivison[tipo1][tipo2];
    }
    
    public tipoDominanteMulti(tipo1: Type, tipo2: Type): Type{
        return tiposMultiplicacion[tipo1][tipo2];
    }
    
    public tipoDominanteModulo(tipo1: Type, tipo2: Type): Type{
        return tiposModulo[tipo1][tipo2];
    }
    
    public tipoDominantePotencia(tipo1: Type, tipo2: Type): Type{
        return tiposPotencia[tipo1][tipo2];
    }
}