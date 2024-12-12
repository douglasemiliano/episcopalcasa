export class Texto {
    livro: string; // Nome completo do livro (ex.: "Isaías")
    abreviacao: string; // Abreviação do livro (ex.: "Is")
    capitulo: number; // Número do capítulo
    versiculos: number[]; // Lista de versículos
  
    constructor(livro: string, abreviacao: string, capitulo: number, versiculos: number[]) {
      this.livro = livro;
      this.abreviacao = abreviacao;
      this.capitulo = capitulo;
      this.versiculos = versiculos;
    }
  }
  
  export class Lecionario {
    data: string; // Data no formato DD/MM/AAAA
    descricao?: string; // Descrição opcional (ex.: "Terceiro Domingo do Advento")
    textos: Texto[]; // Lista de textos associados à data
  }

  export class Advento{
    lecionario: Lecionario[];
    oracoes: string[];
  }
  