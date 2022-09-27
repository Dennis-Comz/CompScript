import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Instruccion } from "./Instruccion";

export class LlamadaMetodo extends Instruccion{
    constructor(private id:string, private params:Array<Expresion>, line:number, column:number){
        super(line,column)
    }

    public execute(ambito: Ambito) {
        const method = ambito.getMetodo(this.id)
        if(method != undefined){
            if (this.params.length == method.param.length) {
                const nuevo_ambito = new Ambito(ambito.getGlobal())
                for (const i in this.params) {
                    const value = this.params[i].execute(ambito)
                    const validez_parametro = method.param[i]
                    if (validez_parametro.type == value.type) {
                        nuevo_ambito.setVal(method.param[i].id, value.value, value.type, this.line, this.column)                        
                    }else{
                        ErrorList.addError(new Error_(this.line, this.column, "Semantico", `El tipo de dato del parametro no coincide.` ))
                    }
                }
                method.statement.execute(nuevo_ambito)
            }else{
                ErrorList.addError(new Error_(this.line, this.column, "Semantico", `Cantidad de Parametros Incorrecta` ))
            }
        }else{
            ErrorList.addError(new Error_(this.line, this.column, "Semantico", `Metodo ${this.id} no encontrado` ))
        }
    }

    public graficar(nodos: String, num: number) {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoLlamadaMetodo"+num+";\n"
        resultado += "NodoLlamadaMetodo"+(num)+"[label = \"Lllamada Metodo\"];\n"
        num++
        const oldValue = num-1
        resultado += "NodoLlamadaMetodo"+oldValue+" -> "+"NodoIdLlamadaMetodo"+num+";\n"
        resultado += "NodoIdLlamadaMetodo"+(num)+"[label = \""+this.id+"\"];\n"
        num++
        for (const exp of this.params) {
            const pr = exp.graficar("NodoLlamadaMetodo"+oldValue, num+1)
            resultado += pr.result
            num = pr.val + 1    
        }

        return {"val": num, "result": resultado}
    }
}