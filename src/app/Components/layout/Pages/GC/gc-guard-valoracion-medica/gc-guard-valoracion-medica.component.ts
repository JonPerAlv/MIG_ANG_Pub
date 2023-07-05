import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialog } from '@angular/material/dialog';
import { UtilidadService } from 'src/app/Reutilizable/utilidad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatGridListModule } from '@angular/material/grid-list';
import { GCService } from 'src/app/Services/gc.service';
import { CatTipoPersonaDTO } from 'src/app/Interfaces/cat-tipo-persona-dto';
import { MIGService } from 'src/app/Services/mig.service';
import Swal from 'sweetalert2';
import { VGCValoracionMedicaDTO } from 'src/app/Interfaces/v-gc-valoracion-medica-dto';
import { ModalGCGuardValoracionMedicaComponent } from '../Modales/modal-gcguard-valoracion-medica/modal-gcguard-valoracion-medica.component';


@Component({
  selector: 'app-gc-guard-valoracion-medica',
  templateUrl: './gc-guard-valoracion-medica.component.html',
  styleUrls: ['./gc-guard-valoracion-medica.component.css'],
  providers: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatGridListModule],
})
export class GCGuardValoracionMedicaComponent implements AfterViewInit {
  displayedColumns: string[] = ['cCURP', 'cPrimerApellido', 'cSegundoApellido', 'cNombre', 'cDescMomento', 'Registrar', 'Editar', 'Eliminar'];
  MidataSource: MatTableDataSource<VGCValoracionMedicaDTO>;
  formularioBusqueda: FormGroup;
  mostrarLoading: boolean = false;
  dFechaActual: Date;
  listaTipoPersona: CatTipoPersonaDTO[] = [];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private _gCService: GCService,
    private _utilidadServicio: UtilidadService,
    private _mIGService: MIGService,


  ) {

    this.formularioBusqueda = this.fb.group({
      cCURP: [''],
      cPrimerApellido: [''],
      cSegundoApellido: [''],
      cNombre: [''],
      iCveTipoPersona: ['0', [Validators.required]],

    },

    ),
      this.MidataSource = new MatTableDataSource(),
      this.dFechaActual = new Date
  }

  async obtenerlistaTipoPersona() {
    return new Promise<void>((resolve, reject) => {
      this._mIGService.listaTipoPersona().subscribe({
        next: (data) => {
          if (data.status) {
            this.listaTipoPersona = data.value
            resolve(); // Resuelve la promesa cuando se obtiene el detalle de valoración
          } else {
            reject(); // Rechaza la promesa si no se pudo obtener el detalle de valoración
          }
        },
        error: (e) => {
          reject();
        }
      })
    });
  }

  async ngOnInit() {

    await this.obtenerlistaTipoPersona();

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

  obtenerValoracionMedica() {

    this.mostrarLoading = true;

    let request = this.formularioBusqueda.value as VGCValoracionMedicaDTO;
    const usuario = this._utilidadServicio.obtenerSesionUsuario();

    request.iCveUnica = usuario.iCveUnica;
    request.dFechaEvento = new Date

    if (this.formularioBusqueda.value.iCveTipoPersona === 1 ||
      this.formularioBusqueda.value.iCveTipoPersona === 2
    ) {

      request.iCveTipoPersona === this.formularioBusqueda.value.iCveTipoPersona
      if (

        request.cCURP?.toString() !== "" ||
        request.cPrimerApellido?.toString() !== "" ||
        request.cSegundoApellido?.toString() !== "" ||
        request.cNombre?.toString() !== ""
      ) {

        if (this.formularioBusqueda.value.iCveTipoPersona === 1) {
          this._gCService.leerListaNinosValoracionMedica(request).subscribe({
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
        else
          if (this.formularioBusqueda.value.iCveTipoPersona === 2) {
            this._gCService.leerListaPersonalValoracionMedica(request).subscribe({
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

      }
      else {
        this._utilidadServicio.mostrarAlerta("Se requiere mínimo un parámetro de búsqueda", "Verificar!")
        this.mostrarLoading = false;
      }
    }
    else {
      this._utilidadServicio.mostrarAlerta("Se requiere seleccionar el tipo de persona a consultar", "Verificar!")
      this.mostrarLoading = false;
    }



  }


  registrarEditarRegistro(registro: VGCValoracionMedicaDTO) {
    const iCveTipoPersona = this.formularioBusqueda.value.iCveTipoPersona;
    const iCveRegistroEvento = registro.iCveRegistroEvento;
this.mostrarLoading=true
    this.dialog.open(ModalGCGuardValoracionMedicaComponent, {
      disableClose: true,
      data: { iCveRegistroEvento, iCveTipoPersona, registro }
    }).afterClosed().subscribe(resultado => {
      if (resultado === "true")
      {
        this.obtenerValoracionMedica()
        this.mostrarLoading=false
      }
    });



  }

  eliminarRegistro(registro: VGCValoracionMedicaDTO) {
    this.mostrarLoading=true
    Swal.fire({
      title: '¿Desea eliminar el siguiente registro?',
      text: registro.cCURP + " < - > " + registro.cPrimerApellido + " " + registro.cSegundoApellido + " " + registro.cNombre,

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
          this._gCService.eliminarValoracionMedica(_iCveRegistroEvento).subscribe({
            next: (data) => {

              if (data.status) {

                this._gCService.limpiarValoracionSintomas(_iCveRegistroEvento).subscribe({
                  next: (data) => {

                    this._utilidadServicio.mostrarAlerta("Valoración Médica eliminada correctamente", "Listo!");
                    this.obtenerValoracionMedica();
                    this.mostrarLoading=false
                  }
                })

              }
              else
              {
                this._utilidadServicio.mostrarAlerta(data.msg, "Error MSSQL");
                this.mostrarLoading=true
              }
            },
            error: (e) => { }
          })
        }
      }

    })

  }
}

