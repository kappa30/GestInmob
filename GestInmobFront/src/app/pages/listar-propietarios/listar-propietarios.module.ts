import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarPropietariosComponent } from './listar-propietarios.component';
import { ListarPropietariosRoutingModule } from './listar-propietarios-routing.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarPropietariosComponent
  ],
  imports: [
    CommonModule,
    ListarPropietariosRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListarPropietariosModule { }
