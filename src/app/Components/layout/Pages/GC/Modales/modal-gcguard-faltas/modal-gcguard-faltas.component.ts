import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';

import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { GCService } from 'src/app/Services/gc.service';
import { VGCValoracionMedicaDTO } from 'src/app/Interfaces/v-gc-valoracion-medica-dto';
import { MY_DATE_FORMATS } from 'src/app/Reutilizable/date-format';
import { VGCFaltasDTO } from 'src/app/Interfaces/v-gc-faltas-dto';
import { GCCatMotivoFaltaDTO } from 'src/app/Interfaces/gc_cat-motivo-falta-dto';


@Component({
  selector: 'app-modal-gcguard-faltas',
  templateUrl: './modal-gcguard-faltas.component.html',
  styleUrls: ['./modal-gcguard-faltas.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
})


export class ModalGCGuardFaltasComponent implements OnInit {
  formularioFalta: FormGroup;
  tituloAccion: string = "Registro de Falta";
  botonAccion: string = "Registrar";
  listaMotivosFalta: GCCatMotivoFaltaDTO[] = [];

  formattedDate = moment(new Date).format('YYYY-MM-DD');


  constructor(
    private modalActual: MatDialogRef<ModalGCGuardFaltasComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { iCveRegistroEvento: number, iCveTipoPersona: number, registro: VGCFaltasDTO },
    private fb: FormBuilder,
    private _gCService: GCService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioFalta = this.fb.group({

      cCURP: new FormControl({ value: '', disabled: true }),
      cPrimerApellido: new FormControl({ value: '', disabled: true }),
      cSegundoApellido: new FormControl({ value: '', disabled: true }),
      cNombre: new FormControl({ value: '', disabled: true }),
      dFechaEvento: new FormControl({ value: new Date, disabled: true }),
      iCveMotivoFalta: ['0', [Validators.required]],
      cHospital: [''],
      cObservacion: [''],
    });
  }

  async cargarDatosIniciales() {
    return new Promise<void>((resolve, reject) => {


      if (this.data.iCveRegistroEvento !== null && this.data.iCveRegistroEvento !== 0) {
        this.tituloAccion = "Editar Falta";
        this.botonAccion = "Actualizar";
      }

      this._gCService.leerListaCatMotivoFalta().subscribe({
        next: (data) => {
          if (data.status) {
            this.listaMotivosFalta = data.value
            resolve();
          }
        },
        error: (e) => {
          reject();
        }
      })



    });
  }

  async ngOnInit() {
    try {
      await this.cargarDatosIniciales();
      if (this.data.registro != null) {
        this.formularioFalta.patchValue({

          iCveMotivoFalta: this.data.registro.iCveMotivoFalta,
          cCURP: this.data.registro.cCURP,
          cPrimerApellido: this.data.registro.cPrimerApellido,
          cSegundoApellido: this.data.registro.cSegundoApellido,
          cNombre: this.data.registro.cNombre,
          cHospital: this.data.registro.cHospital,
          cObservacion: this.data.registro.cObservacion,
          dFechaEvento: this.formattedDate,
          iCveRegistroEvento: this.data.registro.iCveRegistroEvento
        });
      }
    }
    catch (error) {
    }
  }

  guardarEditar_NinosUnidadesDTO() {

    const usuario = this._utilidadServicio.obtenerSesionUsuario();
    const fecha: Date = new Date();

    const _falta: VGCFaltasDTO = {
      iCveRegistroPersona: this.data.registro.iCveRegistroPersona,
      iCveMotivoFalta: this.formularioFalta.value.iCveMotivoFalta,
      cHospital: this.formularioFalta.value.cHospital,
      cObservacion: this.formularioFalta.value.cObservacion,
      dFechaEvento: this.data.registro.dFechaEvento,
      iCveUnica: usuario.iCveUnica,
      iCveRegistroEvento: this.data.registro.iCveRegistroEvento
    }



    if (this.data.registro.iCveRegistroEvento === null) {

      const _valoracionBusqueda: VGCValoracionMedicaDTO = {
        iCveRegistroPersona: this.data.registro.iCveRegistroPersona,
        dFechaEvento: fecha,
        iCveUnica: usuario.iCveUnica,
      };

      const _FaltaBusqueda: VGCFaltasDTO = {
        iCveRegistroPersona: this.data.registro.iCveRegistroPersona,
        dFechaEvento: fecha,
        iCveUnica: usuario.iCveUnica,
      };

      this._gCService.buscarFalta(_FaltaBusqueda).subscribe({
        next: (busquedaFalta) => {
          if (busquedaFalta.value === null || busquedaFalta.value === undefined || busquedaFalta.value === 0) {
            this._gCService.buscarValoracion(_valoracionBusqueda).subscribe({
              next: (busquedaValoracion) => {
                if (busquedaValoracion.value === null || busquedaValoracion.value === undefined || busquedaValoracion.value === 0) {
                  this._gCService.registroFalta(_falta).subscribe({
                    next: (data) => {
                      if (data.status) {
                        this.modalActual.close("true")
                      }
                      this._utilidadServicio.mostrarAlerta(data.msg, "!")
                    },
                    error: (e) => { }
                  })
                }
                else {
                  this.modalActual.close()
                  this._utilidadServicio.mostrarAlerta("No se puede registrar Falta ya que cuenta con Valoración Médica en la misma fecha. Para registrarla debe eliminar antes el registro de la Valoración Médica", "Error")
                }
              }
            });
          }
          else {
            this.modalActual.close()
            this._utilidadServicio.mostrarAlerta("No se puede registrar 2 registros de Falta en la misma fecha", "Error")
          }
        }
      });
    }

    else {
      const _faltaDTO: VGCFaltasDTO = {
        iCveRegistroPersona: _falta.iCveRegistroPersona,
        iCveMotivoFalta: _falta.iCveMotivoFalta,
        cHospital: _falta.cHospital,
        cObservacion: _falta.cObservacion,
        dFechaEvento: _falta.dFechaEvento,
        iCveUnica: _falta.iCveUnica,
        iCveRegistroEvento: _falta.iCveRegistroEvento
      }

      this._gCService.editarFalta(_faltaDTO).subscribe({
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
