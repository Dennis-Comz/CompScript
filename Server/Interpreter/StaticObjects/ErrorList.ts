import { Error_ } from "../Error/Error";

export class ErrorList{
    static errores:Error_[] = []
    
    static addError(error:Error_){
        if (error != null || error != undefined) {
            this.errores.push(error)            
        }
    }
}