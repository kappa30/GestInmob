import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarServiciosComponent } from './listar-servicios.component';
import { ListarServiciosRoutingModule } from './listar-servicios-routing.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarServiciosComponent
  ],
  imports: [
    CommonModule,
    ListarServiciosRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListarServiciosModule { }
