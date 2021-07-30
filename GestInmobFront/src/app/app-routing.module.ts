import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosModule } from './pages/usuarios/usuarios.module';
import { LoginModule } from './pages/login/login.module';
import { UpdateUsuarioModule } from './pages/update-usuario/update-usuario.module';
import { AuthGuard } from './guards/auth.guard';
import { PaginaInicioModule } from './pages/pagina-inicio/pagina-inicio.module';
import { PropietariosModule } from 'src/app/pages/propietarios/propietarios.module';
import { InquilinosModule } from './pages/inquilinos/inquilinos.module';
import { PropiedadesModule } from 'src/app/pages/propiedades/propiedades.module';
import { MantenimientoModule } from 'src/app/pages/mantenimiento/mantenimiento.module';
import { AdministracionesModule } from './pages/administraciones/administraciones.module';
import { HomeComponent } from './pages/home/home.component';
import { CrearPropietarioModule } from './pages/crear-propietario/crear-propietario.module';
import { ListarPropietariosModule } from 'src/app/pages/listar-propietarios/listar-propietarios.module';
import { EditarPropietarioModule } from './pages/editar-propietario/editar-propietario.module';
import { ListarServiciosModule } from 'src/app/pages/listar-servicios/listar-servicios.module';
import { ListarBarriosModule } from 'src/app/pages/listar-barrios/listar-barrios.module';
import { EditarBarriosModule } from 'src/app/pages/editar-barrios/editar-barrios.module';
import { CrearBarriosModule } from 'src/app/pages/crear-barrios/crear-barrios.module';
import { CrearServiciosModule } from 'src/app/pages/crear-servicios/crear-servicios.module';
import { EditarServiciosModule } from 'src/app/pages/editar-servicios/editar-servicios.module';
import { ListarInquilinosModule } from 'src/app/pages/listar-inquilinos/listar-inquilinos.module';
import { EditarInquilinoModule } from 'src/app/pages/editar-inquilino/editar-inquilino.module';
import { CrearInquilinoModule } from 'src/app/pages/crear-inquilino/crear-inquilino.module';
import { CrearUsuarioModule } from 'src/app/pages/crear-usuario/crear-usuario.module';



const routes: Routes = [
    {
    path: "",
    component: HomeComponent
    },
    {
      path:"paginaInicio",
      loadChildren:()=> import('src/app/pages/pagina-inicio/pagina-inicio.module').then(m=>PaginaInicioModule),
      canActivate:[AuthGuard]
    },
    {
      path:"usuarios",
      loadChildren:()=> import('src/app/pages/usuarios/usuarios.module').then(m=>UsuariosModule),
      canActivate:[AuthGuard]
    },
    {
      path:"login",
      loadChildren:()=> import('src/app/pages/login/login.module').then(m=>LoginModule)
    },
    {
      path:"updateUsuario",
      loadChildren:()=> import('src/app/pages/update-usuario/update-usuario.module').then(m=>UpdateUsuarioModule),
      canActivate:[AuthGuard]
    },
    {
      path:"createUsuario",
      loadChildren:()=> import('src/app/pages/crear-usuario/crear-usuario.module').then(m=>CrearUsuarioModule),
      // canActivate:[AuthGuard]
    },
    {
      path:"propietarios",
      loadChildren:()=> import('src/app/pages/propietarios/propietarios.module').then(m=>PropietariosModule),
      canActivate:[AuthGuard]
    },
    {
      path:"crearPropietarios",
      loadChildren:()=> import('src/app/pages/crear-propietario/crear-propietario.module').then(m=>CrearPropietarioModule),
      canActivate:[AuthGuard]
    },
    {
      path:"listarPropietarios",
      loadChildren:()=> import('src/app/pages/listar-propietarios/listar-propietarios.module').then(m=>ListarPropietariosModule),
      canActivate:[AuthGuard]
    },
    {
      path:"editarPropietarios/:ID_PROPIETARIO",
      loadChildren:()=> import('src/app/pages/editar-propietario/editar-propietario.module').then(m=>EditarPropietarioModule),
      // canActivate:[AuthGuard],
      data:{}
    },
    
    {
      path:"inquilinos",
      loadChildren:()=> import('src/app/pages/inquilinos/inquilinos.module').then(m=>InquilinosModule),
      canActivate:[AuthGuard]
    },
    {
      path:"crearInquilinos",
      loadChildren:()=> import('src/app/pages/crear-inquilino/crear-inquilino.module').then(m=>CrearInquilinoModule),
      canActivate:[AuthGuard]
    },
    {
      path:"listarInquilinos",
      loadChildren:()=> import('src/app/pages/listar-inquilinos/listar-inquilinos.module').then(m=>ListarInquilinosModule),
      canActivate:[AuthGuard]
    },
    {
      path:"editarInquilinos/:ID_INQUILINO",
      loadChildren:()=> import('src/app/pages/editar-inquilino/editar-inquilino.module').then(m=>EditarInquilinoModule),
      // canActivate:[AuthGuard],
      data:{}
    },
    {
      path:"propiedades",
      loadChildren:()=> import('src/app/pages/propiedades/propiedades.module').then(m=>PropiedadesModule),
      canActivate:[AuthGuard]
    },
    {
      path:"mantenimiento",
      loadChildren:()=> import('src/app/pages/mantenimiento/mantenimiento.module').then(m=>MantenimientoModule),
      canActivate:[AuthGuard]
    },
    {
      path:"listarServicios",
      loadChildren:()=> import('src/app/pages/listar-servicios/listar-servicios.module').then(m=>ListarServiciosModule),
      canActivate:[AuthGuard]
    },
    {
      path:"crearServicio",
      loadChildren:()=> import('src/app/pages/crear-servicios/crear-servicios.module').then(m=>CrearServiciosModule),
      canActivate:[AuthGuard]
    },
    {
      path:"editarServicio/:ID_SERVICIO",
      loadChildren:()=> import('src/app/pages/editar-servicios/editar-servicios.module').then(m=>EditarServiciosModule),
      // canActivate:[AuthGuard]
    },
    {
      path:"listarBarrios",
      loadChildren:()=> import('src/app/pages/listar-barrios/listar-barrios.module').then(m=>ListarBarriosModule),
      canActivate:[AuthGuard]
    },
    {
      path:"crearBarrios",
      loadChildren:()=> import('src/app/pages/crear-barrios/crear-barrios.module').then(m=>CrearBarriosModule),
      canActivate:[AuthGuard]
    },
    {
      path:"editarBarrios/:ID_BARRIO",
      loadChildren:()=> import('src/app/pages/editar-barrios/editar-barrios.module').then(m=>EditarBarriosModule),
      // canActivate:[AuthGuard]
    },
    {
      path:"administraciones",
      loadChildren:()=> import('src/app/pages/administraciones/administraciones.module').then(m=>AdministracionesModule),
      canActivate:[AuthGuard]
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
