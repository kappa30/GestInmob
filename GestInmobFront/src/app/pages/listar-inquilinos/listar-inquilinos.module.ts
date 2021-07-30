import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarInquilinosComponent } from './listar-inquilinos.component';
import { ListarInquilinosRoutingModule } from './listar-inquilinos-routing.module';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarInquilinosComponent
  ],
  imports: [
    CommonModule,
    ListarInquilinosRoutingModule,
    NavbarModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ListarInquilinosModule { }
