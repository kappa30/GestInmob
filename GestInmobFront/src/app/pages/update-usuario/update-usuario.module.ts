import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UpdateUsuarioRoutingModule } from './update-usuario-routing.module';
import { UpdateUsuarioComponent } from './update-usuario.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    UpdateUsuarioComponent
  ],
  imports: [
    CommonModule,
    UpdateUsuarioRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCardModule,
    NavbarModule,
    MatIconModule
  ]
})
export class UpdateUsuarioModule { }
