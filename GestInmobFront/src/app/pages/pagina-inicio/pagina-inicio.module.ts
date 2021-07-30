import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginaInicioRoutingModule } from './pagina-inicio-routing.module';
import { PaginaInicioComponent } from './pagina-inicio.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { NavbarModule } from 'src/app/components/navbar/navbar.module';




@NgModule({
  declarations: [
    PaginaInicioComponent,
    
    
  ],
  imports: [
    CommonModule,
    PaginaInicioRoutingModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatSidenavModule,
    NavbarModule
    
  
    ],
    exports:[
      PaginaInicioComponent
    ]
})
export class PaginaInicioModule { }
