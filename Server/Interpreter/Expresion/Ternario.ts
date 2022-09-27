import { Error_ } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Expresion } from "./Expresion";
import { Type } from "./Retorno";

export class Ternario extends Expresion{
    constructor(private condicion:Expresion, private segundo:Expresion, private tercero:Expresion, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const condition = this.condicion.execute(ambito)
        const second = this.segundo.execute(ambito)
        const third = this.tercero.execute(ambito)
        if (condition.type != Type.BOOLEAN) {
            ErrorList.addError(new Error_(this.line, this.column, "Semantico", "Condicion a evaluar no es booleana"))
        }
        if (condition.value) {
            return second
        }else{
            return third
        }
    }

    public graficar(nodo: string, num: number) {
        num++
        let resultao = nodo+" -> "+"NodoTernario"+num+";\n"
        resultao += "NodoTernario"+num+"[label=\"Operador Ternario\"];\n"
        const oldValue = num
        num++
        const cond = this.condicion.graficar("NodoTernario"+oldValue, num+1)
        resultao += cond.result
        num = cond.val + 1
        num++
        const seg = this.segundo.graficar("NodoTernario"+oldValue, num+1)
        resultao += seg.result
        num = seg.val + 1
        num++
        const ter = this.tercero.graficar("NodoTernario"+oldValue, num+1)
        resultao += ter.result
        num = ter.val + 1
        return {"val": num, "result": resultao}
    }
}