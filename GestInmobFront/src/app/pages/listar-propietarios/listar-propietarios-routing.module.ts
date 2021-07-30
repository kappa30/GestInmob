import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarPropietariosComponent } from './listar-propietarios.component';

const routes: Routes = [
  {path:"", component:ListarPropietariosComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListarPropietariosRoutingModule { }
