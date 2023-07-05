import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { VUnidadesDTO } from 'src/app/Interfaces/vunidades-dto';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { UnidadesService } from 'src/app/Services/unidades.service';
import { MatExpansionModule } from '@angular/material/expansion';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  cUsuario: string = '';
  cDescRol: string = '';
  cUnidadCompleta: string = '';
  mostrarUnidad: boolean = false;


  constructor(
    private router: Router,
    private _utilidadServicio: UtilidadService,
    private _unidadService: UnidadesService,

  ) { }




  ngOnInit(): void {

    const usuario = this._utilidadServicio.obtenerSesionUsuario();

    if (usuario != null) {

      this.cUsuario = usuario.cUsuario;
      this.cDescRol = usuario.cDescRol;

      
      if (usuario.iCveUnica > 0) {
        this.mostrarUnidad = true;

         const request: VUnidadesDTO = {
           iCveUnica: usuario.iCveUnica,
         }

         const unidad = this._unidadService.leerUnidadesCompleto(request).subscribe({
           next: (data) => {
        
             if (data.status) {
              
               this.cUnidadCompleta = data.value[0].cCveEsquema +"-"+ data.value[0].cCveNumeroUnidad +"  ->  "+ data.value[0].cNombreGuarderia;
             }
           },
         })

         
      }
      else {
        this.mostrarUnidad = false;
      }
    }

  }


  cerrarSesion() {
    this._utilidadServicio.eliminarSesionUsuario();

    this.router.navigate(['/login']);

  }


}
