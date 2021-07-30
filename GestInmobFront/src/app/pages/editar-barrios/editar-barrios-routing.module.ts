import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarBarriosComponent } from './editar-barrios.component';

const routes: Routes = [
  {path:"", component:EditarBarriosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarBarriosRoutingModule { }
