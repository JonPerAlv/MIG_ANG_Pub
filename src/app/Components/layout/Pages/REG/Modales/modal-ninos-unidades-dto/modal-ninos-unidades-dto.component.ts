import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CatEstatusNinoDTO } from 'src/app/Interfaces/cat-estatus-nino-dto';
import { NinosUnidadesDTO } from 'src/app/Interfaces/ninos-unidades-dto';
import { VUnidadesNinosDTO } from 'src/app/Interfaces/v-unidades-ninos-dto';

import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment'; 

import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { NinosUnidadesService } from 'src/app/Services/ninos-unidades.service';


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
  selector: 'app-modal-ninos-unidades-dto',
  templateUrl: './modal-ninos-unidades-dto.component.html',
  styleUrls: ['./modal-ninos-unidades-dto.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],

})


export class ModalNinosUnidadesDTOComponent implements OnInit {
  formularioNinosUnidadesDTO: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";
  listaEstatus: CatEstatusNinoDTO[] = [];


  constructor(
    private modalActual: MatDialogRef<ModalNinosUnidadesDTOComponent>,
    @Inject(MAT_DIALOG_DATA) public datosNinosUnidadesDTO: VUnidadesNinosDTO,
    private fb: FormBuilder,
    private _ninosUnidadesService: NinosUnidadesService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioNinosUnidadesDTO = this.fb.group({
      cCURP: ['',Validators.required],
      cPrimerApellido: ['',Validators.required],
      cSegundoApellido: [''],
      cNombre: ['',Validators.required],
      dFechaIngreso: ['', [Validators.required]],
      iCveCatEstatusNino: ['', [Validators.required]],
      cDiagnosticoIngreso:['',Validators.required],

    });

    if (this.datosNinosUnidadesDTO != null) {

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

    this._ninosUnidadesService.leerCatEstatusNino().subscribe({
      next: (data) => {
        if(data.status) this.listaEstatus = data.value
      },
      error:(e) =>{}
})

  }

  ngOnInit(): void {
    if (this.datosNinosUnidadesDTO != null) {

      const formattedDate = moment(this.datosNinosUnidadesDTO.dFechaIngreso).format('YYYY-MM-DD');


      this.formularioNinosUnidadesDTO.patchValue({

        iCveCatEstatusNino: this.datosNinosUnidadesDTO.iCveCatEstatusNino,

        cCURP: this.datosNinosUnidadesDTO.cCURP,
        cPrimerApellido: this.datosNinosUnidadesDTO.cPrimerApellido,
        cSegundoApellido: this.datosNinosUnidadesDTO.cSegundoApellido,
        cNombre: this.datosNinosUnidadesDTO.cNombre,
        cDiagnosticoIngreso: this.datosNinosUnidadesDTO.cDiagnosticoIngreso,
        dFechaIngreso: formattedDate,



      });

    }
  }

  guardarEditar_NinosUnidadesDTO() {

    const usuario = this._utilidadServicio.obtenerSesionUsuario();

  
    const _nino: VUnidadesNinosDTO = {
      iCveRegistroPersona: this.datosNinosUnidadesDTO == null ? 0 : this.datosNinosUnidadesDTO.iCveRegistroPersona,
      cCURP: this.formularioNinosUnidadesDTO.value.cCURP,
      cPrimerApellido: this.formularioNinosUnidadesDTO.value.cPrimerApellido,
      cSegundoApellido: this.formularioNinosUnidadesDTO.value.cSegundoApellido,
      cNombre: this.formularioNinosUnidadesDTO.value.cNombre,
      iCveCatEstatusNino: this.formularioNinosUnidadesDTO.value.iCveCatEstatusNino,
      cDiagnosticoIngreso: this.formularioNinosUnidadesDTO.value.cDiagnosticoIngreso,
      dFechaIngreso: this.formularioNinosUnidadesDTO.value.dFechaIngreso,

      iCveUnica: usuario.iCveUnica
    }

   

    if (this.datosNinosUnidadesDTO == null) {

      this._ninosUnidadesService.registro(_nino).subscribe({
        next: (data) => {
          if (data.status) {
            this.modalActual.close("true")
          } 
            this._utilidadServicio.mostrarAlerta(data.msg, "!")
        },
        error: (e) => { }
      })

    } else {


      const _ninoDTO: NinosUnidadesDTO = {
        iCveRegistroPersona: _nino.iCveRegistroPersona,
        iCveCatEstatusNino: _nino.iCveCatEstatusNino,
        cDiagnosticoIngreso:  _nino.cDiagnosticoIngreso,
        dFechaIngreso:  _nino.dFechaIngreso,
        iCveUnica:  _nino.iCveUnica
      } 

    


      this._ninosUnidadesService.editar(_ninoDTO).subscribe({
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
  isIcveCatEstatusNinoInvalid(): boolean {
    const control = this.formularioNinosUnidadesDTO.get('iCveCatEstatusNino');
    return control?.value === '0' || control?.value === null;
  }
}
