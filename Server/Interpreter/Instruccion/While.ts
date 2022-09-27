import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Instruccion } from "./Instruccion";

export class While extends Instruccion{
    constructor(private condicion:Expresion, private cuerpo: Instruccion, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        let value = this.condicion.execute(ambito)
        if (value.type != Type.BOOLEAN) {
            ErrorList.addError(new Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"))
        }
        while (value.value) {
            const salida = this.cuerpo.execute(ambito)
            if (salida != null && salida != undefined) {
                if (salida.type == "Break") {
                    break
                }else if(salida.type == "Continue"){
                    continue
                }
            }
            value = this.condicion.execute(ambito)
        }
    }

    // Para generar arbol
    public graficar(nodos: String, num: number):any {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoWhile"+num+";\n"
        resultado += "NodoWhile"+num+"[label=\"While\"];\n"
        num++
        const oldValue = num-1
        resultado += "NodoWhile"+oldValue+" -> "+"NodoExpresionWhile"+num+";\n"
        resultado += "NodoExpresionWhile"+num+"[label=\"Expresion\"];\n"
        const val2 = this.condicion.graficar("NodoExpresionWhile"+num, num+1)
        resultado += val2.result
        num = val2.val +1
        resultado += "NodoWhile"+oldValue+" -> "+"NodoInstruccionWhile"+num+";\n"
        resultado += "NodoInstruccionWhile"+num+"[label=\"Instruccion\"];\n"
        const val = this.cuerpo.graficar("NodoInstruccionWhile"+num, num+1)
        resultado += val.result
        num = val.val + 1
        return {"val": num, "result": resultado}
    }

}