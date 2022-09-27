import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";

export class Relacional extends Expresion {
    constructor(private left: Expresion, private right: Expresion, private tipo: TipoRelacional, line: number, column: number) {
        super(line, column);
    }
    public execute(ambito:Ambito): Retorno|any {
        const leftValue = this.left.execute(ambito)
        const rightValue = this.right.execute(ambito)

        if (this.tipo == TipoRelacional.IGUALIGUAL) {
            const result = leftValue.value == rightValue.value
            return { value: result, type: Type.BOOLEAN }
        } else if (this.tipo == TipoRelacional.NO_IGUAL) {
            const result = leftValue.value != rightValue.value
            return { value: result, type: Type.BOOLEAN }
        } else if (this.tipo == TipoRelacional.MAYOR) {
            const result = leftValue.value > rightValue.value
            return { value: result, type: Type.BOOLEAN }
        } else if (this.tipo == TipoRelacional.MAYOR_IGUAL) {
            const result = leftValue.value >= rightValue.value
            return { value: result, type: Type.BOOLEAN }
        } else if (this.tipo == TipoRelacional.MENOR) {
            const result = leftValue.value < rightValue.value
            return { value: result, type: Type.BOOLEAN }
        } else if (this.tipo == TipoRelacional.MENOR_IGUAL) {
            const result = leftValue.value <= rightValue.value
            return { value: result, type: Type.BOOLEAN }
        }
    }

    public graficar(nodo:string,num:number):any {
        num++
        let resultado = nodo+" -> "+"NodoRelacional"+num+";\n"
        // Crear Nodo expresion que se conecta a el nodo pasado por parametro
        resultado += "NodoRelacional"+num+"[label=\"Relacional\"];\n"
        // expresion - expresion - expresion
        //               signo
        // Para obtener la expresion del lado izquierdo y todos sus derivadoa
        // Se llama a la expresion a la izquierda
        const oldValue = num
        num++
        const leftValue = this.left.graficar("NodoRelacional"+oldValue, num+1)
        resultado += leftValue.result
        num = leftValue.val +1

        if (this.tipo == TipoRelacional.IGUALIGUAL) {
            resultado += "NodoIgualIgual"+num+"[label=\"==\"];\n"
            resultado += "NodoRelacional"+oldValue+" -> "+"NodoIgualIgual"+num+";\n"
        } else if (this.tipo == TipoRelacional.NO_IGUAL) {
            resultado += "NodoNoIgual"+num+"[label=\"!=\"];\n"
            resultado += "NodoRelacional"+oldValue+" -> "+"NodoNoIgual"+num+";\n"
        } else if (this.tipo == TipoRelacional.MAYOR) {
            resultado += "NodoMayor"+num+"[label=\">\"];\n"
            resultado += "NodoRelacional"+oldValue+" -> "+"NodoMayor"+num+";\n"
        } else if (this.tipo == TipoRelacional.MAYOR_IGUAL) {
            resultado += "NodoMayorIgual"+num+"[label=\">=\"];\n"
            resultado += "NodoRelacional"+oldValue+" -> "+"NodoMayorIgual"+num+";\n"
        } else if (this.tipo == TipoRelacional.MENOR) {
            resultado += "NodoMenor"+num+"[label=\"<\"];\n"
            resultado += "NodoRelacional"+oldValue+" -> "+"NodoMenor"+num+";\n"
        } else if (this.tipo == TipoRelacional.MENOR_IGUAL) {
            resultado += "NodoMenorIgual"+num+"[label=\"<=\"];\n"
            resultado += "NodoRelacional"+oldValue+" -> "+"NodoMenorIgual"+num+";\n"
        }

        // Para obtener la expresion del lado derecho y derivados
        // se llama a la expresion de la derecha
        const rightValue = this.right.graficar("NodoRelacional"+oldValue, num+1)
        resultado += rightValue.result
        num = rightValue.val +1

        return {"val": num, "result": resultado}
    }

}

export enum TipoRelacional {
    IGUALIGUAL,
    NO_IGUAL,
    MAYOR,
    MAYOR_IGUAL,
    MENOR,
    MENOR_IGUAL,
}