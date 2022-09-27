import { Ambito } from "../Extra/Ambito";
import { Expresion } from "./Expresion";
import { Retorno, Type } from './Retorno';
export class Literal extends Expresion {
    constructor(private value: any, private tipo: TipoLiteral, line: number, column: number) {
        super(line, column);
    }
    
    public execute(ambito:Ambito):Retorno|any {
        if (this.tipo == TipoLiteral.ENTERO) {
            return {value: parseInt(this.value), type: Type.ENTERO}
        }else if (this.tipo == TipoLiteral.DOBLE) {
            return {value: parseFloat(this.value), type: Type.DOBLE}            
        }else if (this.tipo == TipoLiteral.CADENA) {
            return {value: this.value.toString(), type: Type.CADENA}
        }else if (this.tipo == TipoLiteral.CARACTER) {
            return {value: this.value.charCodeAt(0), type: Type.CARACTER}
        }else if(this.tipo == TipoLiteral.BOOLEAN){
            if (this.value.toString().toLowerCase() == 'true') {
                return {value: true, type: Type.BOOLEAN}
            }
            return {value: false, type: Type.BOOLEAN}
        }
    }

    public graficar(nodo:string,num:number):any {
        
        num++
        let resultado = nodo+" -> "+"NodoLiteral"+(num)+";\n"
        resultado += "NodoLiteral"+num+"[label=\"Literal\"];\n"
        num++
        resultado += "NodoLiteralValor"+num+"[label=\""+this.value+"\"];\n"
        resultado += "NodoLiteral"+(num-1)+" -> NodoLiteralValor"+num+";\n"
        
        return {"val":num,"result":resultado}
    }

}

export enum TipoLiteral{
    ENTERO = 0,
    DOBLE = 1,
    BOOLEAN = 2,
    CARACTER = 3,
    CADENA = 4,
}