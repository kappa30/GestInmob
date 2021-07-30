import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { PaginaInicioComponent } from './pagina-inicio.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatGridListModule} from '@angular/material/grid-list';
const routes: Routes = [
  {path:"", component:PaginaInicioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule,
    MatMenuModule,
    MatGridListModule
    
  ]
})
export class PaginaInicioRoutingModule { }
