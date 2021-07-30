import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditarPropietarioComponent } from './editar-propietario.component';
import { EditarPropietarioRoutingModule } from './editar-propietario-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';


@NgModule({
  declarations: [
    EditarPropietarioComponent
  ],
  imports: [
    CommonModule,
    EditarPropietarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NavbarModule
  ]
})
export class EditarPropietarioModule { }
