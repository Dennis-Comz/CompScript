%{
    const {Aritmetica,TipoAritmetica} = require('../Expresion/Aritmetica')
    const {Relacional,TipoRelacional} = require('../Expresion/Relacional')
    const {Ternario} = require('../Expresion/Ternario')
    const {Logico,TipoLogica} = require('../Expresion/Logico')
    const {Literal,TipoLiteral} = require('../Expresion/Literal')
    const {Declaracion} = require('../Instruccion/Declaracion')
    const {Acceso} = require('../Expresion/Acceso')
    const {Print} = require('../Instruccion/Print')
    const {PrintLn} = require('../Instruccion/PrintLn')
    const {Statement} = require('../Instruccion/Statement')
    const {While} = require('../Instruccion/While')
    const {If} = require('../Instruccion/If')
    const {Case} = require('../Instruccion/Case')
    const {Switch} = require('../Instruccion/Switch')
    const {Break} = require('../Instruccion/Break')
    const {Continue} = require('../Instruccion/Continue')
    const {Do_While} = require('../Instruccion/Do_While')
    const {For} = require('../Instruccion/For')
    const {Metodo, Parametro} = require('../Instruccion/Metodo')
    const {LlamadaMetodo} = require('../Instruccion/LlamadaMetodo')
    const { ErrorList } = require("../StaticObjects/ErrorList")
    const { Error_ } = require("../Error/Error");
%}

// Lexico
%lex

%options case-insensitive
%%

\s+                             //Se ignoran espacios en blanco
\/\/.*                          //Comentario de una linea
[/][*][^*]*[*]+([^/*][^*]*[*]+)*[/]     //Comentario Multilinea

//Palbaras Reservadas
"true"                      return 'TRUE';
"false"                     return 'FALSE';
"Print"                     return 'PRINT';
"Println"                   return 'PRINT_LN';
"int"                       return 'INT';
"double"                    return 'DOUBLE';
"char"                      return 'CHAR';
"string"                    return 'STRING';
"boolean"                   return 'BOOLEAN';
"if"                        return 'IF';
"else"                      return 'ELSE';
"while"                     return 'WHILE';
"break"                     return 'BREAK';
"continue"                  return 'CONTINUE';
"switch"                    return 'SWITCH';
"case"                      return 'CASE';
"default"                   return 'DEFAULT';
"do"                        return 'DO';
"for"                       return 'FOR';
"void"                      return 'VOID';
"run"                       return 'RUN';

([0-9]+\.[0-9]+)\b  	return 'DOBLE';
[0-9]+\b				return 'ENTERO';
([a-zA-Z])[a-zA-Z0-9_]*	return 'IDENTIFICADOR';

//Simbolos y  Signos
"("                     return 'PAR_ABRE';
")"                     return 'PAR_CIERRA';
"{"                     return 'LLAVE_ABRE';
"}"                     return 'LLAVE_CIERRA';
','                     return 'COMA';
";"                     return 'PUNTO_Y_COMA';
":"                     return 'DOS_PUNTOS';
"?"                     return 'INTERROGACION';

//Operadores Relacionales
"=="                    return 'D_IGUAL';
"<="                    return 'MENOR_IGUAL';
"<"                     return 'MENOR';
">="                    return 'MAYOR_IGUAL';                     
">"                     return 'MAYOR';
"!="                    return 'DIFERENTE';
"="                     return 'IGUAL';

//Operadores Logicos
"||"                    return "OR";
"&&"                    return "AND";
"!"                     return "NOT";

//Operadores Aritmeticos
"++"					return 'INCREMENTO';
"--"					return 'DECREMENTO';
"+"					    return 'MAS';
"-"					    return 'MENOS';
"*"					    return 'POR';
"/"					    return 'DIVIDIR';
"^"					    return 'POTENCIA';
"%"					    return 'MODULO';

//Otros
\"[^\"]*\"		    { yytext = yytext.substr(1,yyleng-2); return 'CADENA'; }
[']\\\\[']|[']\\\"[']|[']\\\'[']|[']\\n[']|[']\\t[']|[']\\r[']|['].?[']         { yytext = yytext.substr(1,yyleng-2); return 'CARACTER'; }
<<EOF>>				    return 'EOF';
.					   {ErrorList.addError(new Error_(yylloc.first_line, yylloc.first_column, "Lexico", "No se reconoce: " + yytext));}
/lex

//Precedencia
%left 'INTERROGACION'
%left 'OR'
%left 'AND'
%right 'NOT'
%left 'D_IGUAL' 'DIFERENTE' 'MENOR' 'MAYOR' 'MENOR_IGUAL' 'MAYOR_IGUAL'
%left 'MAS' 'MENOS'
%left 'DIVIDIR' 'POR' 'MODULO'
%right 'POTENCIA'
%left UMENOS

%start ini

%%

ini : entrada_inicial EOF {return $1;}
;

entrada_inicial: entrada_inicial codigos_iniciales
    {$1.push($2); $$=$1;}
    |codigos_iniciales
    {$$=[$1]}
    |error  {$$ = []; ErrorList.addError(new Error_(@1.first_line, @1.first_column, "Sintactico", "No se encuentra el caracter " + yytext));}
;

codigos_iniciales: declaracion      {$$ = $1}
    |metodo                         {$$ = $1}
    |run                            {$$ = $1}
;

instrucciones : instrucciones inicio
        {$1.push($2); $$=$1;}
    |inicio
    {$$=[$1]}
;

inicio : declaracion
    |print
    |println
    |if
    |while
    |switch
    |do_while
    |for
    |llamada_metodo 
    |BREAK PUNTO_Y_COMA     {$$ = new Break(@1.first_line, @1.first_column)}
    |CONTINUE PUNTO_Y_COMA  {$$ = new Continue(@1.first_line, @1.first_column)}
;

if : IF PAR_ABRE expresion PAR_CIERRA statement elsE {$$ = new If($3, $5, $6, @1.first_line, @1.first_column)}
;

elsE : ELSE statement   {$$ = $2}
    |ELSE if            {$$ = $2}
    |                   {$$ = null}
;

while : WHILE PAR_ABRE expresion PAR_CIERRA statement {$$ = new While($3, $5, @1.first_line, @1.first_column)}
;

statement : LLAVE_ABRE instrucciones LLAVE_CIERRA   {$$ = new Statement($2, @1.first_line, @1.first_column)}
    |LLAVE_ABRE LLAVE_CIERRA                        {$$ = new Statement([], @1.first_line, @1.first_column)}
;

switch: SWITCH PAR_ABRE expresion PAR_CIERRA LLAVE_ABRE case_list DEFAULT DOS_PUNTOS instrucciones LLAVE_CIERRA {$$=new Switch($3, $6, $9,  @1.first_line, @1.first_column)}
;

case_list: case_list CASE expresion DOS_PUNTOS instrucciones    {$1.push(new Case($3, $5, @1.first_line, @1.first_column));$$=$1;}
    |case_list CASE expresion DOS_PUNTOS                        {$1.push(new Case($3, [], @1.first_line, @1.first_column));$$=$1;}
    |CASE expresion DOS_PUNTOS instrucciones                    {$$=[new Case($2, $4, @1.first_line, @1.first_column)];}
    |CASE expresion DOS_PUNTOS                                  {$$=[new Case($2, [], @1.first_line, @1.first_column)];}
;

do_while: DO statement WHILE PAR_ABRE expresion PAR_CIERRA PUNTO_Y_COMA {$$ = new Do_While($2, $5, @1.first_line, @1.first_column)}
;

for: FOR PAR_ABRE declaracion expresion PUNTO_Y_COMA declaracion_for PAR_CIERRA statement
    {$$=new For($3, $4, $6, $8, @1.first_line, @1.first_column)}
;

declaracion_for: IDENTIFICADOR IGUAL expresion
    {$$ = new Declaracion(null, [$1], $3, @1.first_line, @1.first_column)}
    |IDENTIFICADOR INCREMENTO
    {$$ = new Declaracion(null, [$1], new Aritmetica(new Acceso($1, @1.first_line, @1.first_column),new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.SUMA, @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
    |IDENTIFICADOR DECREMENTO
    {$$ = new Declaracion(null, [$1], new Aritmetica(new Acceso($1, @1.first_line, @1.first_column),new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.RESTA, @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
;

metodo: IDENTIFICADOR PAR_ABRE PAR_CIERRA tipo_metodo statement
    {$$ = new Metodo($1, $5, [], @1.first_line, @1.first_column)}
    |IDENTIFICADOR PAR_ABRE parametros PAR_CIERRA tipo_metodo statement
    {$$ = new Metodo($1, $6, $3, @1.first_line, @1.first_column)}
;

tipo_metodo: DOS_PUNTOS VOID    {$$ = null}
    |                           {$$ = null}
;

parametros: parametros COMA tipos_prueba IDENTIFICADOR
        {$1.push(new Parametro($4, $3)); $$ = $1}
    |tipos_prueba IDENTIFICADOR
    {$$ = [new Parametro($2, $1)]}
;

llamada_metodo: IDENTIFICADOR PAR_ABRE PAR_CIERRA PUNTO_Y_COMA
    {$$ = new LlamadaMetodo($1, [], @1.first_line, @1.first_column)}
    | IDENTIFICADOR PAR_ABRE lista_expresiones PAR_CIERRA PUNTO_Y_COMA
    {$$ = new LlamadaMetodo($1, $3, @1.first_line, @1.first_column)}
;

lista_expresiones: lista_expresiones COMA expresion
        {$1.push($3);$$ = $1}
    | expresion
    {$$ = [$1]}
;

run: RUN llamada_metodo
    {$$ = $2}
;

declaracion : tipos identificador_comas PUNTO_Y_COMA
        {$$ = new Declaracion($1, $2, null,@1.first_line, @1.first_column)}
    |tipos identificador_comas IGUAL expresion PUNTO_Y_COMA
    {$$ = new Declaracion($1, $2, $4,@1.first_line, @1.first_column)}
    |IDENTIFICADOR IGUAL expresion PUNTO_Y_COMA
    {$$ = new Declaracion(null, [$1], $3, @1.first_line, @1.first_column)}
    |IDENTIFICADOR INCREMENTO PUNTO_Y_COMA
    {$$ = new Declaracion(null, [$1], new Aritmetica(new Acceso($1, @1.first_line, @1.first_column),new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.SUMA, @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
    |IDENTIFICADOR DECREMENTO PUNTO_Y_COMA
    {$$ = new Declaracion(null, [$1], new Aritmetica(new Acceso($1, @1.first_line, @1.first_column),new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.RESTA, @1.first_line, @1.first_column), @1.first_line, @1.first_column)}
;

identificador_comas : identificador_comas COMA IDENTIFICADOR
        {$1.push($3); $$=$1;}
    |IDENTIFICADOR
    {$$=[$1]}
;

print : PRINT PAR_ABRE expresion PAR_CIERRA PUNTO_Y_COMA
    {$$ = new Print($3,@1.first_line, @1.first_column)}
;

println : PRINT_LN PAR_ABRE expresion PAR_CIERRA PUNTO_Y_COMA
    {$$ = new PrintLn($3,@1.first_line, @1.first_column)}
;

tipos : INT         {$$ = $1}
    | DOUBLE        {$$ = $1}
    | CHAR          {$$ = $1}
    | BOOLEAN       {$$ = $1}
    | STRING        {$$ = $1}
;

tipos_prueba : INT         {$$ = TipoLiteral.ENTERO}
    | DOUBLE        {$$ = TipoLiteral.DOBLE}
    | CHAR          {$$ = TipoLiteral.CARACTER}
    | BOOLEAN       {$$ = TipoLiteral.BOOLEAN}
    | STRING        {$$ = TipoLiteral.CADENA}
;

ternario: expresion INTERROGACION expresion DOS_PUNTOS expresion
    {$$= new Ternario($1, $3, $5, @1.first_line, @1.first_column)}
;

expresion
    :MENOS expresion %prec UMENOS		{$$= new Aritmetica($2,new Literal("-1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}
    |expresion MAS expresion            {$$= new Aritmetica($1,$3,TipoAritmetica.SUMA, @1.first_line, @1.first_column)} 
    |expresion MENOS expresion          {$$= new Aritmetica($1,$3,TipoAritmetica.RESTA, @1.first_line, @1.first_column)} 
    |expresion POR expresion            {$$= new Aritmetica($1,$3,TipoAritmetica.MULTIPLICACION, @1.first_line, @1.first_column)}   
    |expresion DIVIDIR expresion        {$$= new Aritmetica($1,$3,TipoAritmetica.DIVISION, @1.first_line, @1.first_column)}
    |expresion MODULO expresion         {$$= new Aritmetica($1,$3,TipoAritmetica.MODULO, @1.first_line, @1.first_column)}
    |expresion POTENCIA expresion       {$$= new Aritmetica($1,$3,TipoAritmetica.POTENCIA, @1.first_line, @1.first_column)}
    |expresion D_IGUAL expresion        {$$= new Relacional($1,$3,TipoRelacional.IGUALIGUAL, @1.first_line, @1.first_column)} 
    |expresion DIFERENTE expresion      {$$= new Relacional($1,$3,TipoRelacional.NO_IGUAL, @1.first_line, @1.first_column)} 
    |expresion MAYOR_IGUAL expresion    {$$= new Relacional($1,$3,TipoRelacional.MAYOR_IGUAL, @1.first_line, @1.first_column)} 
    |expresion MENOR_IGUAL expresion    {$$= new Relacional($1,$3,TipoRelacional.MENOR_IGUAL, @1.first_line, @1.first_column)} 
    |expresion MAYOR expresion          {$$= new Relacional($1,$3,TipoRelacional.MAYOR, @1.first_line, @1.first_column)}         
    |expresion MENOR expresion          {$$= new Relacional($1,$3,TipoRelacional.MENOR, @1.first_line, @1.first_column)}
    |expresion AND expresion            {$$= new Logico($1, $3, TipoLogica.AND, @1.first_line, @1.first_column)}
    |expresion OR expresion             {$$= new Logico($1, $3, TipoLogica.OR, @1.first_line, @1.first_column)}
    |NOT expresion                      {$$= new Logico(null, $2, TipoLogica.NOT, @1.first_line, @1.first_column)}
    |PAR_ABRE expresion PAR_CIERRA      {$$= $2}
    |DOBLE                              {$$= new Literal($1,TipoLiteral.DOBLE, @1.first_line, @1.first_column)}
    |ENTERO	                            {$$= new Literal($1,TipoLiteral.ENTERO, @1.first_line, @1.first_column)}							
	|CADENA                             {$$= new Literal($1,TipoLiteral.CADENA, @1.first_line, @1.first_column)} 
    |CARACTER       					{$$= new Literal($1,TipoLiteral.CARACTER, @1.first_line, @1.first_column)}
    |TRUE                               {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}                              
    |FALSE                              {$$= new Literal($1,TipoLiteral.BOOLEAN, @1.first_line, @1.first_column)}
    |IDENTIFICADOR                      {$$= new Acceso($1, @1.first_line, @1.first_column)}
    |IDENTIFICADOR INCREMENTO           {$$= new Aritmetica(new Acceso($1, @1.first_line, @1.first_column),new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.SUMA, @1.first_line, @1.first_column)}
    |IDENTIFICADOR DECREMENTO           {$$= new Aritmetica(new Acceso($1, @1.first_line, @1.first_column),new Literal("1",TipoLiteral.ENTERO, @1.first_line, @1.first_column),TipoAritmetica.RESTA, @1.first_line, @1.first_column)}
    |ternario                           {$$= $1}
;