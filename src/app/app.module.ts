import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablaPersonasComponent } from './tabla-personas/tabla-personas.component';
import { ModalAgregarComponent } from './modal-agregar/modal-agregar.component';
import { ModalModificarComponent } from './modal-modificar/modal-modificar.component';
import { ModalEliminarComponent } from './modal-eliminar/modal-eliminar.component';

import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
@NgModule({
  declarations: [
    AppComponent,
    TablaPersonasComponent,
    ModalAgregarComponent,
    ModalModificarComponent,
    ModalEliminarComponent,
  
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

    
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
