import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Personas } from '../personas';
import { PersonasService } from '../personas.service';


@Component({ 
  selector: 'app-modal-agregar',
  templateUrl: './modal-agregar.component.html',
  styleUrls: ['./modal-agregar.component.css']
})
export class ModalAgregarComponent implements OnInit {

  estaSeleccionado: boolean;
  txtGenero = "";
  datosIncorrectos=false;
  Formulario = this.formBuilder.group({
    nombre: ["", Validators.required],
    apellido: ["", Validators.required],
    genero: ["", Validators.required]

  });
  persona:Personas | undefined;

  @Output() aviso=new EventEmitter<string>();
  
  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private servicio:PersonasService) {
    this.estaSeleccionado = false;


  }
  ngOnInit(): void {

  }
  submit(dialogoTemplate:any) {
    if (this.estaSeleccionado) {
      this.Formulario.value["genero"] = this.txtGenero;
    }
    if(this.Formulario.valid && this.Formulario.value["genero"]!=""){
      this.modalService.open(dialogoTemplate,{size:'sm'});
    }else{
      this.datosIncorrectos=true;
    }

  }
  agregarRegistro(){
    this.persona=new Personas(this.Formulario.value["nombre"],this.Formulario.value["apellido"],this.Formulario.value["genero"]);
    this.servicio.Agregar(this.persona).subscribe(data=>{
      this.aviso.emit("Se agrego un registro");
      this.Formulario.reset();
      this.modalService.dismissAll();
    });
  }
  openLg(content: any) {
    this.estaSeleccionado = false;
    this.Formulario.reset();
    console.log(content);
    this.modalService.open(content, { size: 'lg' });
      

  }

  ActivarTxt() {

    this.estaSeleccionado = true;


  }
  DesactivarTxt() {

    this.estaSeleccionado = false;


  }




}
