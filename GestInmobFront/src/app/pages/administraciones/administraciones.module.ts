import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministracionesComponent } from './administraciones.component';
import { AdministracionesRoutingModule } from './administraciones-routing.module';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdministracionesComponent
  ],
  imports: [
    CommonModule,
    AdministracionesRoutingModule,
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
export class AdministracionesModule { }
