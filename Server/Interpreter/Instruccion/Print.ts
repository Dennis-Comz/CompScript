import { Expresion } from "../Expresion/Expresion";
import { Ambito } from "../Extra/Ambito";
import { Instruccion } from "./Instruccion";
import { CadenaEstatica } from "../StaticObjects/CadenaEstatica";

export class Print extends Instruccion{
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
            CadenaEstatica.agregarValor(cadena)
        }else if(val.value.search(barraInvertida) != -1){
            const cadena = this.examinar_cadena(barraInvertida, "\\", val.value)
            CadenaEstatica.agregarValor(cadena)
        }else if(val.value.search(comillasDobles) != -1){
            const cadena = this.examinar_cadena(comillasDobles, "\"", val.value)
            CadenaEstatica.agregarValor(cadena)
        }else if(val.value.search(tabulacion) != -1){
            const cadena = this.examinar_cadena(tabulacion, "\t", val.value)
            CadenaEstatica.agregarValor(cadena)
        }else if(val.value.search(comillasSimples) != -1){
            const cadena = this.examinar_cadena(comillasSimples, "\'", val.value)
            CadenaEstatica.agregarValor(cadena)
        }else{
            CadenaEstatica.agregarValor(val.value)
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
        resultado += "Instruccion"+(num-1)+" -> "+"NodoPrint"+num+";\n"
        resultado += "NodoPrint"+(num)+"[label = \"Print\"];\n"
        
        const valor = this.value.graficar("NodoPrint"+(num),num)
        num = valor.val
        resultado += valor.result;
        return {"val": num, "result": resultado}
    }
}