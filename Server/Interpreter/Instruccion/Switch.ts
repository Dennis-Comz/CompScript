import { Error_ } from "../Error/Error";
import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { ErrorList } from "../StaticObjects/ErrorList";
import { Case } from "./Case";
import { Instruccion } from "./Instruccion";

export class Switch extends Instruccion{
    constructor(private value:Expresion, private cases:Case[], private default_:Instruccion[], line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        let val = this.value.execute(ambito)
        const nuevo_Ambito = new Ambito(ambito)
        
        let salida_for = false
        for (const case_ of this.cases) {
            const val_case = case_.getValue().execute(nuevo_Ambito)
            if (val.type == val_case.type) {
                if (val.value == val_case.value) {
                    const salida = case_.execute(nuevo_Ambito)
                    if (salida != null && salida != undefined) {
                        if (salida.type == "Break") {
                            salida_for = true
                            break
                        }
                    }
                    val = this.value.execute(ambito)
                }
            }else{
                ErrorList.addError(new Error_(this.line, this.column, "Semantico", "Expresion en Switch no coincide con Expresion en Case"))
            }
        }
        if (!salida_for) {
            for (const inst of this.default_) {
                const val = inst.execute(nuevo_Ambito)
                if (val != null && val != undefined) {
                    if (val.type == "Break") {
                        break
                    }
                }
            }
        }
    }

    public graficar(nodos: String, num: number):any {
        let resultado = nodos+" -> "+"Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++
        resultado += "Instruccion"+(num-1)+" -> "+"NodoSwitch"+num+";\n"
        resultado += "NodoSwitch"+num+"[label = \"Switch\"];\n"
        const valor = this.value.graficar("NodoSwitch"+num,num+1)
        resultado += valor.result
        num++
        resultado += "NodoSwitch"+(num-1)+" -> "+"NodoCaseList"+num+";\n"
        resultado += "NodoCaseList"+num+"[label = \"Case List\"];\n"
        const oldValue = num-1
        const static_value = num
        let nuevo
        for (const Case of this.cases) {
            nuevo = Case.graficar("NodoCaseList"+static_value, num+1)
            resultado += nuevo.result
            num = nuevo.val+1
        }
        num++
        resultado += "NodoSwitch"+oldValue+" -> "+"NodoDefault"+num+";\n"
        resultado += "NodoDefault"+num+"[label = \"Default\"];\n"
        const def_num = num
        for (const Code of this.default_) {
            const nuevo_inst = Code.graficar("NodoDefault"+def_num, num+1)
            resultado += nuevo_inst.result
            num = nuevo_inst.val+1
        }
        return {"val": num, "result": resultado}
    }

}