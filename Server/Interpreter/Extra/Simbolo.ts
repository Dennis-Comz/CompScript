import { Type } from "../Expresion/Retorno";

export class Simbolo{
    constructor(public valor: any, public id: string, public type:Type|null){ }
}