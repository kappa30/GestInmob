import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PropietariosRoutingModule } from './propietarios-routing.module';
import { PropietariosComponent } from './propietarios.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';



@NgModule({
  declarations: [
    PropietariosComponent
  ],
  imports: [
    CommonModule,
    PropietariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    NavbarModule
  ]
})
export class PropietariosModule { }
