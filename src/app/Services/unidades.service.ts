

import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { VUnidadesDTO } from '../Interfaces/vunidades-dto';

const httpOption={
  headers:new HttpHeaders({
    'Contend-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UnidadesService {

  private urlApi: string = environment.endpoint + "Unidades/";


  constructor(private http: HttpClient) {
    
   }

   leerUnidadesCompleto(request: VUnidadesDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}LeerUnidadesCompleto`, request,httpOption)
  }

  leerUnidadesCompletoActivas(request: VUnidadesDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}LeerUnidadesCompletoActivas`, request,httpOption)
  }

  leerUnidadesCompletoEsquemaActivas(request: VUnidadesDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}LeerUnidadesCompletoEsquemaActivas`, request,httpOption)
  }


}
