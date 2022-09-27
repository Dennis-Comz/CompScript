import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Instruccion } from "./Instruccion";

export class Do_While extends Instruccion{
    constructor(private cuerpo:Instruccion, private condicion:Expresion, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        let value = this.condicion.execute(ambito)
        if (value.type != Type.BOOLEAN) {
            ErrorList.addError(new Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"))
        }
        do {
            const salida = this.cuerpo.execute(ambito)
            if (salida != null && salida != undefined) {
                if (salida.type == "Break") {
                    break
                }else if(salida.type == "Continue"){
                    continue
                }
            }
            value = this.condicion.execute(ambito)
        } while (value.value);
    }

    public graficar(nodos: String, num: number):any {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoDoWhile"+num+";\n"
        resultado += "NodoDoWhile"+num+"[label=\"Do_While\"];\n"
        num++
        const oldValue = num-1
        resultado += "NodoDoWhile"+oldValue+" -> "+"NodoInstruccionDoWhile"+num+";\n"
        resultado += "NodoInstruccionDoWhile"+num+"[label=\"Instruccion\"];\n"
        const val = this.cuerpo.graficar("NodoInstruccionDoWhile"+num, num+1)
        resultado += val.result
        num = val.val + 1
        resultado += "NodoDoWhile"+oldValue+" -> "+"NodoExpresionDoWhile"+num+";\n"
        resultado += "NodoExpresionDoWhile"+num+"[label=\"Expresion\"];\n"
        const val2 = this.condicion.graficar("NodoExpresionDoWhile"+num, num+1)
        resultado += val2.result
        num = val2.val +1
        return {"val": num, "result": resultado}
    }

}