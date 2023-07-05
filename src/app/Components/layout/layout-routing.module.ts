import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LayoutComponent } from './layout.component';
import { GCGuardEventosComponent } from './Pages/GC/gc-guard-eventos/gc-guard-eventos.component';
import { GCGuardFaltasComponent } from './Pages/GC/gc-guard-faltas/gc-guard-faltas.component';
import { GCGuardRedNegativaComponent } from './Pages/GC/gc-guard-red-negativa/gc-guard-red-negativa.component';
import { GCGuardValoracionMedicaComponent } from './Pages/GC/gc-guard-valoracion-medica/gc-guard-valoracion-medica.component';
import { NinosUnidadesComponent } from './Pages/REG/ninos-unidades/ninos-unidades.component';
import { PersonaComponent } from './Pages/REG/persona/persona.component';
import { PersonalUnidadesComponent } from './Pages/REG/personal-unidades/personal-unidades.component';
import { MIGGuardInicioComponent } from './Pages/MIG/mig-guard-inicio/mig-guard-inicio.component';
import { MIGOOADInicioComponent } from './Pages/MIG/mig-ooad-inicio/mig-ooad-inicio.component';
import { MIGNCInicioComponent } from './Pages/MIG/mig-nc-inicio/mig-nc-inicio.component';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { LoginComponent } from '../login/login/login.component';
import { InicioComponent } from './Pages/MIG/inicio/inicio.component';


function VerificarComponenteInicio(utilidadService: UtilidadService): import("@angular/core").Type<any> | undefined {
  const usuario = utilidadService.obtenerSesionUsuario();

  if (usuario !== null && usuario !== undefined) {
    if (usuario.iCveUnica > 0) {
      return MIGGuardInicioComponent;
    } else {
      if (usuario.cCveDelegacion !== '09') {
        return MIGOOADInicioComponent;
      } else {
        return MIGNCInicioComponent;
      }
    }
  } else {
    return LoginComponent;
  }
}

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [

 
    {path:'',component:InicioComponent,pathMatch:"full"},

    { path: 'Inicio', component: InicioComponent },//,canActivate:[AuthGuard]},


    //Inicio
    { path: 'MIGGuardInicio', component: MIGGuardInicioComponent },//,canActivate:[AuthGuard]},
    { path: 'MIGOOADInicio', component: MIGOOADInicioComponent },//,canActivate:[AuthGuard]},
    { path: 'MIGNCInicio', component: MIGNCInicioComponent },//,canActivate:[AuthGuard]},

    //
    { path: 'ninosunidades', component: NinosUnidadesComponent },//,canActivate:[AuthGuard]},
    { path: 'persona', component: PersonaComponent },//,canActivate:[AuthGuard]},
    { path: 'personalunidades', component: PersonalUnidadesComponent },//,canActivate:[AuthGuard]},

    //GC
    { path: 'GC_Faltas', component: GCGuardFaltasComponent },//,canActivate:[AuthGuard]},
    { path: 'GC_ValoracionMedica', component: GCGuardValoracionMedicaComponent },//,canActivate:[AuthGuard]},
    { path: 'GC_RedNegativa', component: GCGuardRedNegativaComponent },//,canActivate:[AuthGuard]},
    { path: 'GC_Eventos', component: GCGuardEventosComponent },//,canActivate:[AuthGuard]},

  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }



