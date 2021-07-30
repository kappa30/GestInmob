import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditarPropietarioComponent } from './editar-propietario.component';

const routes: Routes = [
  {path:"", component:EditarPropietarioComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditarPropietarioRoutingModule { }
