import { Error_ } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Expresion } from "./Expresion";
import { Retorno } from "./Retorno";

export class Acceso extends Expresion{
    constructor(private id:string, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito):Retorno|any {
        const value = ambito.getVal(this.id)
        if (value != null) {
            return {value: value.valor, type:value.type}
        }
        ErrorList.addError(new Error_(this.line, this.column, 'Semantico', `No se encuentra la variable ${this.id}`))
    }

    public graficar(nodo:string,num:number):any {
        num++;
        let resultado = nodo+" -> "+"NodoAcceso"+num+";\n"
        resultado += "NodoAcceso"+num+"[label=\"Acceso\"];\n"
        num++
        resultado += "NodoAcceso"+(num-1)+" -> "+"NodoAccesoID"+num+";\n"
        resultado += "NodoAccesoID"+num+"[label=\""+this.id+"\"];\n"
        return {"val":num, "result":resultado}
    }
}