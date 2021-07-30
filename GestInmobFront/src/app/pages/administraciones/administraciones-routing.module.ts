import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministracionesComponent } from './administraciones.component';

const routes: Routes = [
  {path:"", component:AdministracionesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministracionesRoutingModule { }
