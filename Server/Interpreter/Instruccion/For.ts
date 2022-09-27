import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Declaracion } from "./Declaracion";
import { Instruccion } from "./Instruccion";

export class For extends Instruccion{
    constructor(private variable: Declaracion,private condicion:Expresion, private paso:Declaracion, private cuerpo:Instruccion,line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const nuevo_ambito = new Ambito(ambito)

        this.variable.execute(nuevo_ambito)
        
        let condition = this.condicion.execute(nuevo_ambito)
        if (condition.type != Type.BOOLEAN) {
            ErrorList.addError(new Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"))
        }
        while (condition.value) {
            const salida = this.cuerpo.execute(nuevo_ambito)
            if (salida != null && salida != undefined) {
                if (salida.type == "Break") {
                    break
                }else if(salida.type == "Continue"){
                    this.paso.execute(nuevo_ambito)
                    condition = this.condicion.execute(nuevo_ambito)
                    continue
                }
            }
            this.paso.execute(nuevo_ambito)
            condition = this.condicion.execute(nuevo_ambito)
        }
    }

    public graficar(nodos: String, num: number):any {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoFor"+num+";\n"
        resultado += "NodoFor"+num+"[label=\"For\"];\n"
        num++
        const oldValue = num-1
        const vr = this.variable.graficar("NodoFor"+oldValue, num)
        resultado += vr.result
        num = vr.val + 1
        resultado += "NodoFor"+oldValue+" -> "+"NodoExpresionFor"+num+";\n"
        resultado += "NodoExpresionFor"+num+"[label=\"Expresion\"];\n"
        const cn = this.condicion.graficar("NodoExpresionFor"+num, num+1)
        resultado += cn.result
        num = cn.val + 1
        const p = this.paso.graficar("NodoFor"+oldValue, num+1)
        resultado += p.result
        num = p.val + 1
        const cp = this.cuerpo.graficar("NodoFor"+oldValue, num+1)
        resultado += cp.result
        num = cp.val + 1
        return {"val": num, "result": resultado}
    }

}