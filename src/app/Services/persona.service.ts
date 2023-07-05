import { Injectable } from '@angular/core';

import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { PersonaDTO } from '../Interfaces/persona-dto';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private urlApi: string = environment.endpoint + "Persona/";

  constructor(private http: HttpClient) { }


  lista(request: PersonaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Lista`, request)
  }
  
  detalle(iCveRegistroPersona: number):Observable<ResponseApi>{
    
    return this.http.get<ResponseApi>(`${this.urlApi}Detalle/${iCveRegistroPersona}`)
  }


  registro(request: PersonaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Registro`, request)
  }

  editar(request: PersonaDTO): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request)
  }

  eliminar(iCveRegistroPersona: number): Observable<ResponseApi> {
    return this.http.delete<ResponseApi>(`${this.urlApi}Eliminar/${iCveRegistroPersona}`)
  }

}
