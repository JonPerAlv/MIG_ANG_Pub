
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { SharedModule } from './Reutilizable/shared/shared/shared.module';
import { LayoutComponent } from './Components/layout/layout.component';

import { LoginComponent } from './Components/login/login/login.component';
import { UsuarioInactivoComponent } from './Components/login/usuario-inactivo/usuario-inactivo.component';
import { SinServicioComponent } from './Components/login/sin-servicio/sin-servicio.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LoginComponent,
    SinServicioComponent,
    UsuarioInactivoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
