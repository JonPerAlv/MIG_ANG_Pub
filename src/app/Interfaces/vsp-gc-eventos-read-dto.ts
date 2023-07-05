export interface VSPGCEventosReadDTO {
    iCveRegistroEvento?: number;
    iCveUnica?: number;
    iCveTipoEvento?: number;
    cDescTipoEvento?: string;
    iCveRegistroPersona?: number;
    cCURP?: string;
    cPrimerApellido?: string;
    cSegundoApellido?: string;
    cNombre?: string;
    iCveEstatusEvento?: number;
    dFechaEvento?: Date;
    iCveEventoSeguimiento?: number;
}
