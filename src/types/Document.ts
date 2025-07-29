export interface Linha {
  primeira_pesagem: number;
  segunda_pesagem: number;
  quantidade: number;
  tara: number;
}

export interface DocumentData {
  data: string;
  cod_doc: string;
  matricula: string;
  linhas: Linha[];
}