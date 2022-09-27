import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Break extends Instruccion{
    constructor(line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        return{type: "Break", line:this.line,column:this.column}
    }

    public graficar(nodos: String, num: number):any {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+num+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoBreak"+num+";\n"
        resultado += "NodoBreak"+num+"[label=\"break\"];\n"

        return {"val": num, "result": resultado}
    }
}