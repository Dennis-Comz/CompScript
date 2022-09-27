import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { CadenaEstatica } from "../StaticObjects/CadenaEstatica";
import { Instruccion } from "./Instruccion";

export class PrintLn extends Instruccion{
    constructor(private value: Expresion, line:number, column:number){
        super(line, column)
    }

    public execute(ambito: Ambito) {
        const val = this.value.execute(ambito)
        const salto = /\\n/gi;
        const barraInvertida = /\\\\/gi;
        const comillasDobles = /\\\"/gi;
        const tabulacion = /\\t/gi;
        const comillasSimples = /\\\'/gi;

        if (val.value.search(salto) != -1) {
            const cadena = this.examinar_cadena(salto, "\n", val.value)
            CadenaEstatica.agregarValor(cadena + "\n")
        }else if(val.value.search(barraInvertida) != -1){
            const cadena = this.examinar_cadena(barraInvertida, "\\", val.value)
            CadenaEstatica.agregarValor(cadena + "\n")
        }else if(val.value.search(comillasDobles) != -1){
            const cadena = this.examinar_cadena(comillasDobles, "\"", val.value)
            CadenaEstatica.agregarValor(cadena + "\n")
        }else if(val.value.search(tabulacion) != -1){
            const cadena = this.examinar_cadena(tabulacion, "\t", val.value)
            CadenaEstatica.agregarValor(cadena + "\n")
        }else if(val.value.search(comillasSimples) != -1){
            const cadena = this.examinar_cadena(comillasSimples, "\'", val.value)
            CadenaEstatica.agregarValor(cadena)
        }else{
            CadenaEstatica.agregarValor(val.value + "\n")
        }
    }

    public examinar_cadena(regex:any, caracter:string, cadena:string):string{
        const index = cadena.replace(regex, caracter)
        return index
    }

    public graficar(nodos: String, num:number) {
        let resultado = nodos+" -> Instruccion"+num+";\n"
        resultado += "Instruccion"+(num)+"[label=\"Instruccion\"];\n"
        num++;
        resultado += "Instruccion"+(num-1)+" -> "+"NodoPrintLn"+num+";\n"
        resultado += "NodoPrintLn"+(num)+"[label = \"PrintLn\"];\n"
        
        const valor = this.value.graficar("NodoPrintLn"+(num),num+1)
        resultado += valor.result;
        num = valor.val+1
        return {"val": num, "result": resultado}
    }
}