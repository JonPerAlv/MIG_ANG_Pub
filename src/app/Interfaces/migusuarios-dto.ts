export interface MIGUsuariosDTO {
    iCveUsuario: number;
    iCveUnica?: number;
    iCveEstatus: number;
    cDescEstatus?: string;
    iCveRol: number;
    cDescRol?: string;
    cCveDelegacion: string;
    cUsuario: string;
    cPassword: string;
    cEmail?: string;
    dFechaUltimaActualizacion: Date;
}
