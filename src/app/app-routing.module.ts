import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login/login.component';
import { SinServicioComponent } from './Components/login/sin-servicio/sin-servicio.component';
import { UsuarioInactivoComponent } from './Components/login/usuario-inactivo/usuario-inactivo.component';

const routes: Routes = [
  {path:'',component:LoginComponent,pathMatch:"full"},
  {path:'sinServicio',component:SinServicioComponent,pathMatch:"full"},
  {path:'usuarioInactivo',component:UsuarioInactivoComponent,pathMatch:"full"},
  {path:'login',component:LoginComponent,pathMatch:"full"},
  {path:'pages',loadChildren: () => import("./Components/layout/layout.module").then(m => m.LayoutModule)},
  {path:'**',redirectTo:'login',pathMatch:"full"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
