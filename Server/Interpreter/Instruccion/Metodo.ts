import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";
import { Statement } from "./Statement";

export class Metodo extends Instruccion{
    constructor(public id:string, public statement:Statement, public param:Array<Parametro>, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        ambito.guardarMetodo(this.id, this)
    }

    public graficar(nodos: String, num: number) {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoMetodo"+num+";\n"
        resultado += "NodoMetodo"+(num)+"[label = \"Metodo\"];\n"
        num++
        const oldValue = num-1
        resultado += "NodoMetodo"+oldValue+" -> "+"NodoIdMetodo"+num+";\n"
        resultado += "NodoIdMetodo"+(num)+"[label = \""+this.id+"\"];\n"
        num++
        resultado += "NodoMetodo"+oldValue+" -> "+"NodoParametrosMetodo"+num+";\n"
        resultado += "NodoParametrosMetodo"+(num)+"[label = \"Parametros\"];\n"
        num++
        const pvalor = num - 1
        for (const par of this.param) {
            resultado += "NodoParametrosMetodo"+pvalor+" -> "+"NodoParamType"+num+";\n"
            resultado += "NodoParamType"+(num)+"[label = \""+this.getTypeName(par.type)+"\"];\n"
            num++
            resultado += "NodoParametrosMetodo"+pvalor+" -> "+"NodoParamId"+num+";\n"
            resultado += "NodoParamId"+(num)+"[label = \""+par.id+"\"];\n"
            num++
        }
        const st = this.statement.graficar("NodoMetodo"+oldValue, num+1)
        resultado += st.result
        num = st.val + 1

        return {"val": num, "result": resultado}
    }

    public getTypeName(type: number):string{
        if (type === 0) {
            return "int"
        }else if(type === 1){
            return "double"
        }else if(type === 2){
            return "boolean"
        }else if(type === 3){
            return "char"
        }else if(type === 4){
            return "string"
        }else{
            return "";
        }
    }

}

export class Parametro{
    public id:string
    public type:number
    constructor(id:string, type:number){
        this.id = id
        this.type = type
    }
}