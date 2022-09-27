import { Error_ } from "../Error/Error";
import { Type } from "../Expresion/Retorno";
import { Metodo } from "../Instruccion/Metodo";
import { Simbolo } from "./Simbolo";

export class Ambito{
    // Permite almacenar objetos de clave-valor
    public variables!: Map<string, Simbolo>;
    public metodos!: Map<string, Metodo>;
    
    constructor(public anterior: Ambito|null){
        this.variables = new Map();
        this.metodos = new Map()
    }

    public setVal(id:string, value:any, type:Type|null, line:number, column:number){
        let env: Ambito | null = this

        while (env!=null) {
            if (env.variables.has(id)) {
                const val = env.variables.get(id)
                if (val != undefined) {
                    if (val.type == type || val.type == null) {
                        env.variables.set(id, new Simbolo(value, id, type))
                    }else if (type == 0 && val.type == 1) {
                        env.variables.set(id, new Simbolo(Math.ceil(value), id, type))                        
                    }else if (type == 1 && val.type == 0) {
                        env.variables.set(id, new Simbolo(parseFloat(value), id, type))                    
                    }else{
                        throw new Error_(line, column, 'Semantico', 'No se puede asignar: ' + type + ' _ ' + val.type)
                    }                        
                }
            }
            env = env.anterior
        }
        this.variables.set(id, new Simbolo(value, id, type))
    }

    public getVal(id:string):Simbolo|undefined{
        let env: Ambito | null = this

        while (env!=null) {
            if (env.variables.has(id)) {
                return env.variables.get(id)
            }
            env = env.anterior
        }
        return undefined
    }

    public guardarMetodo(id:string, metodo:Metodo){
        this.metodos.set(id, metodo)
    }

    public getMetodo(id:string):Metodo|undefined{
        let env: Ambito | null = this

        while (env!=null) {
            if (env.metodos.has(id)) {
                return env.metodos.get(id)
            }
            env = env.anterior
        }
        return undefined
    }

    public getGlobal(){
        let env: Ambito | null = this
        while (env?.anterior!=null) {
            env = env.anterior
        }
        return env
    }
}