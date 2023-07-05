import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { PersonaDTO } from 'src/app/Interfaces/persona-dto';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { PersonaService } from 'src/app/Services/persona.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import Swal from 'sweetalert2';
import { ModalPersonaDTOComponent } from '../Modales/modal-persona-dto/modal-persona-dto.component';


@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css'],
  providers: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule],
})
export class PersonaComponent implements AfterViewInit {
  displayedColumns: string[] = ['cCURP', 'cPrimerApellido', 'cSegundoApellido', 'cNombre', 'Editar','Eliminar'];
  MidataSource: MatTableDataSource<PersonaDTO>;
  formularioBusqueda: FormGroup;
  mostrarLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _personaServicio: PersonaService,
    private _utilidadServicio: UtilidadService


  ) {
 
    this.formularioBusqueda = this.fb.group({
      cCURP: [''],
      cPrimerApellido: [''],
      cSegundoApellido: [''],
      cNombre: ['']
    },

    ),

      this.MidataSource = new MatTableDataSource();
  }


  ngAfterViewInit() {
    this.MidataSource.paginator = this.paginator;
    this.MidataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.MidataSource.filter = filterValue.trim().toLowerCase();

    if (this.MidataSource.paginator) {
      this.MidataSource.paginator.firstPage();
    }
  }

  limpiarFormulario(): void {
    this.formularioBusqueda.reset();
    this.MidataSource = new MatTableDataSource();
    this._utilidadServicio.mostrarAlerta("Parametros de búsqueda limpiados", "OK!")

  }

  obtenerPersonas() {

    this.mostrarLoading = true;
    // const request: PersonaDTO = {

    //   cCURP: this.formularioBusqueda.value.cCURP,
    //   cPrimerApellido: this.formularioBusqueda.value.cPrimerApellido,
    //   cSegundoApellido: this.formularioBusqueda.value.cSegundoApellido,
    //   cNombre: this.formularioBusqueda.value.cNombre
    // }

    let request = this.formularioBusqueda.value as PersonaDTO;

    if (request.cCURP?.toString() != "" ||
      request.cPrimerApellido?.toString() != "" ||
      request.cSegundoApellido?.toString() != "" ||
      request.cNombre?.toString() != ""
    ) {
      this._personaServicio.lista(request).subscribe({
        next: (data) => {
          if (data.status)
            this.MidataSource.data = data.value;
          else
            this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops!")
        },
        complete: () => {
          this.mostrarLoading = false;
        },
        error: (e) => { }
      })
    }
    else {
      this._utilidadServicio.mostrarAlerta("Se requiere minimo un parametro de busqueda", "Verificar!")
      this.mostrarLoading = false;
    }
  }


  nuevoPersona() {
    this.dialog.open(ModalPersonaDTOComponent, {
      disableClose: true
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true")
        this.obtenerPersonas()
    });
  }

  editarPersona(persona: PersonaDTO) {
    this.dialog.open(ModalPersonaDTOComponent, {
      disableClose: true,
      data: persona
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true")
        this.obtenerPersonas()
    });
  }

  eliminarPersona(persona: PersonaDTO) {

    Swal.fire({
      title: '¿Desea eliminar la siguiente persona?',
      text: persona.cCURP +" < - > "+ persona.cPrimerApellido+" "+persona.cSegundoApellido+" "+persona.cNombre,
      
      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText:
      '<i class="fa fa-thumbs-up"></i> Si, eliminar!',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText: 
      '<i class="fa fa-arrow-left"></i> No, volver'
    }).then((resultado) => {

      if (resultado.isConfirmed) {

        const _iCveRegistroPersona: number = persona.iCveRegistroPersona ?? 0;


        if (_iCveRegistroPersona > 0) {
          // Hacer algo con miVariable, sabiendo que no es undefined


          this._personaServicio.eliminar(_iCveRegistroPersona).subscribe({
            next: (data) => {

              if (data.status) {
                this._utilidadServicio.mostrarAlerta("La Persona fue eliminada", "Listo!");
                this.obtenerPersonas();
              } else
                this._utilidadServicio.mostrarAlerta("No se pudo eliminar la persona", "Error MSSQL");

            },
            error: (e) => { }
          })
        }
      }

    })

  }

}

