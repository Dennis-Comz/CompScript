import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Type } from "../Expresion/Retorno";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Instruccion } from "./Instruccion";

export class Declaracion extends Instruccion{
    constructor(private type:string, private id:string[], private value:Expresion, line:number, column:number){
        super(line, column)
        if (this.type != null) {
            this.type = this.type.toLowerCase()            
        }
    }

    public execute(ambito: Ambito) {
        let val;
        if (this.value != null) {
            val = this.value.execute(ambito)            
        }
        for(const identificador of this.id){
            if (val != null) {
                const tipoEntrada = this.getTypeName(val.type)
                if (this.type === "int" && val.type === Type.ENTERO) {
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column)
                }else if(this.type === "double" && val.type === Type.DOBLE){
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column)
                }else if(this.type === "boolean" && val.type === Type.BOOLEAN){
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column)
                }else if(this.type === "string" && val.type === Type.CADENA){
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column)
                }else if(this.type === "char" && val.type === Type.CARACTER){
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column)
                }else if(this.type === null){
                    ambito.setVal(identificador, val.value, val.type, this.line, this.column)
                }else{
                    ErrorList.addError(new Error_(this.line, this.column, "Semantico", this.type + " No puede tener valor de " + tipoEntrada))
                }
            }else{
                ambito.setVal(identificador, null, null, this.line, this.column)
            }    
        }
    }

    public graficar(nodos: String, num: number):any {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoDeclaracion"+num+";\n"
        resultado += "NodoDeclaracion"+num+"[label=\"Declaracion\"];\n"
        num++
        if (this.type != null) {
            resultado += "NodoDeclaracion"+(num-1)+" -> NodoTipoDeclaracion"+num+";\n"
            resultado += "NodoTipoDeclaracion"+num+"[label=\""+this.type+"\"];\n"
        }
        const oldValue = num-1
        for (let index = 0; index < this.id.length; index++) {
            resultado += "NodoDeclaracion"+oldValue+" -> NodoIdDeclaracion"+num+";\n"
            resultado += "NodoIdDeclaracion"+num+"[label=\""+this.id[index]+"\"];\n"    
            num++
        }
        if (this.value != null) {
            const valor = this.value.graficar("NodoDeclaracion"+oldValue,num+1)
            resultado += valor.result
        }
        return {"val": num, "result": resultado}
    }

    public getId(){
        return {identificador: this.id[0]}
    }

    private getTypeName(type: number):string{
        if (type === 0) {
            return "ENTERO"
        }else if(type === 1){
            return "DOUBLE"
        }else if(type === 2){
            return "BOOLEAN"
        }else if(type === 3){
            return "CHARACTER"
        }else if(type === 4){
            return "STRING"
        }else{
            return "";
        }
    }
}