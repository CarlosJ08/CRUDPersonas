import { Component, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventEmitter } from '@angular/core';
import { Personas } from '../personas';
import { PersonasService } from '../personas.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-modal-modificar',
  templateUrl: './modal-modificar.component.html',
  styleUrls: ['./modal-modificar.component.css']
})
export class ModalModificarComponent implements OnInit {
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
    if (this.Formulario.valid && this.Formulario.value["genero"] != "") {
      this.modalService.open(dialogoTemplate, { size: 'sm' });
    } else {
      this.datosIncorrectos = true;
    }
  }
  modificarRegistro() {

    this.personaModificada = new Personas(this.Formulario.value["nombre"], this.Formulario.value["apellido"], this.Formulario.value["genero"]);
    this.personaModificada.setId(this.persona?.id);
    this.servicio.Modificar(this.personaModificada).subscribe(data => {
      this.aviso.emit("Se agrego un registro");
      this.Formulario.reset();
      this.modalService.dismissAll();
    });
  }

  openLg(content: any) {

    this.darValores();
    this.modalService.open(content, { size: 'lg' });


  }
  darValores() {

    this.Formulario.controls["nombre"].setValue(this.persona?.nombre);
    this.Formulario.controls["apellido"].setValue(this.persona?.apellido);
    if (this.persona?.genero != "Masculino" && this.persona?.genero != "Femenino") {
      this.Formulario.controls["genero"].setValue("otro");
      this.estaSeleccionado = true;
      this.txtGenero = this.persona?.genero;
    } else {
      this.Formulario.controls["genero"].setValue(this.persona.genero);
    }
  }
  ActivarTxt() {

    this.estaSeleccionado = true;


  }
  DesactivarTxt() {

    this.estaSeleccionado = false;

  }

}
