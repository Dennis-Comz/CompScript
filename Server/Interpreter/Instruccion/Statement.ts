import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";

export class Statement extends Instruccion{
    constructor(private code: Instruccion[], line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const nuevo_Ambito = new Ambito(ambito)
        for(const inst of this.code){
            try {
                const retorno = inst.execute(nuevo_Ambito)
                if (retorno != null && retorno != undefined) {
                    return retorno
                }
            } catch (error) {
                console.log(error)
            }
        }
    }

    public graficar(nodos: String, num: number):any {
        let resultado = nodos+" -> "+"NodoStatement"+num+";\n"
        resultado += "NodoStatement"+(num)+"[label=\"Statement\"];\n"
        num++
        const oldValue = num-1
        for (const inst of this.code) {
            const c = inst.graficar("NodoStatement"+oldValue, num+1)
            resultado += c.result
            num = c.val+1
        }

        return {"val": num, "result": resultado}
    }
}