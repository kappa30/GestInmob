import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearServiciosComponent } from './crear-servicios.component';

const routes: Routes = [
  {path:"", component:CrearServiciosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CrearServiciosRoutingModule { }
