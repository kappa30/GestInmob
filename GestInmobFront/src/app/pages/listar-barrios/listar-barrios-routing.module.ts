import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarBarriosComponent } from './listar-barrios.component';

const routes: Routes = [
  {path:"", component:ListarBarriosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarBarriosRoutingModule { }
