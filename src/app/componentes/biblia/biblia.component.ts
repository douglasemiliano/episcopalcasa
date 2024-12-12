import { Component, OnInit } from '@angular/core';
import { TextoBiblico } from '../../model/TextoBiblico.model';
import { BibliaService } from '../../services/biblia.service';
import { FormsModule } from '@angular/forms';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-biblia',
  standalone: true,
  imports: [ FormsModule, NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent, CommonModule ],
  templateUrl: './biblia.component.html',
  styleUrl: './biblia.component.scss'
})
export class BibliaComponent implements OnInit {

  bibliaNVI: any = [];

  livro: number = 0;
  capitulo: number = 1;
  versiculos: number[] = [];

  texto: string = "";
  textos: string[] = []

  textoBiblico: TextoBiblico [];

  biblia = [
  { id: 0, nome: "Gênesis", abreviatura: "Gn" },
  { id: 1, nome: "Êxodo", abreviatura: "Êx" },
  { id: 2, nome: "Levítico", abreviatura: "Lv" },
  { id: 3, nome: "Números", abreviatura: "Nm" },
  { id: 4, nome: "Deuteronômio", abreviatura: "Dt" },
  { id: 5, nome: "Josué", abreviatura: "Js" },
  { id: 6, nome: "Juízes", abreviatura: "Jz" },
  { id: 7, nome: "Rute", abreviatura: "Rt" },
  { id: 8, nome: "1 Samuel", abreviatura: "1Sm" },
  { id: 9, nome: "2 Samuel", abreviatura: "2Sm" },
  { id: 10, nome: "1 Reis", abreviatura: "1Rs" },
  { id: 11, nome: "2 Reis", abreviatura: "2Rs" },
  { id: 12, nome: "1 Crônicas", abreviatura: "1Cr" },
  { id: 13, nome: "2 Crônicas", abreviatura: "2Cr" },
  { id: 14, nome: "Esdras", abreviatura: "Ed" },
  { id: 15, nome: "Neemias", abreviatura: "Ne" },
  { id: 16, nome: "Ester", abreviatura: "Et" },
  { id: 17, nome: "Jó", abreviatura: "Jó" },
  { id: 18, nome: "Salmos", abreviatura: "Sl" },
  { id: 19, nome: "Provérbios", abreviatura: "Pv" },
  { id: 20, nome: "Eclesiastes", abreviatura: "Ec" },
  { id: 21, nome: "Cantares de Salomão", abreviatura: "Ct" },
  { id: 22, nome: "Isaías", abreviatura: "Is" },
  { id: 23, nome: "Jeremias", abreviatura: "Jr" },
  { id: 24, nome: "Lamentações", abreviatura: "Lm" },
  { id: 25, nome: "Ezequiel", abreviatura: "Ez" },
  { id: 26, nome: "Daniel", abreviatura: "Dn" },
  { id: 27, nome: "Oséias", abreviatura: "Os" },
  { id: 28, nome: "Joel", abreviatura: "Jl" },
  { id: 29, nome: "Amós", abreviatura: "Am" },
  { id: 30, nome: "Obadias", abreviatura: "Ob" },
  { id: 31, nome: "Jonas", abreviatura: "Jn" },
  { id: 32, nome: "Miqueias", abreviatura: "Mq" },
  { id: 33, nome: "Naum", abreviatura: "Na" },
  { id: 34, nome: "Habacuque", abreviatura: "Hc" },
  { id: 35, nome: "Sofonias", abreviatura: "Sf" },
  { id: 36, nome: "Ageu", abreviatura: "Ag" },
  { id: 37, nome: "Zacarias", abreviatura: "Zc" },
  { id: 38, nome: "Malaquias", abreviatura: "Ml" },
  { id: 39, nome: "Mateus", abreviatura: "Mt" },
  { id: 40, nome: "Marcos", abreviatura: "Mc" },
  { id: 41, nome: "Lucas", abreviatura: "Lc" },
  { id: 42, nome: "João", abreviatura: "Jo" },
  { id: 43, nome: "Atos", abreviatura: "At" },
  { id: 44, nome: "Romanos", abreviatura: "Rm" },
  { id: 45, nome: "1 Coríntios", abreviatura: "1Co" },
  { id: 46, nome: "2 Coríntios", abreviatura: "2Co" },
  { id: 47, nome: "Gálatas", abreviatura: "Gl" },
  { id: 48, nome: "Efésios", abreviatura: "Ef" },
  { id: 49, nome: "Filipenses", abreviatura: "Fp" },
  { id: 50, nome: "Colossenses", abreviatura: "Cl" },
  { id: 51, nome: "1 Tessalonicenses", abreviatura: "1Ts" },
  { id: 52, nome: "2 Tessalonicenses", abreviatura: "2Ts" },
  { id: 53, nome: "1 Timóteo", abreviatura: "1Tm" },
  { id: 54, nome: "2 Timóteo", abreviatura: "2Tm" },
  { id: 55, nome: "Tito", abreviatura: "Tt" },
  { id: 56, nome: "Filemom", abreviatura: "Fm" },
  { id: 57, nome: "Hebreus", abreviatura: "Hb" },
  { id: 58, nome: "Tiago", abreviatura: "Tg" },
  { id: 59, nome: "1 Pedro", abreviatura: "1Pe" },
  { id: 60, nome: "2 Pedro", abreviatura: "2Pe" },
  { id: 61, nome: "1 João", abreviatura: "1Jo" },
  { id: 62, nome: "2 João", abreviatura: "2Jo" },
  { id: 63, nome: "3 João", abreviatura: "3Jo" },
  { id: 64, nome: "Judas", abreviatura: "Jd" },
  { id: 65, nome: "Apocalipse", abreviatura: "Ap" }
  ]

  capitulosDisponiveis: number[] = [];
  versiculosDisponiveis: number[] = [];

  constructor(private service: BibliaService){}

  ngOnInit(): void {
    this.get();
  }

  get(){

    this.service.getBiblia().subscribe({
      next: (data: any) => {        
        this.bibliaNVI = data;

        this.selecionarLivro();
        this.selecionarVersiculo();
      }
    })

    
    // this.service.getVersiculo(this.livro, this.capitulo, this.versiculos)
  }
  
  selecionarLivro(){
    // console.log(this.bibliaNVI[this.livro].chapters.length);
    this.capitulosDisponiveis = []
    for (let i = 1; i <= this.bibliaNVI[this.livro].chapters.length; i++) {
      this.capitulosDisponiveis.push(i)

    }  
  }

  selecionarVersiculo(){
    this.versiculosDisponiveis = []
    this.versiculos = []
    for (let i = 1; i <= this.bibliaNVI[this.livro].chapters[this.capitulo-1].length; i++) {
      this.versiculosDisponiveis.push(i)
    } 
  }

  odernarVersiculos(){
    this.versiculos.sort()
  }

  carregar(){
    // console.log(this.capitulosDisponiveis, this.livro);
    // console.log(this.versiculos);
    
    let versiculos2 = this.versiculos.map( item => item  - 1)
    
    this.textos = (this.bibliaNVI[this.livro].chapters[this.capitulo-1].slice(versiculos2[0], versiculos2[versiculos2.length -1] + 1))

    this.textoBiblico = this.versiculos.map((verso, index) => {
      return {verso, texto: this.textos[index]}
    })
    
  }

}
