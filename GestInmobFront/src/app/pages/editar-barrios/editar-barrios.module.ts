import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarBarriosComponent } from './editar-barrios.component';
import { EditarBarriosRoutingModule } from './editar-barrios-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  declarations: [
    EditarBarriosComponent
  ],
  imports: [
    CommonModule,
    EditarBarriosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NavbarModule
  ]
})
export class EditarBarriosModule { }
