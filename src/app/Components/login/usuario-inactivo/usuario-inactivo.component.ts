import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/Services/usuario.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { MIGUsuariosLoginDTO } from 'src/app/Interfaces/migusuarios-login-dto';




@Component({
  selector: 'app-usuario-inactivo',
  templateUrl: './usuario-inactivo.component.html',
  styleUrls: ['./usuario-inactivo.component.css']
})
export class UsuarioInactivoComponent {

  mostrarLoading: boolean = false;

  constructor(private router: Router) {}


  RegresarLogin() {
    this.router.navigate(["login"])
  }



}
