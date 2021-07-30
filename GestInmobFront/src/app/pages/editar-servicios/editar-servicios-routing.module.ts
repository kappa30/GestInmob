import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarServiciosComponent } from './editar-servicios.component';
const routes: Routes = [
  {path:"", component:EditarServiciosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarServiciosRoutingModule { }
