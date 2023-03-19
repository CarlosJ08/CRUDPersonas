import { Component, OnInit } from '@angular/core';
import { Personas } from '../personas';
import { PersonasService } from '../personas.service';

@Component({
  selector: 'app-tabla-personas',
  templateUrl: './tabla-personas.component.html',
  styleUrls: ['./tabla-personas.component.css']
})
export class TablaPersonasComponent implements OnInit {
  personasConFiltro: Personas[];
  personas: Personas[];
  filtroNombre = "";
  filtroApellido = "";
  filtroGenero = "";
  constructor(private servicio: PersonasService) {
    this.personas = [];
    this.personasConFiltro = [];
  }

  ngOnInit(): void {
    this.ObtenerDatos();
  }
  ObtenerDatos() {
    this.servicio.obtenerTodos().subscribe(data => {
      this.personas = data;
      this.personasConFiltro = data;
      this.Refrescar();
    });
  }
   Refrescar() {
   
    this.personasConFiltro = [];
    this.filtroNombre = (document.getElementById("filtroNombre") as HTMLInputElement).value;
    this.filtroApellido = (document.getElementById("filtroApellido") as HTMLInputElement).value;
    this.filtroGenero = (document.getElementById("filtroGenero") as HTMLInputElement).value;
    this.personasConFiltro = this.personas.filter(per => {
      let coincideNombre = per.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      let coincideApellido = per.apellido.toLowerCase().includes(this.filtroApellido.toLowerCase());
      let coincideGenero = per.genero.toLowerCase().includes(this.filtroGenero.toLowerCase());

      if (coincideNombre && coincideApellido && coincideGenero) {
        return true;
      } else {
        return false;
      }

    });
    console.log(this.personasConFiltro)
  }
}
