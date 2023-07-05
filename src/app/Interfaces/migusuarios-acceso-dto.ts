export interface MIGUsuariosAccesoDTO {
    iCveUsuario: number;
    cUsuario?: string;
    dFechaUltimoAcceso?: Date;
    Token?: string;
    iCveUnica?: number;
    iCveEstatus: number;
    iCveRol: number;
    cCveDelegacion?: string;
    cDescRol?: string;
    cDelegacion?: string;
    cUnidadCompleta?: string;
}
