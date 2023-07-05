import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatEstatusPersonalDTO } from 'src/app/Interfaces/cat-estatus-personal-dto';
import { PersonalUnidadesDTO } from 'src/app/Interfaces/personal-unidades-dto';
import { VUnidadesPersonalDTO } from 'src/app/Interfaces/v-unidades-personal-dto';

import { MAT_DATE_FORMATS } from '@angular/material/core';

import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { PersonalUnidadesService } from 'src/app/Services/personal-unidades.service';


export const MY_DATE_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'YYYY',
  },
};


@Component({
  selector: 'app-modal-personal-unidades-dto',
  templateUrl: './modal-personal-unidades-dto.component.html',
  styleUrls: ['./modal-personal-unidades-dto.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],

})


export class ModalPersonalUnidadesDTOComponent implements OnInit {
  formularioPersonalUnidadesDTO: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaEstatus: CatEstatusPersonalDTO[] = [];


  constructor(
    private modalActual: MatDialogRef<ModalPersonalUnidadesDTOComponent>,
    @Inject(MAT_DIALOG_DATA) public datosPersonalUnidadesDTO: VUnidadesPersonalDTO,
    private fb: FormBuilder,
    private _personalUnidadesService: PersonalUnidadesService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioPersonalUnidadesDTO = this.fb.group({
      cCURP: ['',Validators.required],
      cPrimerApellido: ['',Validators.required],
      cSegundoApellido: [''],
      cNombre: ['',Validators.required],
      iCveCatEstatusPersonal: ['0',Validators.required],

    });

    if (this.datosPersonalUnidadesDTO != null) {

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this._personalUnidadesService.leerCatEstatusPersonal().subscribe({
      next: (data) => {
        if(data.status) this.listaEstatus = data.value
      },
      error:(e) =>{}
})

  }

  ngOnInit(): void {
    if (this.datosPersonalUnidadesDTO != null) {



      this.formularioPersonalUnidadesDTO.patchValue({

        iCveCatEstatusPersonal: this.datosPersonalUnidadesDTO.iCveCatEstatusPersonal,

        cCURP: this.datosPersonalUnidadesDTO.cCURP,
        cPrimerApellido: this.datosPersonalUnidadesDTO.cPrimerApellido,
        cSegundoApellido: this.datosPersonalUnidadesDTO.cSegundoApellido,
        cNombre: this.datosPersonalUnidadesDTO.cNombre,



      });

    }
  }

  guardarEditar_PersonalUnidadesDTO() {

    const usuario = this._utilidadServicio.obtenerSesionUsuario();

  
    const _personal: VUnidadesPersonalDTO = {
      iCveRegistroPersona: this.datosPersonalUnidadesDTO == null ? 0 : this.datosPersonalUnidadesDTO.iCveRegistroPersona,
      cCURP: this.formularioPersonalUnidadesDTO.value.cCURP,
      cPrimerApellido: this.formularioPersonalUnidadesDTO.value.cPrimerApellido,
      cSegundoApellido: this.formularioPersonalUnidadesDTO.value.cSegundoApellido,
      cNombre: this.formularioPersonalUnidadesDTO.value.cNombre,
      iCveCatEstatusPersonal: this.formularioPersonalUnidadesDTO.value.iCveCatEstatusPersonal,

      iCveUnica: usuario.iCveUnica
    }

   

    if (this.datosPersonalUnidadesDTO == null) {

      this._personalUnidadesService.registro(_personal).subscribe({
        next: (data) => {
          if (data.status) {
            this.modalActual.close("true")
          } 
            this._utilidadServicio.mostrarAlerta(data.msg, "!")
        },
        error: (e) => { }
      })

    } else {


      const _personalDTO: PersonalUnidadesDTO = {
        iCveRegistroPersona: _personal.iCveRegistroPersona,
        iCveCatEstatusPersonal: _personal.iCveCatEstatusPersonal,
        iCveUnica:  _personal.iCveUnica
      } 

      


      this._personalUnidadesService.editar(_personalDTO).subscribe({
        next: (data) => {
          if (data.status) {
            this.modalActual.close("true")
          } 
          
            this._utilidadServicio.mostrarAlerta(data.msg, "!")
        },
        error: (e) => { }
      })
    }

  }

}
