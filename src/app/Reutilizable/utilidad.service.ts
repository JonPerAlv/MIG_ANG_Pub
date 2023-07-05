import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as moment from 'moment';



import { MIGUsuariosAccesoDTO } from '../Interfaces/migusuarios-acceso-dto';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilidadService {
  constructor(private _snackBar:MatSnackBar ) { 
  }


  mostrarAlerta(mensaje:string, tipo:string){

    this._snackBar.open(mensaje,tipo , {
      horizontalPosition:"center",
      verticalPosition:"bottom",
      duration:3000
    })
  }

  guardarSesionUsuario(usuarioSession:MIGUsuariosAccesoDTO){
    localStorage.setItem("usuario",JSON.stringify(usuarioSession));
  }

  obtenerSesionUsuario(){

    const dataCadena = localStorage.getItem("usuario");
    const usuario = JSON.parse(dataCadena!);
    return usuario;
  }

  eliminarSesionUsuario(){

    localStorage.clear();
    
  }
}
