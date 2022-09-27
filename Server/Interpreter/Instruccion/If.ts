import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Instruccion } from "./Instruccion";

export class If extends Instruccion{
    constructor(private condicion:Expresion, private cuerpo: Instruccion, private Else:Instruccion, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const value = this.condicion.execute(ambito)

        if (value.type != Type.BOOLEAN) {
            ErrorList.addError(new Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"))
        }
        if (value.value) {
            return this.cuerpo.execute(ambito)
        }else if(this.Else != null){
            return this.Else.execute(ambito)
        }
    }

    public graficar(nodos: String, num: number):any {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoIf"+num+";\n"
        resultado += "NodoIf"+(num)+"[label = \"If\"];\n"
        num++
        const oldValue = num-1
        resultado += "NodoIf"+oldValue+" -> "+"NodoExpresionIf"+num+";\n"
        resultado += "NodoExpresionIf"+num+"[label=\"Expresion\"];\n"
        const cn = this.condicion.graficar("NodoExpresionIf"+num, num+1)
        resultado += cn.result
        num = cn.val + 1
        const cp = this.cuerpo.graficar("NodoIf"+oldValue, num+1)
        resultado += cp.result
        num = cp.val + 1
        if (this.Else != null) {
            resultado += "NodoIf"+oldValue+" -> "+"NodoElse"+num+";\n"
            resultado += "NodoElse"+num+"[label=\"Else\"];\n"
            const el = this.Else.graficar("NodoElse"+num, num+1)
            resultado += el.result
            num = el.val + 1
        }
        return {"val": num, "result": resultado}
    }


}