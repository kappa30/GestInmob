import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarServiciosComponent } from './listar-servicios.component';
const routes: Routes = [
  {path:"", component:ListarServiciosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarServiciosRoutingModule { }
