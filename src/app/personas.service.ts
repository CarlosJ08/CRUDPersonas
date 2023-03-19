import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Personas } from './personas';
@Injectable({
  providedIn: 'root'
})
export class PersonasService {
   url="https://localhost:44379/api/Personas";
  constructor(private http:HttpClient) { }
  obtenerTodos(){
    return this.http.get<Personas[]>(this.url);
  }
  Agregar(persona:Personas){
    return this.http.post<Personas>("https://localhost:44379/api/Personas/",persona);
  } 
  Modificar(persona:Personas){
    console.log(persona);
    return this.http.put<Personas>("https://localhost:44379/api/Personas/"+persona.id,persona);
  }
  Eliminar(id:number){
    return this.http.delete<Personas>("https://localhost:44379/api/Personas/"+id);
  }
}
