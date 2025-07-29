import type { Linha } from '../types/Document';

export function calculateWeight(linhas: Linha[]): number {
  return Math.round(
    linhas.reduce((acc, linha) => {
      const { primeira_pesagem, segunda_pesagem, quantidade, tara } = linha;
      const peso = segunda_pesagem - primeira_pesagem - (quantidade * tara);
      return acc + Math.abs(peso);
    }, 0)
  );
}