import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { PersonalUnidadesService } from 'src/app/Services/personal-unidades.service';
import { PersonalUnidadesDTO } from 'src/app/Interfaces/personal-unidades-dto';
import { VUnidadesPersonalDTO } from 'src/app/Interfaces/v-unidades-personal-dto';
import { ModalPersonalUnidadesDTOComponent } from '../Modales/modal-personal-unidades-dto/modal-personal-unidades-dto.component';


@Component({
  selector: 'app-personal-unidades',
  templateUrl: './personal-unidades.component.html',
  styleUrls: ['./personal-unidades.component.css'],
  providers: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule],
})
export class PersonalUnidadesComponent implements AfterViewInit {
  displayedColumns: string[] = ['cCURP', 'cPrimerApellido', 'cSegundoApellido', 'cNombre','cDescEstatusUnidad', 'Editar'];
  MidataSource: MatTableDataSource<VUnidadesPersonalDTO>;
  formularioBusqueda: FormGroup;
  mostrarLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _personalService: PersonalUnidadesService,
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

  obtenerPersonal() {

    this.mostrarLoading = true;

    let request = this.formularioBusqueda.value as VUnidadesPersonalDTO;
    const usuario = this._utilidadServicio.obtenerSesionUsuario();

    request.iCveUnica = usuario.iCveUnica;

    if (request.cCURP?.toString() != "" ||
      request.cPrimerApellido?.toString() != "" ||
      request.cSegundoApellido?.toString() != "" ||
      request.cNombre?.toString() != ""
    ) {

      this._personalService.lista(request).subscribe({
        next: (data) => {
          if (data.status)

            if (!data.value)
            {
              this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops!")
            }
            else
            {
              this.MidataSource.data = data.value;
            }
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


  nuevoPersonal() {
    this.dialog.open(ModalPersonalUnidadesDTOComponent, {
      disableClose: true
    });
  }

  editarPersonal(Personal: PersonalUnidadesDTO) {
    this.dialog.open(ModalPersonalUnidadesDTOComponent, {
      disableClose: true,
      data: Personal
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true")
        this.obtenerPersonal()
    });
  }

  getRowClass(row: number): string {
    if (row === 3) {
      return 'inscrito';
    } else if (row === 4) {
      return 'baja';
    } else {
      return '';
    }
  }

}

