import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PropiedadesComponent } from './propiedades.component';
import { PropiedadesRoutingModule } from './propiedades-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    PropiedadesComponent
  ],
  imports: [
    CommonModule,
    PropiedadesRoutingModule,
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
export class PropiedadesModule { }
