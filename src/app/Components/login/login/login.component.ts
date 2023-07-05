import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { MIGUsuariosLoginDTO } from 'src/app/Interfaces/migusuarios-login-dto';




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formularioLogin: FormGroup;
  ocultarPassword: boolean = true;
  mostrarLoading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private _usuarioServicio: UsuarioService,
    private _utilidadServicio: UtilidadService
  ) {
    this.formularioLogin = this.fb.group({
      cUsuario: ['', Validators.required],
      cPassword: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    if (this._utilidadServicio.existeToken() )
    {
      if (this._utilidadServicio.tokenActivo() )
      {
        this.router.navigate(["pages/Inicio"])
      }
      else
      {
        this._utilidadServicio.eliminarSesionUsuario() 
      }
    }
    else
    {
      this._utilidadServicio.eliminarSesionUsuario() 
    }
   }

  iniciarSesion() {

    this.mostrarLoading = true;

    const request: MIGUsuariosLoginDTO = {
      cUsuario: this.formularioLogin.value.cUsuario,
      cPassword: this.formularioLogin.value.cPassword
    }

    this._usuarioServicio.iniciarSesion(request).subscribe({
      next: (data) => {
        if (data.status) {
          this._utilidadServicio.guardarSesionUsuario(data.value);
          this.router.navigate(["pages"])
        } else
          this._utilidadServicio.mostrarAlerta("Usuario/Contraseña invalido", "Error!")

      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: () => {
        this._utilidadServicio.mostrarAlerta("Hubo un error", "Opps!")

      }
    })


  }



}
