import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { PersonaComponent } from './Pages/REG/persona/persona.component';
import { NinosUnidadesComponent } from './Pages/REG/ninos-unidades/ninos-unidades.component';
import { PersonalUnidadesComponent } from './Pages/REG/personal-unidades/personal-unidades.component';
import { SharedModule } from 'src/app/Reutilizable/shared/shared/shared.module';
import { ModalNinosUnidadesDTOComponent } from './Pages/REG/Modales/modal-ninos-unidades-dto/modal-ninos-unidades-dto.component';
import { GCOOADEnvioDiarioMonitoreoComponent } from './Pages/GC/gc-ooad-envio-diario-monitoreo/gc-ooad-envio-diario-monitoreo.component';
import { GCOOADSeguimientosFaltantesComponent } from './Pages/GC/gc-ooad-seguimientos-faltantes/gc-ooad-seguimientos-faltantes.component';
import { GCOOADConsultaGeneralComponent } from './Pages/GC/gc-ooad-consulta-general/gc-ooad-consulta-general.component';
import { GCOOADVacunasCOVIDComponent } from './Pages/GC/gc-ooad-vacunas-covid/gc-ooad-vacunas-covid.component';
import { GCOOADVacunasINFLUENZAComponent } from './Pages/GC/gc-ooad-vacunas-influenza/gc-ooad-vacunas-influenza.component';
import { GCOOADReporteGeneralComponent } from './Pages/GC/gc-ooad-reporte-general/gc-ooad-reporte-general.component';
import { GCGuardFaltasComponent } from './Pages/GC/gc-guard-faltas/gc-guard-faltas.component';
import { GCGuardValoracionMedicaComponent } from './Pages/GC/gc-guard-valoracion-medica/gc-guard-valoracion-medica.component';
import { GCGuardRedNegativaComponent } from './Pages/GC/gc-guard-red-negativa/gc-guard-red-negativa.component';
import { GCGuardVacunasCOVIDComponent } from './Pages/GC/gc-guard-vacunas-covid/gc-guard-vacunas-covid.component';
import { GCGuardVacunasINFLUENZAComponent } from './Pages/GC/gc-guard-vacunas-influenza/gc-guard-vacunas-influenza.component';
import { GCGuardConsultaPersonaComponent } from './Pages/GC/gc-guard-consulta-persona/gc-guard-consulta-persona.component';
import { GCGuardConsultaUnidadComponent } from './Pages/GC/gc-guard-consulta-unidad/gc-guard-consulta-unidad.component';
import { GCGuardConsultaGeneralComponent } from './Pages/GC/gc-guard-consulta-general/gc-guard-consulta-general.component';
import { GCGuardRegistrosDelDiaComponent } from './Pages/GC/gc-guard-registros-del-dia/gc-guard-registros-del-dia.component';
import { ModalPersonaDTOComponent } from './Pages/REG/Modales/modal-persona-dto/modal-persona-dto.component';
import { ModalPersonalUnidadesDTOComponent } from './Pages/REG/Modales/modal-personal-unidades-dto/modal-personal-unidades-dto.component';
import { ModalGCGuardFaltasComponent } from './Pages/GC/Modales/modal-gcguard-faltas/modal-gcguard-faltas.component';
import { ModalGCGuardValoracionMedicaComponent } from './Pages/GC/Modales/modal-gcguard-valoracion-medica/modal-gcguard-valoracion-medica.component';
import { GCGuardEventosComponent } from './Pages/GC/gc-guard-eventos/gc-guard-eventos.component';
import { ModalGCGuardSeguimientosComponent } from './Pages/GC/Modales/modal-gcguard-seguimientos/modal-gcguard-seguimientos.component';
import { FiltroUnidadComponent } from './Filtros/filtro-unidad/filtro-unidad.component';
import { FiltroPersonaComponent } from './Filtros/filtro-persona/filtro-persona.component';
import { BarraSuperiorComponent } from './General/barra-superior/barra-superior.component';
import { MenuComponent } from './General/menu/menu.component';
import { VEGuardNotificacionComponent } from './Pages/VE/ve-guard-notificacion/ve-guard-notificacion.component';
import { VEGuardCasosSalaGrupoComponent } from './Pages/VE/ve-guard-casos-sala-grupo/ve-guard-casos-sala-grupo.component';
import { VEGuardFactoresRiesgoComponent } from './Pages/VE/ve-guard-factores-riesgo/ve-guard-factores-riesgo.component';
import { VEGuardMedidasGeneralesComponent } from './Pages/VE/ve-guard-medidas-generales/ve-guard-medidas-generales.component';
import { VEGuardMedidasEspecificasComponent } from './Pages/VE/ve-guard-medidas-especificas/ve-guard-medidas-especificas.component';
import { VEGuardMedidasCierreComponent } from './Pages/VE/ve-guard-medidas-cierre/ve-guard-medidas-cierre.component';
import { VEGuardCensoComponent } from './Pages/VE/ve-guard-censo/ve-guard-censo.component';
import { VEGuardListaCensosComponent } from './Pages/VE/ve-guard-lista-censos/ve-guard-lista-censos.component';
import { VEGuardListaEventosComponent } from './Pages/VE/ve-guard-lista-eventos/ve-guard-lista-eventos.component';
import { VEGuardListaEventosCensosComponent } from './Pages/VE/ve-guard-lista-eventos-censos/ve-guard-lista-eventos-censos.component';
import { SIREGuardListaRiesgosComponent } from './Pages/SIRE/sire-guard-lista-riesgos/sire-guard-lista-riesgos.component';
import { SIREGuardMapaRiesgosComponent } from './Pages/SIRE/sire-guard-mapa-riesgos/sire-guard-mapa-riesgos.component';
import { SIREGuardHistoricoFirmasComponent } from './Pages/SIRE/sire-guard-historico-firmas/sire-guard-historico-firmas.component';
import { ContactosComponent } from './Pages/MIG/contactos/contactos.component';
import { GCOOADVacunasCOVIDDetalleComponent } from './Pages/GC/gc-ooad-vacunas-covid-detalle/gc-ooad-vacunas-covid-detalle.component';
import { GCOOADVacunasInfluenzaDetalleComponent } from './Pages/GC/gc-ooad-vacunas-influenza-detalle/gc-ooad-vacunas-influenza-detalle.component';
import { VEOOADListaEventosComponent } from './Pages/VE/ve-ooad-lista-eventos/ve-ooad-lista-eventos.component';
import { VEOOADEventoSeguimientoComponent } from './Pages/VE/ve-ooad-evento-seguimiento/ve-ooad-evento-seguimiento.component';
import { SIREOOADListaSeguimientoComponent } from './Pages/SIRE/sire-ooad-lista-seguimiento/sire-ooad-lista-seguimiento.component';
import { SIREOOADSeguimientoComponent } from './Pages/SIRE/sire-ooad-seguimiento/sire-ooad-seguimiento.component';
import { SIREOOADReportesComponent } from './Pages/SIRE/sire-ooad-reportes/sire-ooad-reportes.component';
import { SIREOOADMapaGeneralComponent } from './Pages/SIRE/sire-ooad-mapa-general/sire-ooad-mapa-general.component';
import { CVMSGuardFormatosComponent } from './Pages/CVMS/cvms-guard-formatos/cvms-guard-formatos.component';
import { CVMSOOADFormatosComponent } from './Pages/CVMS/cvms-ooad-formatos/cvms-ooad-formatos.component';
import { CVMSOOADAsignacionComponent } from './Pages/CVMS/cvms-ooad-asignacion/cvms-ooad-asignacion.component';
import { CVMSOOADRegistroComponent } from './Pages/CVMS/cvms-ooad-registro/cvms-ooad-registro.component';
import { CVMSOOADReportesComponent } from './Pages/CVMS/cvms-ooad-reportes/cvms-ooad-reportes.component';
import { VEOOADReportesComponent } from './Pages/VE/ve-ooad-reportes/ve-ooad-reportes.component';
import { VENCReactivarCensosComponent } from './Pages/VE/ve-nc-reactivar-censos/ve-nc-reactivar-censos.component';
import { VENCReactivarEventosComponent } from './Pages/VE/ve-nc-reactivar-eventos/ve-nc-reactivar-eventos.component';
import { VEOOADListaEventosPrioridadComponent } from './Pages/VE/ve-ooad-lista-eventos-prioridad/ve-ooad-lista-eventos-prioridad.component';
import { GCNCEliminarEventoComponent } from './Pages/GC/gc-nc-eliminar-evento/gc-nc-eliminar-evento.component';
import { GCNCCatFaltasMotivoComponent } from './Pages/GC/gc-nc-cat-faltas-motivo/gc-nc-cat-faltas-motivo.component';
import { GCNCCatVMSintomasComponent } from './Pages/GC/gc-nc-cat-vmsintomas/gc-nc-cat-vmsintomas.component';
import { GCNCCatVMMomentoComponent } from './Pages/GC/gc-nc-cat-vmmomento/gc-nc-cat-vmmomento.component';
import { GCNCCatVacunasCOVIDReactivosComponent } from './Pages/GC/gc-nc-cat-vacunas-covid-reactivos/gc-nc-cat-vacunas-covid-reactivos.component';
import { GCNCVacunasCOVIDEliminarComponent } from './Pages/GC/gc-nc-vacunas-covid-eliminar/gc-nc-vacunas-covid-eliminar.component';
import { GCNCVacunasINFLUENZAEliminarComponent } from './Pages/GC/gc-nc-vacunas-influenza-eliminar/gc-nc-vacunas-influenza-eliminar.component';
import { GCNCVacunasCOVIDReportesComponent } from './Pages/GC/gc-nc-vacunas-covid-reportes/gc-nc-vacunas-covid-reportes.component';
import { GCNCVacunasINFLUENZAReportesComponent } from './Pages/GC/gc-nc-vacunas-influenza-reportes/gc-nc-vacunas-influenza-reportes.component';
import { VENCCatPatologiasComponent } from './Pages/VE/ve-nc-cat-patologias/ve-nc-cat-patologias.component';
import { VENCReportesComponent } from './Pages/VE/ve-nc-reportes/ve-nc-reportes.component';
import { RUNNCCargaComponent } from './Pages/RUN/run-nc-carga/run-nc-carga.component';
import { RUNOOADListaGuarderiasComponent } from './Pages/RUN/run-ooad-lista-guarderias/run-ooad-lista-guarderias.component';
import { RUNOOADDetalleComponent } from './Pages/RUN/run-ooad-detalle/run-ooad-detalle.component';
import { RUNOOADReportesComponent } from './Pages/RUN/run-ooad-reportes/run-ooad-reportes.component';
import { MIGNCCatUnidadDomicilioComponent } from './Pages/MIG/mig-nc-cat-unidad-domicilio/mig-nc-cat-unidad-domicilio.component';
import { MIGOOADInicioComponent } from './Pages/MIG/mig-ooad-inicio/mig-ooad-inicio.component';
import { MIGNCInicioComponent } from './Pages/MIG/mig-nc-inicio/mig-nc-inicio.component';
import { MIGGuardInicioComponent } from './Pages/MIG/mig-guard-inicio/mig-guard-inicio.component';
import { MIGNCCatUsuariosComponent } from './Pages/MIG/mig-nc-cat-usuarios/mig-nc-cat-usuarios.component';
import { MIGNCListaRolesComponent } from './Pages/MIG/mig-nc-lista-roles/mig-nc-lista-roles.component';
import { MIGNCCatTiposPermisosComponent } from './Pages/MIG/mig-nc-cat-tipos-permisos/mig-nc-cat-tipos-permisos.component';
import { MIGNCCatRolesAsignacionComponent } from './Pages/MIG/mig-nc-cat-roles-asignacion/mig-nc-cat-roles-asignacion.component';
import { RAUGuardListaEventosComponent } from './Pages/RAU/rau-guard-lista-eventos/rau-guard-lista-eventos.component';
import { RAUGuardListaEventosPrioridadComponent } from './Pages/RAU/rau-guard-lista-eventos-prioridad/rau-guard-lista-eventos-prioridad.component';
import { RAUGuardNotificacionComponent } from './Pages/RAU/rau-guard-notificacion/rau-guard-notificacion.component';
import { RAUGuardSeguimientoComponent } from './Pages/RAU/rau-guard-seguimiento/rau-guard-seguimiento.component';
import { RAUOOADListaEventosComponent } from './Pages/RAU/rau-ooad-lista-eventos/rau-ooad-lista-eventos.component';
import { RAUOOADSeguimientoComponent } from './Pages/RAU/rau-ooad-seguimiento/rau-ooad-seguimiento.component';
import { RAUOOADReportesComponent } from './Pages/RAU/rau-ooad-reportes/rau-ooad-reportes.component';
import { RAUOOADListaEventosPrioridadComponent } from './Pages/RAU/rau-ooad-lista-eventos-prioridad/rau-ooad-lista-eventos-prioridad.component';
import { SIMSGuardListaRegistroComponent } from './Pages/SIMS/sims-guard-lista-registro/sims-guard-lista-registro.component';
import { SIMSOOADListaEnviosComponent } from './Pages/SIMS/sims-ooad-lista-envios/sims-ooad-lista-envios.component';
import { CVMSNCCatPreguntasComponent } from './Pages/CVMS/cvms-nc-cat-preguntas/cvms-nc-cat-preguntas.component';
import { CVMSNCCatCedulaActivaComponent } from './Pages/CVMS/cvms-nc-cat-cedula-activa/cvms-nc-cat-cedula-activa.component';
import { GCGuardConsultaDiaActualComponent } from './Pages/GC/gc-guard-consulta-dia-actual/gc-guard-consulta-dia-actual.component';
import { GCNCEliminarSeguimientoComponent } from './Pages/GC/gc-nc-eliminar-seguimiento/gc-nc-eliminar-seguimiento.component';
import { MIGNCCatPaginasComponent } from './Pages/MIG/mig-nc-cat-paginas/mig-nc-cat-paginas.component';
import { InicioComponent } from './Pages/MIG/inicio/inicio.component';


@NgModule({
  declarations: [
    
    PersonaComponent,
    NinosUnidadesComponent,
    PersonalUnidadesComponent,
    ModalPersonaDTOComponent,
    ModalNinosUnidadesDTOComponent,
    ModalPersonalUnidadesDTOComponent,
    GCOOADEnvioDiarioMonitoreoComponent,
    GCOOADSeguimientosFaltantesComponent,
    GCOOADConsultaGeneralComponent,
    GCOOADVacunasCOVIDComponent,
    GCOOADVacunasINFLUENZAComponent,
    GCOOADReporteGeneralComponent,
    GCGuardFaltasComponent,
    GCGuardValoracionMedicaComponent,
    GCGuardRedNegativaComponent,
    GCGuardVacunasCOVIDComponent,
    GCGuardVacunasINFLUENZAComponent,
    GCGuardConsultaPersonaComponent,
    GCGuardConsultaUnidadComponent,
    GCGuardConsultaGeneralComponent,
    GCGuardRegistrosDelDiaComponent,
    ModalGCGuardFaltasComponent,
    BarraSuperiorComponent,
    ModalGCGuardValoracionMedicaComponent,
    GCGuardEventosComponent,
    ModalGCGuardSeguimientosComponent,
    MIGGuardInicioComponent,
    MIGOOADInicioComponent,
    MIGNCInicioComponent,
    FiltroUnidadComponent,
    FiltroPersonaComponent,
    BarraSuperiorComponent,
    MenuComponent,
    GCGuardConsultaDiaActualComponent,
    VEGuardNotificacionComponent,
    VEGuardCasosSalaGrupoComponent,
    VEGuardFactoresRiesgoComponent,
    VEGuardMedidasGeneralesComponent,
    VEGuardMedidasEspecificasComponent,
    VEGuardMedidasCierreComponent,
    VEGuardCensoComponent,
    VEGuardListaCensosComponent,
    VEGuardListaEventosComponent,
    VEGuardListaEventosCensosComponent,
    SIREGuardListaRiesgosComponent,
    SIREGuardMapaRiesgosComponent,
    SIREGuardHistoricoFirmasComponent,
    ContactosComponent,
    GCOOADVacunasCOVIDDetalleComponent,
    GCOOADVacunasInfluenzaDetalleComponent,
    VEOOADListaEventosComponent,
    VEOOADEventoSeguimientoComponent,
    SIREOOADListaSeguimientoComponent,
    SIREOOADSeguimientoComponent,
    SIREOOADReportesComponent,
    SIREOOADMapaGeneralComponent,
    CVMSGuardFormatosComponent,
    CVMSOOADFormatosComponent,
    CVMSOOADAsignacionComponent,
    CVMSOOADRegistroComponent,
    CVMSOOADReportesComponent,
    VEOOADReportesComponent,
    VENCReactivarCensosComponent,
    VENCReactivarEventosComponent,
    VEOOADListaEventosPrioridadComponent,
    GCNCEliminarSeguimientoComponent,
    GCNCEliminarEventoComponent,
    GCNCCatFaltasMotivoComponent,
    GCNCCatVMSintomasComponent,
    GCNCCatVMMomentoComponent,
    GCNCCatVacunasCOVIDReactivosComponent,
    GCNCVacunasCOVIDEliminarComponent,
    GCNCVacunasINFLUENZAEliminarComponent,
    GCNCVacunasCOVIDReportesComponent,
    GCNCVacunasINFLUENZAReportesComponent,
    VENCCatPatologiasComponent,
    VENCReportesComponent,
    RUNNCCargaComponent,
    RUNOOADListaGuarderiasComponent,
    RUNOOADDetalleComponent,
    RUNOOADReportesComponent,
    MIGNCCatUnidadDomicilioComponent,
    MIGOOADInicioComponent,
    MIGNCInicioComponent,
    MIGGuardInicioComponent,
    MIGNCCatUsuariosComponent,
    MIGNCListaRolesComponent,
    MIGNCCatPaginasComponent,
    MIGNCCatTiposPermisosComponent,
    MIGNCCatRolesAsignacionComponent,
    RAUGuardListaEventosComponent,
    RAUGuardListaEventosPrioridadComponent,
    RAUGuardNotificacionComponent,
    RAUGuardSeguimientoComponent,
    RAUOOADListaEventosComponent,
    RAUOOADSeguimientoComponent,
    RAUOOADReportesComponent,
    RAUOOADListaEventosPrioridadComponent,
    SIMSGuardListaRegistroComponent,
    SIMSOOADListaEnviosComponent,
    CVMSNCCatPreguntasComponent,
    CVMSNCCatCedulaActivaComponent,
    InicioComponent,
    
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
