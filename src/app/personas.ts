export class Personas {
    public id: number | any;
    public nombre: String;
    public apellido: string
    public genero: String
    constructor(
        nombre: String,
        apellido: string,
        genero: String,

    ) {
        this.nombre=nombre;
        this.apellido=apellido;
        this.genero=genero;
     }
     setId(id:number){
         this.id=id;
     }


}