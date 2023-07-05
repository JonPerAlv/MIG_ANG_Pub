
import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { VGCFaltasDTO } from '../Interfaces/v-gc-faltas-dto';
import { VGCValoracionMedicaDTO } from '../Interfaces/v-gc-valoracion-medica-dto';
import { GCEventoValoracionMedicaSintomasDTO } from '../Interfaces/gc-evento-valoracion-medica-sintomas-dto';
import { GCEventoRedNegativaDTO } from '../Interfaces/gc-evento-red-negativa-dto';

@Injectable({
  providedIn: 'root'
})
export class GCService {


  private urlApi: string = environment.endpoint + "GC/";

  constructor(private http: HttpClient) { }


  leerListaNinosFaltas(request: VGCFaltasDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}LeerListaNinosFaltas`, request)
  }

  leerListaPersonalFaltas(request: VGCFaltasDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}LeerListaPersonalFaltas`, request)
  }

  leerListaCatMotivoFalta(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}LeerListaCatMotivoFalta`)
  }

  registroFalta(request: VGCFaltasDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}RegistroFalta`, request)
  }

  editarFalta(request: VGCFaltasDTO): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}EditarFalta`, request)
  }

  eliminarFalta(iCveRegistroEvento: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}EliminarFalta/${iCveRegistroEvento}`)
  }

  buscarFalta(request: VGCFaltasDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}BuscarFalta`, request)
  }

  conteoFalta(request: VGCFaltasDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}ConteoFalta`, request)
  }

  conteoValoracionMedica(request: VGCValoracionMedicaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}ConteoValoracionMedica`, request)
  }

  leerListaNinosValoracionMedica(request: VGCValoracionMedicaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}LeerListaNinosValoracionMedica`, request)
  }

  leerListaPersonalValoracionMedica(request: VGCValoracionMedicaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}LeerListaPersonalValoracionMedica`, request)
  }

  leerListaValoracionCatMomento(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}LeerListaValoracionCatMomento`)
  }

  leerListaValoracionCatSintomas(iCveTipoPersona: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}LeerListaValoracionCatSintomas/${iCveTipoPersona}`)
  }

  leerDetalleValoracion(iCveRegistroEvento: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}LeerDetalleValoracion/${iCveRegistroEvento}`)
  }

  buscarValoracion(request: VGCValoracionMedicaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}BuscarValoracion`, request)
  }

  registroValoracionMedica(request: VGCValoracionMedicaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}RegistroValoracionMedica`, request)
  }

  limpiarValoracionSintomas(iCveRegistroEvento: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}LimpiarValoracionSintomas/${iCveRegistroEvento}`)
  }

  leerListaValoracionSintomasRegistrados(iCveRegistroEvento: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}LeerListaValoracionSintomasRegistrados/${iCveRegistroEvento}`)
  }

  registroValoracionMedicaSintoma(request: GCEventoValoracionMedicaSintomasDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}RegistroValoracionMedicaSintoma`, request)
  }

  editarValoracionMedica(request: VGCValoracionMedicaDTO): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}EditarValoracionMedica`, request)
  }

  eliminarValoracionMedica(iCveRegistroEvento: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}EliminarValoracionMedica/${iCveRegistroEvento}`)
  }

  buscarRN(iCveUnica: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}BuscarRN/${iCveUnica}`)
  }

  buscarRNHOY(iCveUnica: number): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}BuscarRNHOY/${iCveUnica}`)
  }
 

  registroRN(request: GCEventoRedNegativaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}RegistroRN`, request)
  }

  eliminarRN(iCveUnica: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}EliminarRN/${iCveUnica}`)
  }

  leerListaEventos(request: VGCValoracionMedicaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}LeerListaEventos`, request)
  }

  eliminarSeguimiento(iCveRegistroEvento: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}EliminarSeguimiento/${iCveRegistroEvento}`)
  }

}
