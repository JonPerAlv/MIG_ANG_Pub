import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { MatGridListModule } from '@angular/material/grid-list';
import Swal from 'sweetalert2';
import { GCEventoRedNegativaDTO } from 'src/app/Interfaces/gc-evento-red-negativa-dto';
import { GCService } from 'src/app/Services/gc.service';
import { VGCFaltasDTO } from 'src/app/Interfaces/v-gc-faltas-dto';
import { VGCValoracionMedicaDTO } from 'src/app/Interfaces/v-gc-valoracion-medica-dto';


@Component({
  selector: 'app-gc-guard-red-negativa',
  templateUrl: './gc-guard-red-negativa.component.html',
  styleUrls: ['./gc-guard-red-negativa.component.css'],
  providers: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule],
})
export class GCGuardRedNegativaComponent implements OnInit {
  displayedColumns: string[] = ['dFechaEvento', 'Eliminar'];
  MidataSource: MatTableDataSource<GCEventoRedNegativaDTO>;
  mostrarLoading: boolean = false;
  fechaActualG = new Date();
  fechaCortaG = `${this.fechaActualG.getDate()}/${this.fechaActualG.getMonth() + 1}/${this.fechaActualG.getFullYear()}`;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _utilidadServicio: UtilidadService,
    private _gcServicio: GCService

  ) {
    this.MidataSource = new MatTableDataSource();
  }


  compararFechasAHoy(dFechaEvento: string): boolean {
    const fechaEvento = new Date(dFechaEvento);
    const fechaActualG = new Date();
    return fechaEvento.toDateString() === fechaActualG.toDateString();
  }


  async ngOnInit() {
    await this.obtenerRN();
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
    this.MidataSource = new MatTableDataSource();
    this._utilidadServicio.mostrarAlerta("Parametros de búsqueda limpiados", "OK!")
  }

  async obtenerRN() {
    const usuario = this._utilidadServicio.obtenerSesionUsuario();

    this._gcServicio.buscarRN(usuario.iCveUnica).subscribe({
      next: (data) => {
        if (data.status)
          this.MidataSource.data = data.value;
        else
          this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops!")
      },
      complete: () => {
        this.mostrarLoading = false;
      },
      error: () => { }
    })
  }

  AgregarRN() {

    const fechaActual = new Date();
    const fechaCorta = `${fechaActual.getDate()}/${fechaActual.getMonth() + 1}/${fechaActual.getFullYear()}`;

    Swal.fire({
      title: '¿Desea registrar RED NEGATIVA?',
      text: "Fecha: " + fechaCorta,


      icon: "question",
      confirmButtonColor: '#3085d6',
      confirmButtonText:
        '<i class="fa fa-thumbs-up"></i> Si, registrar!',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText:
        '<i class="fa fa-arrow-left"></i> No, volver'
    }).then((resultado) => {

      if (resultado.isConfirmed) {
        const user = this._utilidadServicio.obtenerSesionUsuario();

        const DTO: GCEventoRedNegativaDTO = {
          dFechaEvento: new Date(),
          iCveUnica: user.iCveUnica,
        };







        const _valoracionBusqueda: VGCValoracionMedicaDTO = {
          dFechaEvento: DTO.dFechaEvento,
          iCveUnica: user.iCveUnica,
        };

        const _FaltaBusqueda: VGCFaltasDTO = {
          dFechaEvento: DTO.dFechaEvento,
          iCveUnica: user.iCveUnica,
        };

        this._gcServicio.conteoFalta(_FaltaBusqueda).subscribe({
          next: (busquedaFalta) => {
            console.log(busquedaFalta)
            if (busquedaFalta.value === null || busquedaFalta.value === undefined || busquedaFalta.value === 0) {

              this._gcServicio.conteoValoracionMedica(_valoracionBusqueda).subscribe({
                next: (busquedaValoracion) => {
                  console.log(busquedaValoracion)
                  if (busquedaValoracion.value === null || busquedaValoracion.value === undefined || busquedaValoracion.value === 0) {

                    this._gcServicio.registroRN(DTO).subscribe({
                      next: (data) => {

                        if (data.status) {
                          this._utilidadServicio.mostrarAlerta("RED Negativa Registrada correctamente", "Listo!");
                          this.obtenerRN();
                        } else
                          this._utilidadServicio.mostrarAlerta("No se pudo registrar Red Negativa", "Error MSSQL");

                      },
                      error: () => { }
                    })

                  }
                  else {
                    this._utilidadServicio.mostrarAlerta("No se puede registrar Red Negativa ya que cuenta con Valoración Médica en la misma fecha. Para registrarla debe eliminar antes el registro de la Valoración Médica", "Error")
                  }
                }
              });
            }
            else {
              this._utilidadServicio.mostrarAlerta("No se puede registrar Red Negativa ya que cuenta con Falta en la misma fecha. Para registrarla debe eliminar antes el registro de la Valoración Médica", "Error")
            }
          }
        });













      }
    })
  }

  EliminarRN() {

    Swal.fire({
      title: '¿Desea eliminar el registro de RED NEGATIVA?',
      text: "Fecha: " + new Date,

      icon: "warning",
      confirmButtonColor: '#3085d6',
      confirmButtonText:
        '<i class="fa fa-trash"></i> Si, eliminar!',
      showCancelButton: true,
      cancelButtonColor: '#d33',
      cancelButtonText:
        '<i class="fa fa-arrow-left"></i> No, volver'
    }).then((resultado) => {

      if (resultado.isConfirmed) {
        const usuario = this._utilidadServicio.obtenerSesionUsuario();

        this._gcServicio.eliminarRN(usuario.iCveUnica).subscribe({
          next: (data) => {

            if (data.status) {
              this._utilidadServicio.mostrarAlerta("RED Negativa eliminada correctamente", "Listo!");
              this.obtenerRN();
            } else
              this._utilidadServicio.mostrarAlerta("No se pudo eliminar Red Negativa", "Error MSSQL");

          },
          error: () => { }
        })
      }
    })
  }
}






