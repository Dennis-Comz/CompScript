import { Ambito } from "../Extra/Ambito";

export abstract class Instruccion{
    public line: number;
    public column: number;
    constructor(line: number, column: number){
        this.line = line
        this.column = column
    }

    public abstract execute(ambito:Ambito):any;

    public abstract graficar(nodos:String, num:number):any;
}