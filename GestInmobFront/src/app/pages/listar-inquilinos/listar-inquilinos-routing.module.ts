import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarInquilinosComponent } from './listar-inquilinos.component';

const routes: Routes = [
  {path:"", component:ListarInquilinosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarInquilinosRoutingModule { }
