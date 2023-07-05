import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';

import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { GCService } from 'src/app/Services/gc.service';
import { GCValoracionMedicaCatMomentoDTO } from 'src/app/Interfaces/gc-valoracion-medica-cat-momento-dto';
import { GCValoracionMedicaCatSintomasDTO } from 'src/app/Interfaces/gc-valoracion-medica-cat-sintomas-dto';
import { VGCValoracionMedicaDTO } from 'src/app/Interfaces/v-gc-valoracion-medica-dto';
import { GCEventoValoracionMedicaSintomasDTO } from 'src/app/Interfaces/gc-evento-valoracion-medica-sintomas-dto';
import { MY_DATE_FORMATS } from 'src/app/Reutilizable/date-format';
import { VGCFaltasDTO } from 'src/app/Interfaces/v-gc-faltas-dto';

@Component({
  selector: 'app-modal-gcguard-seguimientos',
  templateUrl: './modal-gcguard-seguimientos.component.html',
  styleUrls: ['./modal-gcguard-seguimientos.component.css'],
  providers: [{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMATS }],
  encapsulation: ViewEncapsulation.None,
})


export class ModalGCGuardSeguimientosComponent implements OnInit {
  frmValoracion: FormGroup;
  frmListaCheckSintomas: FormGroup;



  tituloAccion: string = 'Registro de Seguimiento';
  botonAccion: string = 'Registrar';

  listaMomentoValoracion: GCValoracionMedicaCatMomentoDTO[] = [];
  listaSintomas: GCValoracionMedicaCatSintomasDTO[] = [];
  DetalleValoracion!: VGCValoracionMedicaDTO;
  ValoracionExistente!: VGCValoracionMedicaDTO;

  formattedDate = moment(new Date).format('YYYY-MM-DD');

  constructor(
    private modalActual: MatDialogRef<ModalGCGuardSeguimientosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { iCveRegistroEvento: number, iCveTipoPersona: number, registro: VGCValoracionMedicaDTO },
    private fb: FormBuilder,
    private _gCService: GCService,
    private _utilidadServicio: UtilidadService
  ) {

    this.frmListaCheckSintomas = this.fb.group({
      sintomasSeleccionados: [[], Validators.required]
    });

    this.frmValoracion = this.fb.group({
      cCURP: new FormControl({ value: '', disabled: true }),
      cPrimerApellido: new FormControl({ value: '', disabled: true }),
      cSegundoApellido: new FormControl({ value: '', disabled: true }),
      cNombre: new FormControl({ value: '', disabled: true }),
      umf: [''],
      dFechaEvento: new FormControl({ value: new Date(), disabled: true }),
      iCveMomento: ['0', [Validators.required]],
      bUrgencias: [false],
      bERAG: [false],
      sintomasSeleccionados: ['', [Validators.required]],
    });
  }

  async cargarDatosIniciales() {
    return new Promise<void>((resolve, reject) => {

      this._gCService.leerListaValoracionCatMomento().subscribe({
        next: (data) => {
          if (data.status) this.listaMomentoValoracion = data.value
        },
        error: (e) => { }
      })


      if (this.data.iCveTipoPersona !== null && this.data.iCveTipoPersona !== 0) {
        this._gCService.leerListaValoracionCatSintomas(this.data.iCveTipoPersona).subscribe({
          next: (data) => {
            if (data.status) {
              this.listaSintomas = data.value
            }
          },
          error: (e) => { }
        })
      }
      if (this.data.iCveRegistroEvento !== null && this.data.iCveRegistroEvento !== 0) {
        this.tituloAccion = "Editar Seguimiento";
        this.botonAccion = "Actualizar";

        this._gCService.leerDetalleValoracion(this.data.iCveRegistroEvento).subscribe({
          next: (data) => {
            if (data.status) {
              this.DetalleValoracion = data.value || {};

              this._gCService.leerListaValoracionSintomasRegistrados(this.data.iCveRegistroEvento).subscribe({
                next: (data) => {
                  if (data.status) {
                    const sintomasRegistrados = data.value;

                    this.frmListaCheckSintomas.patchValue({
                      sintomasSeleccionados: this.listaSintomas.filter(sintoma =>
                        sintomasRegistrados.find((registrado: any) => registrado.iCveSintoma === sintoma.iCveSintoma)
                      )
                    });
                  }
                },
                error: (e) => {
                }
              });


              resolve();
            } else {
              reject();
            }
          },
          error: (e) => {
            reject();
          }
        });
      } else {
        resolve();
      }
    });
  }

  async ngOnInit() {
    try {
      await this.cargarDatosIniciales();



      if (this.data.iCveTipoPersona !== null) {

        this.frmValoracion.patchValue({
          cCURP: this.data.registro.cCURP,
          cPrimerApellido: this.data.registro.cPrimerApellido,
          cSegundoApellido: this.data.registro.cSegundoApellido,
          cNombre: this.data.registro.cNombre,
          dFechaEvento: this.formattedDate,
        });

        if (this.data.iCveRegistroEvento !== null) {
          this.frmValoracion.patchValue({
            iCveMomento: this.DetalleValoracion.iCveMomento,
            bERAG: this.DetalleValoracion.bERAG,
            bUrgencias: this.DetalleValoracion.bUrgencias,
            umf: this.DetalleValoracion.umf,
            iCveRegistroEvento: this.data.iCveRegistroEvento
          });
        }

        this.frmValoracion.get('bUrgencias')?.valueChanges.subscribe((value) => {
          const UMFControl = this.frmValoracion.get('umf');
          if (value) {
            UMFControl?.enable();
            UMFControl?.setValidators([Validators.required]);

          } else {
            UMFControl?.disable();
            UMFControl?.clearValidators();
            UMFControl?.setValue('');
          }
          UMFControl?.updateValueAndValidity();

        });
      }
      else {
        this.modalActual.close('true')
        this._utilidadServicio.mostrarAlerta("Error en selección de Tipo de Persona = null", "!")
      }

    } catch (error) {

    }

  }

  guardarEditar_registro() {
    const usuario = this._utilidadServicio.obtenerSesionUsuario();
    const fecha: Date = new Date();

    const _valoracion: VGCValoracionMedicaDTO = {
      iCveRegistroPersona: this.data.registro.iCveRegistroPersona,
      iCveMomento: this.frmValoracion.value.iCveMomento,
      dFechaEvento: fecha,
      iCveUnica: usuario.iCveUnica,
      bERAG: this.frmValoracion.value.bERAG,
      bUrgencias: this.frmValoracion.value.bUrgencias,
      umf: this.frmValoracion.value.umf,
    };

    if (this.DetalleValoracion === null || this.DetalleValoracion === undefined) {
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

      this._gCService.buscarValoracion(_valoracionBusqueda).subscribe({
        next: (busquedaRepetida) => {
          if (busquedaRepetida.value === null || busquedaRepetida.value === undefined || busquedaRepetida.value === 0) {


            this._gCService.buscarFalta(_FaltaBusqueda).subscribe({
              next: (busquedaFalta) => {
                if (busquedaFalta.value === null || busquedaFalta.value === undefined || busquedaFalta.value === 0) {

                  this._gCService.registroValoracionMedica(_valoracion).subscribe({
                    next: (registroData) => {
                      if (registroData.status) {
      
                        this._gCService.buscarValoracion(_valoracionBusqueda).subscribe({
                          next: (busquedaData) => {
      
                            if (busquedaData.status) {
                              this.ValoracionExistente = busquedaData.value;
      
                              if (this.ValoracionExistente.iCveRegistroEvento) {
                                this._gCService.limpiarValoracionSintomas(this.ValoracionExistente.iCveRegistroEvento).subscribe({
                                  next: (data) => {
      
                                    if (data.status) {
      
                                      const observables = this.frmListaCheckSintomas.value.sintomasSeleccionados
                                        .map((element: GCValoracionMedicaCatSintomasDTO) => {
                                          const sintoma: GCEventoValoracionMedicaSintomasDTO = {
                                            iCveRegistroEvento: busquedaData.value.iCveRegistroEvento,
                                            dFechaRegistro: new Date(),
                                            dFechaUltimaActualizacion: new Date(),
                                            iCveSintoma: element.iCveSintoma,
                                            bValor: true,
                                          };
                                          return this._gCService.registroValoracionMedicaSintoma(sintoma);
                                        });
      
                                      forkJoin(observables).subscribe({
                                        next: (results) => {
                                          this.modalActual.close('true');
                                        },
                                        error: (e) => {
                                          this._utilidadServicio.mostrarAlerta(e.Message, '!');
                                        }
                                      });
      
      
                                    }
                                  }
                                })
                              }
      
                            }
                          }
                        });
                      }
                    },
                    error: (e) => {
                      this._utilidadServicio.mostrarAlerta(e.Message, '!');
                    }
                  });
      
      
                  
                }
                else {
                  this.modalActual.close()
                  this._utilidadServicio.mostrarAlerta("No se puede registrar Valoración Médica ya que cuenta con Falta en la misma fecha. Para registrarla debe eliminar antes el registro de Falta", "Error")
                }
      
              }
            })

            
          }
          else {
            this.modalActual.close()
            this._utilidadServicio.mostrarAlerta("No se puede registrar 2 registros de Valoración Médica en la misma fecha", "Error")
          }

        }
      })
    }
    else {
      const _valoracionDTO: VGCValoracionMedicaDTO = {
        iCveRegistroPersona: _valoracion.iCveRegistroPersona,
        iCveMomento: _valoracion.iCveMomento,
        dFechaEvento: _valoracion.dFechaEvento,
        iCveUnica: _valoracion.iCveUnica,
        iCveRegistroEvento: this.DetalleValoracion.iCveRegistroEvento,
        bERAG: _valoracion.bERAG,
        bUrgencias: _valoracion.bUrgencias,
        umf: _valoracion.umf,
      }
      this._gCService.editarValoracionMedica(_valoracionDTO).subscribe({
        next: (data) => {
          if (data.status) {
            if (_valoracionDTO.iCveRegistroEvento !== null && _valoracionDTO.iCveRegistroEvento !== undefined && _valoracionDTO.iCveRegistroEvento > 0) {
              if (this.ValoracionExistente.iCveRegistroEvento) {
                this._gCService.limpiarValoracionSintomas(_valoracionDTO.iCveRegistroEvento).subscribe({
                  next: (data) => {

                    if (data.status) {

                      const observables = this.frmListaCheckSintomas.value.sintomasSeleccionados
                        .map((element: GCValoracionMedicaCatSintomasDTO) => {
                          const sintoma: GCEventoValoracionMedicaSintomasDTO = {
                            iCveRegistroEvento: _valoracionDTO.iCveRegistroEvento,
                            dFechaRegistro: new Date(),
                            dFechaUltimaActualizacion: new Date(),
                            iCveSintoma: element.iCveSintoma,
                            bValor: true,
                          };
                          return this._gCService.registroValoracionMedicaSintoma(sintoma);
                        });

                      forkJoin(observables).subscribe({
                        next: (results) => {
                          this.modalActual.close('true');
                        },
                        error: (e) => {
                          this._utilidadServicio.mostrarAlerta(e.Message, '!');
                        }
                      });


                    }
                  }
                })
              }
            }

            this.modalActual.close("true")
          }
          this._utilidadServicio.mostrarAlerta(data.msg, "!")
        },
        error: (e) => { }
      })
    }
  }
}
