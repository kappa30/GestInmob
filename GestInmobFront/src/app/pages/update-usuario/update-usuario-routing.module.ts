import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUsuarioComponent } from './update-usuario.component';

const routes: Routes = [
  {path:"", component:UpdateUsuarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateUsuarioRoutingModule { }
