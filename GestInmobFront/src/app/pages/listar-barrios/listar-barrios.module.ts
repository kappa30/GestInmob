import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarBarriosComponent } from './listar-barrios.component';
import { ListarBarriosRoutingModule } from './listar-barrios-routing.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ListarBarriosComponent
  ],
  imports: [
    CommonModule,
    ListarBarriosRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListarBarriosModule { }
