import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { UnidadesService } from 'src/app/Services/unidades.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})


export class InicioComponent implements OnInit {

  constructor(
    private router: Router,
    private _utilidadServicio: UtilidadService,

  ) { }

  ngOnInit() {
    const usuario = this._utilidadServicio.obtenerSesionUsuario();
    //console.log({ 1: usuario })
    if (usuario === null) {
      //console.log({ 2: "usuario NULL" })
      this.router.navigate(['/login']);
    }
    else {
      //console.log({ 3: usuario.iCveUnica })
      if (usuario.iCveUnica > 0 && usuario.iCveUnica !== null) {
        //console.log({ 4: "usuario.iCveUnica > 0" })
        this.router.navigate(['pages/MIGGuardInicio']);
      }
      else {
        if (usuario.cCveDelegacion === "09") {
          //console.log({ 5: "usuario.cCveDelegacion = 09" })
          this.router.navigate(['pages/MIGNCInicio']);
        }
        else {
          //console.log({ 6: "usuario.cCveDelegacion <> 09" })
          this.router.navigate(['pages/MIGOOADInicio']);
        }
      }
    }
  }
}
