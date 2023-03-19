import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormsModule, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Personas } from '../personas';
import { PersonasService } from '../personas.service';


@Component({
  selector: 'app-modal-eliminar',
  templateUrl: './modal-eliminar.component.html',
  styleUrls: ['./modal-eliminar.component.css']
})
export class ModalEliminarComponent implements OnInit {

  @Input() persona: Personas | undefined;
  personaModificada: Personas | undefined;
  Formulario = this.formBuilder.group({
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    genero: ["", Validators.required]

  });
  @Output() aviso = new EventEmitter<String>();
  estaSeleccionado: boolean;
  datosIncorrectos = false;
  txtGenero: String | undefined;
  constructor(private formBuilder: FormBuilder, private modalService: NgbModal, private servicio: PersonasService) {
    this.estaSeleccionado = false;
    this.txtGenero = "";
  }

  ngOnInit(): void {

    this.darValores();

  }
  
  submit(dialogoTemplate: any) {
    if (this.estaSeleccionado) {
      this.Formulario.value["genero"] = this.txtGenero;
    }

    this.modalService.open(dialogoTemplate, { size: 'sm' });
  }


  eliminarRegistro() {
    this.servicio.Eliminar(this.persona?.id).subscribe(data => {
      this.aviso.emit("Se elimino un registro");
    });

    this.modalService.dismissAll();


  }

  openLg(content: any) {
    this.darValores();
    this.modalService.open(content, { size: 'lg' });


  }
  darValores() {
    this.Formulario.controls["nombre"].setValue(this.persona?.nombre);
    this.Formulario.controls["apellido"].setValue(this.persona?.apellido);
    this.Formulario.controls["nombre"].disable();
    this.Formulario.controls["apellido"].disable();
    if (this.persona?.genero != "Masculino" && this.persona?.genero != "Femenino") {
      this.Formulario.controls["genero"].setValue("otro");
      this.estaSeleccionado = true;
      this.txtGenero = this.persona?.genero;
    } else {
      this.Formulario.controls["genero"].setValue(this.persona.genero);
    }
    this.Formulario.controls["genero"].disable();
  }

}
