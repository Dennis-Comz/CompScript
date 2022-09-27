import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Case extends Instruccion{
    constructor(private value:Expresion, private code:Instruccion[], line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        for (const inst of this.code) {
            try {
                const retorno = inst.execute(ambito)
                if (retorno != null && retorno != undefined) {
                    return retorno
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    public getValue():Expresion{
        return this.value;
    }

    public graficar(nodos: String, num: number):any {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoCase"+num+";\n"
        resultado += "NodoCase"+(num)+"[label = \"Case\"];\n"
        num++
        resultado += "NodoCase"+(num-1)+" -> "+"NodoExpresionCase"+num+";\n"
        resultado += "NodoExpresionCase"+(num)+"[label = \"Expresion\"];\n"
        let oldValue = num-1
        const rs = this.value.graficar("NodoExpresionCase"+num, num)
        resultado += rs.result
        num = rs.val+1
        for (const inst of this.code) {
            try {
                const retorno = inst.graficar("NodoCase"+oldValue,num+1)
                resultado += retorno.result
                num = retorno.val+1
            } catch (error) {
                console.log(error)
            }
        }
        return {"val": num, "result": resultado}
    }
}