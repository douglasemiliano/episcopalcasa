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
    oracaoTitulo: string;
    oracao: string;
  }

  export class ConteudoLecionario{
    advento: Modulo;
    natal: Modulo;
    epifania: Modulo;
    comum: Modulo;
  }

  export class LecionarioComum {
    ano: string;
    conteudo: ConteudoLecionario
  }

  export class Modulo {
    tempo: string
    lecionario: Lecionario[];
    oracoes: string[];
  }
  