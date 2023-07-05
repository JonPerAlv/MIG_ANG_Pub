import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';

@Injectable({
  providedIn: 'root'
})
export class MIGService {

  private urlApi: string = environment.endpoint + "MIG/";

  constructor(private http: HttpClient) { }


  listaTipoPersona(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}ListaTipoPersona`)
  }

  verificarConexionAPI(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}VerificarConexionAPI`)
  }

  verificarConexionBD(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}VerificarConexionBD`)
  }
}
