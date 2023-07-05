import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NinosUnidadesDTO } from '../Interfaces/ninos-unidades-dto';
import { ResponseApi } from '../Interfaces/response-api';
import { VUnidadesNinosDTO } from '../Interfaces/v-unidades-ninos-dto';

@Injectable({
  providedIn: 'root'
})
export class NinosUnidadesService {

  private urlApi: string = environment.endpoint + "NinosUnidades/";

  constructor(private http: HttpClient) { }


  lista(request: VUnidadesNinosDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Lista`, request)
  }
  
  detalle(iCveRegistroPersona: number):Observable<ResponseApi>{
    
    return this.http.get<ResponseApi>(`${this.urlApi}Detalle/${iCveRegistroPersona}`)
  }


  registro(request: NinosUnidadesDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Registro`, request)
  }

  editar(request: NinosUnidadesDTO): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request)
  }

  leerCatEstatusNino(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}LeerCatEstatusNino`)
  }

}
