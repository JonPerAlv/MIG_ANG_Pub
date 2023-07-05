export interface VUsuarioRolDetalleDTO {
    iCveUsuario: number;
    iCveUnica?: number;
    iCveEstatus: number;
    iCveRol: number;
    cCveDelegacion?: string;
    cUsuario?: string;
    cPassword?: string;
    cEmail?: string;
    dFechaRegistro: Date;
    dFechaUltimaActualizacion: Date;
    cDescRol?: string;
    cDelegacion?: string;
}
