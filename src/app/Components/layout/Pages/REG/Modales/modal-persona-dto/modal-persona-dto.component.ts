import { Component, OnInit, Inject } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { PersonaDTO } from 'src/app/Interfaces/persona-dto';
import { PersonaService } from 'src/app/Services/persona.service';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';

@Component({
  selector: 'app-modal-persona-dto',
  templateUrl: './modal-persona-dto.component.html',
  styleUrls: ['./modal-persona-dto.component.css']
})
export class ModalPersonaDTOComponent implements OnInit {
  formularioPersonaDTO: FormGroup;
  tituloAccion: string = "Agregar";
  botonAccion: string = "Guardar";


  constructor(
    private modalActual: MatDialogRef<ModalPersonaDTOComponent>,
    @Inject(MAT_DIALOG_DATA) public datosPersonaDTO: PersonaDTO,
    private fb: FormBuilder,
    private _personaServicio: PersonaService,
    private _utilidadServicio: UtilidadService
  ) {

    this.formularioPersonaDTO = this.fb.group({
      cCURP: ['',Validators.required],
      cPrimerApellido: ['',Validators.required],
      cSegundoApellido: [''],
      cNombre: ['',Validators.required]
    });

    if (this.datosPersonaDTO != null) {

      this.tituloAccion = "Editar";
      this.botonAccion = "Actualizar";
    }

  }

  ngOnInit(): void {
    if (this.datosPersonaDTO != null) {
      this.formularioPersonaDTO.patchValue({


        cCURP: this.datosPersonaDTO.cCURP,
        cPrimerApellido: this.datosPersonaDTO.cPrimerApellido,
        cSegundoApellido: this.datosPersonaDTO.cSegundoApellido,
        cNombre: this.datosPersonaDTO.cNombre,

      });

    }
  }

  guardarEditar_PersonaDTO() {

    const _persona: PersonaDTO = {
      iCveRegistroPersona: this.datosPersonaDTO == null ? 0 : this.datosPersonaDTO.iCveRegistroPersona,
      cCURP: this.formularioPersonaDTO.value.cCURP,
      cPrimerApellido: this.formularioPersonaDTO.value.cPrimerApellido,
      cSegundoApellido: this.formularioPersonaDTO.value.cSegundoApellido,
      cNombre: this.formularioPersonaDTO.value.cNombre,
    }

    if (this.datosPersonaDTO == null) {

      this._personaServicio.registro(_persona).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("La persona fue registrada correctamente", "Exito");
            this.modalActual.close("true")
          } else
            this._utilidadServicio.mostrarAlerta(data.msg, "Error")
        },
        error: (e) => { }
      })

    } else {

      this._personaServicio.editar(_persona).subscribe({
        next: (data) => {
          if (data.status) {
            this._utilidadServicio.mostrarAlerta("La persona fue editada correctamente", "Exito");
            this.modalActual.close("true")
          } else
            this._utilidadServicio.mostrarAlerta("No se pudo editar la persona", "Error")
        },
        error: (e) => { }
      })
    }

  }

}
