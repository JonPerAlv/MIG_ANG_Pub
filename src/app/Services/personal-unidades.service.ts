import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PersonalUnidadesDTO } from '../Interfaces/personal-unidades-dto';
import { ResponseApi } from '../Interfaces/response-api';
import { VUnidadesPersonalDTO } from '../Interfaces/v-unidades-personal-dto';

@Injectable({
  providedIn: 'root'
})
export class PersonalUnidadesService {

  private urlApi: string = environment.endpoint + "PersonalUnidades/";

  constructor(private http: HttpClient) { }


  lista(request: VUnidadesPersonalDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Lista`, request)
  }
  
  detalle(iCveRegistroPersona: number):Observable<ResponseApi>{
    
    return this.http.get<ResponseApi>(`${this.urlApi}Detalle/${iCveRegistroPersona}`)
  }


  registro(request: PersonalUnidadesDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Registro`, request)
  }

  editar(request: PersonalUnidadesDTO): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request)
  }

  leerCatEstatusPersonal(): Observable<ResponseApi> {
    return this.http.get<ResponseApi>(`${this.urlApi}LeerCatEstatusPersonal`)
  }

}
