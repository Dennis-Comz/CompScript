const parser = require('./Interpreter/Grammar/grammar')
const express = require('express')
const { Ambito } = require('./Interpreter/Extra/Ambito')
const { Metodo } = require('./Interpreter/Instruccion/Metodo')
const { CadenaEstatica } = require('./Interpreter/StaticObjects/CadenaEstatica')

var cors = require("cors")
const { ErrorList } = require('./Interpreter/StaticObjects/ErrorList')
const app = express()

app.use(express.json())
app.use(cors())

const PORT = 4200

app.get('/', (req, res) =>{
    res.send("HOLA MUNDO")
})

app.post('/', (req, res) => {
    CadenaEstatica.cadena = ""
    ErrorList.errores = []
    const exp = req.body.exp
    const ast = parser.parse(exp.toString())
    let salida = "digraph Arbol{\nnode[style=\"filled, dashed, rounded\" color=blue fillcolor=skyblue shape=box]\n"
    
    try {
        const ambito = new Ambito(null)
        let contador = 0;
        for(const inst of ast){
            try {
                if (inst instanceof Metodo) {
                    inst.execute(ambito)
                    const info = inst.graficar("AST", contador)
                    salida += info.result
                    contador = info.val
                }
            } catch (error) {
                //console.log(error)
            }
        }
        for(const inst of ast){
            if (!(inst instanceof Metodo)) {
                inst.execute(ambito)
                const info = inst.graficar("AST", contador)
                salida += info.result
                contador = info.val
            }
        }
    } catch (error) {
        //console.log(error)
    }
    salida += "}"
    console.log(ErrorList.errores)
    res.status(200).send(JSON.stringify({"graph": salida, "val_salida": CadenaEstatica.cadena, "errores": ErrorList.errores}))
})


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
