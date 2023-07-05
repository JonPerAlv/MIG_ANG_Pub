import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ResponseApi } from '../Interfaces/response-api';
import { MIGUsuariosLoginDTO } from '../Interfaces/migusuarios-login-dto';
import { MIGUsuariosListaDTO } from '../Interfaces/migusuarios-lista-dto';
import { VUsuarioRolDetalleDTO } from '../Interfaces/vusuario-rol-detalle-dto';
import { MIGUsuariosAccesoDTO } from '../Interfaces/migusuarios-acceso-dto';
import { MIGUsuariosDTO } from '../Interfaces/migusuarios-dto';

const httpOption={
  headers:new HttpHeaders({
    'Contend-Type':'application/json'
  })
}
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlApi: string = environment.endpoint + "Usuario/";


  constructor(private http: HttpClient) {
    
   }

  listaUsuarios(request: MIGUsuariosListaDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}ListaUsuarios`, request,httpOption)
  }


  iniciarSesion(request: MIGUsuariosLoginDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}IniciarSesion`, request,httpOption)
  }

  renewToken(request: MIGUsuariosAccesoDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}RenewToken`, request,httpOption)
  }

  detalle(iCveUsuario: number):Observable<ResponseApi>{
    return this.http.get<ResponseApi>(`${this.urlApi}Detalle/${iCveUsuario}`,httpOption)
  }


  registro(request: VUsuarioRolDetalleDTO): Observable<ResponseApi> {
    return this.http.post<ResponseApi>(`${this.urlApi}Registro`, request,httpOption)
  }

  acceso_Registro(request: MIGUsuariosAccesoDTO): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}Acceso_Registro`, request,httpOption)
  }

  editar(request: MIGUsuariosDTO): Observable<ResponseApi> {
    return this.http.put<ResponseApi>(`${this.urlApi}Editar`, request,httpOption)
  }


}
