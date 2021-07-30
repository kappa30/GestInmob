import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CrearServiciosComponent } from './crear-servicios.component';
import { CrearServiciosRoutingModule } from './crear-servicios-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';

@NgModule({
  declarations: [
    CrearServiciosComponent
  ],
  imports: [
    CommonModule,
    CrearServiciosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    NavbarModule,
  ]
})
export class CrearServiciosModule { }
