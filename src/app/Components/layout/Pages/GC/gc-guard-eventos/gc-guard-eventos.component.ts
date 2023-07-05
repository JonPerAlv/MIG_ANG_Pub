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
import { GCService } from 'src/app/Services/gc.service';
import { MIGService } from 'src/app/Services/mig.service';
import Swal from 'sweetalert2';
import { VGCValoracionMedicaDTO } from 'src/app/Interfaces/v-gc-valoracion-medica-dto';
import { VSPGCEventosReadDTO } from 'src/app/Interfaces/vsp-gc-eventos-read-dto';
import { ModalGCGuardSeguimientosComponent } from '../Modales/modal-gcguard-seguimientos/modal-gcguard-seguimientos.component';
import * as moment from 'moment';


@Component({
  selector: 'app-gc-guard-eventos',
  templateUrl: './gc-guard-eventos.component.html',
  styleUrls: ['./gc-guard-eventos.component.css'],
  providers: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule],
})
export class GCGuardEventosComponent implements AfterViewInit {

  displayedColumns: string[] = ['cCURP', 'cPrimerApellido', 'cSegundoApellido', 'cNombre', 'cDescTipoEvento', 'dFechaEvento', 'Registrar', 'Editar', 'Eliminar'];
  MidataSource: MatTableDataSource<VGCValoracionMedicaDTO>;
  formularioBusqueda: FormGroup;
  mostrarLoading: boolean = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _gCService: GCService,
    private _utilidadServicio: UtilidadService,


  ) {

    this.formularioBusqueda = this.fb.group({
      cCURP: [''],
      cPrimerApellido: [''],
      cSegundoApellido: [''],
      cNombre: [''],
    },

    ),
      this.MidataSource = new MatTableDataSource()
  }



  ngAfterViewInit() {
    this.obtenerEventos() 
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
    this.obtenerEventos()
    this._utilidadServicio.mostrarAlerta("Parametros de búsqueda limpiados", "OK!")

  }

  obtenerEventos() {

    this.mostrarLoading = true;

    let request = this.formularioBusqueda.value as VGCValoracionMedicaDTO;
    const usuario = this._utilidadServicio.obtenerSesionUsuario();

    request.iCveUnica = usuario.iCveUnica;
    request.dFechaEvento = new Date


      this._gCService.leerListaEventos(request).subscribe({
        next: (data) => {
          if (data.status)
            if (!data.value) {
              this._utilidadServicio.mostrarAlerta("No se encontraron datos", "Oops!")
            }
            else {
              this.MidataSource.data = data.value;
            }
        },
        complete: () => {
          this.mostrarLoading = false;
        },
        error: (e) => { }
      })

  }


  registrarEditarRegistro(registro: VSPGCEventosReadDTO) {
    const iCveRegistroEvento = registro.iCveRegistroEvento;
    this.mostrarLoading = true
    this.dialog.open(ModalGCGuardSeguimientosComponent, {
      disableClose: true,
      data: { iCveRegistroEvento, registro }
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true") {
        this.obtenerEventos()
        this.mostrarLoading = false
      }
    });



  }

  eliminarRegistro(registro: VSPGCEventosReadDTO) {
    this.mostrarLoading = true
    let evento = moment(registro.dFechaEvento).format("DD/MM/YYYY").toString();



    Swal.fire({
      title: '¿Desea eliminar el siguiente seguimiento?',
      text: registro.cCURP + " < - > " + registro.cPrimerApellido + " " + registro.cSegundoApellido + " " + registro.cNombre + " < - > " + registro.cDescTipoEvento + " del " + evento,

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

        const _iCveRegistroEvento: number = registro.iCveRegistroEvento ?? 0;


        if (_iCveRegistroEvento > 0) {
          this._gCService.eliminarSeguimiento(_iCveRegistroEvento).subscribe({
            next: (data) => {
              if (data.status) {
                this._utilidadServicio.mostrarAlerta("Seguimiento eliminado correctamente", "Listo!");
                this.obtenerEventos();
                this.mostrarLoading = false
              }
              else {
                this._utilidadServicio.mostrarAlerta(data.msg, "Error MSSQL");
                this.mostrarLoading = true
              }
            },
            error: (e) => { }
          })
        }
      }

    }).finally
    {
      this.obtenerEventos()
      this.mostrarLoading=false
    }

  }

  VerificarColor(registro: VSPGCEventosReadDTO) {
    let fecha: Date = new Date()

    let evento = moment(registro.dFechaEvento);
    let hoy = moment(fecha);
    let dias = hoy.diff(evento, "day");

    if (registro.iCveEstatusEvento === 3) {
      return 'FilaMorada';
    } else
      if (registro.iCveEstatusEvento === 2) {
        return 'FilaVerde';
      }
      else if (registro.iCveEstatusEvento === 1 && dias > 4) {
        return 'FilaRoja';
      } else
        return 'FilaNormal';
  }
}

