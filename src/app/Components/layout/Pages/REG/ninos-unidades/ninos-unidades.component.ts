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
import { NinosUnidadesService } from 'src/app/Services/ninos-unidades.service';
import { NinosUnidadesDTO } from 'src/app/Interfaces/ninos-unidades-dto';
import { VUnidadesNinosDTO } from 'src/app/Interfaces/v-unidades-ninos-dto';
import { ModalNinosUnidadesDTOComponent } from '../Modales/modal-ninos-unidades-dto/modal-ninos-unidades-dto.component';


@Component({
  selector: 'app-ninos-unidades',
  templateUrl: './ninos-unidades.component.html',
  styleUrls: ['./ninos-unidades.component.css'],
  providers: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule],
})
export class NinosUnidadesComponent implements AfterViewInit {
  displayedColumns: string[] = ['cCURP', 'cPrimerApellido', 'cSegundoApellido', 'cNombre','cDescEstatusUnidad','dFechaIngreso', 'Editar'];
  MidataSource: MatTableDataSource<VUnidadesNinosDTO>;
  formularioBusqueda: FormGroup;
  mostrarLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _ninoService: NinosUnidadesService,
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

  obtenerNinos() {

    this.mostrarLoading = true;

    let request = this.formularioBusqueda.value as VUnidadesNinosDTO;
    const usuario = this._utilidadServicio.obtenerSesionUsuario();

    request.iCveUnica = usuario.iCveUnica;

    if (request.cCURP?.toString() != "" ||
      request.cPrimerApellido?.toString() != "" ||
      request.cSegundoApellido?.toString() != "" ||
      request.cNombre?.toString() != ""
    ) {

      this._ninoService.lista(request).subscribe({
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


  nuevoNino() {
    this.dialog.open(ModalNinosUnidadesDTOComponent, {
      disableClose: true
    });
  }

  editarNino(Nino: NinosUnidadesDTO) {
    this.dialog.open(ModalNinosUnidadesDTOComponent, {
      disableClose: true,
      data: Nino
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true")
        this.obtenerNinos()
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

