import { Error_ } from "../Error/Error";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Expresion } from "./Expresion";
import { Retorno, Type } from "./Retorno";

export class Logico extends Expresion{
    constructor(private left: Expresion|null, private right: Expresion, private tipo: TipoLogica, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito):Retorno|any {
        let leftValue;
        if (this.left != null) {
            leftValue = this.left.execute(ambito)
        }
        const rightValue = this.right.execute(ambito)

        if ((leftValue?.type == Type.BOOLEAN || leftValue?.type == null) && rightValue.type == Type.BOOLEAN) {
            if (this.tipo == TipoLogica.AND) {
                const result = leftValue.value && rightValue.value;
                return { value: result, type: Type.BOOLEAN }
            }else if(this.tipo == TipoLogica.OR){
                const result = leftValue.value || rightValue.value;
                return { value: result, type: Type.BOOLEAN }
            }else if(this.tipo == TipoLogica.NOT){
                const result = !rightValue.value;
                return { value: result, type: Type.BOOLEAN }
            }
        }else{
            ErrorList.addError(new Error_(this.line, this.column, 'Semantico', "Las Expresiones a evaluar no son booleanas"))
        }
    }
    public graficar(nodo:string,num:number):any {
        num++
        let resultado = nodo+" -> "+"NodoLogico"+num+";\n"
        // Crear Nodo expresion que se conecta a el nodo pasado por parametro
        resultado += "NodoLogico"+num+"[label=\"Logico\"];\n"
        // expresion - expresion - expresion
        //               signo
        // Para obtener la expresion del lado izquierdo y todos sus derivadoa
        // Se llama a la expresion a la izquierda
        const oldValue = num
        let leftValue
        if (this.left != null) {
            leftValue = this.left.graficar("NodoLogico"+oldValue, num+1)
            resultado += leftValue.result                    
            num = leftValue.val+1
        }
        // Valores que van en el centro de la expresion
        if (this.tipo == TipoLogica.AND) {
            resultado += "NodoAnd"+num+"[label=\"&&\"];\n"
            resultado += "NodoLogico"+oldValue+" -> "+"NodoAnd"+num+";\n"
        }else if(this.tipo == TipoLogica.OR){
            resultado += "NodoOr"+num+"[label=\"||\"];\n"
            resultado += "NodoLogico"+oldValue+" -> "+"NodoOr"+num+";\n"
        }else if(this.tipo == TipoLogica.NOT){
            resultado += "NodoNot"+num+"[label=\"!\"];\n"
            resultado += "NodoLogico"+oldValue+" -> "+"NodoNot"+num+";\n"
        }

        // Para obtener la expresion del lado derecho y derivados
        // se llama a la expresion de la derecha
        const rightValue = this.right.graficar("NodoLogico"+oldValue, num+1)
        resultado += rightValue.result
        num = rightValue.val+1
        return {"val": num, "result":resultado}
    }

}

export enum TipoLogica{
    AND,
    OR,
    NOT
}