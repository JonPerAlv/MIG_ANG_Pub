export interface VGCValoracionMedicaDTO {
    iCveRegistroEvento?: number;
  iCveUnica: number;
  iCveRegistroPersona?: number ;
  cCURP?: string ;
  cPrimerApellido?: string ;
  cSegundoApellido?: string ;
  cNombre?: string ;
  iCveMomento?: number ;
  cDescMomento?: string ;
  bUrgencias?: boolean ;
  bERAG?: boolean ;
  umf?: string;
  iCveEstatusEvento?: number;
  dFechaEvento?: Date ;
  dFechaUltimaActualizacion?: Date ;
  iCveTipoPersona?:number;
}
