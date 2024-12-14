import { Component, OnInit } from '@angular/core';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LecionarioService } from '../../services/lecionario.service';
import { ConteudoLecionario, Lecionario, LecionarioComum, Modulo } from '../../model/Advento.model';
import { DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkDrag} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-lecionario',
  standalone: true,
  imports: [ FormsModule, NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent, CommonModule, DatePipe, CdkDrag,
    MatIconModule, MatRippleModule, MatCardModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, OverlayModule],
  templateUrl: './lecionario.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './lecionario.component.scss'
})
export class LecionarioComponent implements OnInit {
  isOpen = false;

  isDragging = false;

  dataSelecionada: any = ""
  diaDaSemana: string;

  diasDaSemana = [
    "domingo", "segunda-feira", "terça-feira", 
    "quarta-feira", "quinta-feira", "sexta-feira", "sábado"
  ];

  dataForm: FormControl = new FormControl();


  color: string;

  conteudo: ConteudoLecionario;


  anoLecionario: string = "Lecionário Anglicano Ano C"
  
  descricaoLecionario: string = "Esta ferramenta é organizada para nos conduzir a uma vida de disciplina espiritual e desfrutar do livre acesso proporcionado pela obra de Cristo. Não se trata apenas de interpretar textos, mas de aprender a ouvir Deus falar diretamente com você através da oração e leitura bíblica."
  liturgiaDiariaTitulo: string = "Liturgia Diária"
  
  liturgiaDiaria: string[] = ["Inicie com uma oração, pedindo ao Senhor que fale através de Sua Palavra e prepare seu coração para desfrutar de Sua presença.",
    "Faça uma ou todas as leituras indicadas (podendo usar as leituras em mais de um momento durante o dia, desde que se faça todas as leituras).", 
    "Ouça ou cante um louvor.", 
    "Conclua com a oração diária, utilizando-a como guia para refletir sobre o que buscar nesse momento."
  ] 

  textosBiblicoTitulo: string = "Textos Bíblicos"
  lecionario: Lecionario | null;
  
  oracaoTitulo: string  =  ""
  oracao: string = "Deus Misericordioso, que enviaste teus mensageiros, os profetas, para pregar o arrependimento e preparar o caminho da nossa salvação; concede-nos a graça, para ouvirmos suas advertências e para abandonarmos os nossos pecados, a fim de saudarmos com alegria a vinda de Jesus Cristo, nosso Redentor, o qual vive e reina contigo e com o Espírito Santo, um só Deus, agora e sempre. Amém."
  
  tempoLiturgico: keyof ConteudoLecionario = "advento";

  constructor(private service: LecionarioService, private datePipe: DatePipe){
  }
  

  ngOnInit(): void {
    this.carregarData();
    
  }


  definirDataUTC(data?: Date){
    if (!data) {
      data = new Date();
    }
    const utcDate = new Date(`${data.getFullYear()}-${data.getMonth()}-${data.getDate()}T00:00:00.791Z`);
    return utcDate
  }

  onSelect(event:any){   
    this.dataSelecionada = event    
    this.dataSelecionada = (this.datePipe.transform(event, 'yyyy-MM-dd'));
    this.diaDaSemana = this.diasDaSemana[event.getDay()];
    this.carregarData(event)
    this.isOpen = false;
  }
  
  carregarData(data?: string){
    if(!data) {
      let myDate = new Date();
      this.diaDaSemana = this.diasDaSemana[myDate.getDay()];
      this.dataSelecionada = this.datePipe.transform(myDate, 'yyyy-MM-dd');       
      this.carregarLecionario(this.dataSelecionada, this.tempoLiturgico);
      this.tempoLiturgico = this.getPeriodoLiturgico() as keyof ConteudoLecionario;

    }
    else {
      this.tempoLiturgico = this.getPeriodoLiturgico(data) as keyof ConteudoLecionario;
      this.carregarLecionario(this.datePipe.transform(data, 'yyyy-MM-dd')!, this.tempoLiturgico)
    }
  }

  carregarLecionario(data: string, tempoLiturgico: keyof ConteudoLecionario){
    this.service.getLecionario().subscribe({
      next: (dados: LecionarioComum) => {
        this.lecionario = null;
        

        setTimeout(() => {
          this.conteudo = dados.conteudo;
          this.lecionario = (this.getByData(data, this.conteudo[tempoLiturgico].lecionario));        
          if(tempoLiturgico === "advento") {
            this.oracao = dados.conteudo[tempoLiturgico].oracoes[this.getWeekOfAdvent(data)]
            this.oracaoTitulo = (`Oração para a ${this.getWeekOfAdvent(data) + 1}ª Semana do Advento`);
          } else if (tempoLiturgico === "natal") {
            this.oracao = dados.conteudo[tempoLiturgico].oracoes[this.getWeekOfNatal(data)]
            this.oracaoTitulo = (`Oração para a ${this.getWeekOfNatal(data) + 1}ª Semana do Natal`);

          }

          else {
            this.oracao = dados.conteudo[tempoLiturgico].oracoes[this.getWeekOfAdvent(data)]
            this.oracaoTitulo = (`Oração para a ${this.getWeekOfNatal(data) + 1}ª Semana do Natal`);

          }
        }, 1500);
      

        
      }
    })
  }

  getWeekOfAdvent(dateStr: string): number {
    // Dividir a string no formato "dd/MM/yyyy"
    const [year, month, day] = dateStr.split("-").map(Number);

    // Criar um objeto Date a partir da string
    const date = new Date(year, month - 1, day); // Mês é zero-based em Date

    // Data de início do Advento (quinta-feira, 28 de novembro de 2024)
    const adventStart = new Date(year, 10, 28); // Mês 10 = Novembro

    // Calcular o número de dias entre a data e o início do Advento
    const daysSinceAdventStart = Math.floor(
        (date.getTime() - adventStart.getTime()) / (1000 * 60 * 60 * 24)
    );

    // Caso a data seja antes do início do Advento, retornar 0
    if (daysSinceAdventStart < 0) return 0;

    // Calcular e retornar a semana (cada semana tem 7 dias, começando na quinta-feira)
    return Math.floor(daysSinceAdventStart / 7);
}


getWeekOfNatal(dateStr: string): number {
  // Dividir a string no formato "dd/MM/yyyy"
  const [year, month, day] = dateStr.split("-").map(Number);

  // Criar um objeto Date a partir da string
  const date = new Date(year, month - 1, day); // Mês é zero-based em Date

  // Data de início da semana pós Natal (quinta-feira, 26 de dezembro de 2024)
  const natalStart = new Date(year, 12, 26); // Mês 12 = dezembro

  // Calcular o número de dias entre a data e o início do Natal
  const daysSinceNatalStart = Math.floor(
      (date.getTime() - natalStart.getTime()) / (1000 * 60 * 60 * 24)
  );

  // Caso a data seja antes do início do Advento, retornar 0
  if (daysSinceNatalStart < 0) return 0;

  // Calcular e retornar a semana (cada semana tem 7 dias, começando na quinta-feira)
  return Math.floor(daysSinceNatalStart / 7);
}

  getByData(targetDate: string, advento: Lecionario[]): Lecionario {
    return advento.find((entry: any) => entry.data === targetDate) as Lecionario;
  }



  copiarTexto2() {
    const container = document.querySelector('.container') as HTMLElement;
    if (container) {
      const texto = container.innerText;
      navigator.clipboard.writeText(texto).then(() => {
        alert('Texto copiado para a área de transferência!');

        this.enviarParaWhatsapp(texto)


      }).catch(err => {
        console.error('Erro ao copiar o texto: ', err);
      });
    }
  }

  enviarParaWhatsapp(texto: string) {
    const textoCodificado = encodeURIComponent(texto);
    const linkWhatsapp = `https://wa.me/?text=${textoCodificado}`;
    window.open(linkWhatsapp, '_blank');
  }
 

  formatarTexto(){

    let texto: string = `${this.negritoWhatsapp(this.anoLecionario + " - Dia: " + this.dataSelecionada)}
    \n${this.descricaoLecionario}
    \n${this.negritoWhatsapp(this.liturgiaDiariaTitulo)}
    \n${this.liturgiaDiaria.map((item, index) => `${index+1}. ${item}`).join("\n")}
    \n${this.negritoWhatsapp(this.textosBiblicoTitulo)}
    \n${this.lecionario!.textos.map((texto: any) => `${texto.livro} ${texto.capitulo}:${texto.versiculos}`).join("\n")}
    \n${this.negritoWhatsapp(this.oracaoTitulo)}
    \n${this.oracao}
    `;
    
    
    navigator.clipboard.writeText(texto).then(() => {
      alert('Lecionário copiado para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar o texto: ', err);
    });
    
  }

  negritoWhatsapp(text: string): string{
    return `*${text}*`;
  }


  // selecionarData(){
  //   let data = this.formatarData(this.dataForm.value);
  //   this.dataSelecionada = data;
  //   this.carregarData(data)
  // }

  // inicializarFormularioData(date: Date){
  //   this.dataForm.setValue(date.toISOString().slice(0,10));
  // }

  formatarData(data: string){
    const [ano, mes, dia] = data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  }

  incrementarData() {
    const dataAtual = new Date(this.dataSelecionada);
    dataAtual.setDate(dataAtual.getDate() + 2);
    this.diaDaSemana = this.diasDaSemana[dataAtual.getDay()];
    this.dataSelecionada = this.datePipe.transform(dataAtual, 'yyyy-MM-dd')!;
    this.carregarLecionario(this.dataSelecionada, this.tempoLiturgico);
  }

  decrementarData() {
    const dataAtual = new Date(this.dataSelecionada);
    this.diaDaSemana = this.diasDaSemana[dataAtual.getDay()];
    dataAtual.setDate(dataAtual.getDate());
    this.dataSelecionada = this.datePipe.transform(dataAtual, 'yyyy-MM-dd')!;
    this.carregarLecionario(this.dataSelecionada, this.tempoLiturgico);
  }

  onDragStart(){
    this.isDragging = true;
  }

  onDragEnd(){
    setTimeout(() => 
      this.isDragging = false, 0);
  }

  
getPeriodoLiturgico(data?: string): string {
    let hoje = new Date()
    if (data) {
      hoje = new Date(data);
    }
    hoje.setUTCHours(+3)

    const anoAtual = new Date().getFullYear();

    // Calcula a data da Páscoa (aproximação, pode variar dependendo do cálculo usado)
    const dataPascoa = this.calcularDataPascoa(anoAtual + 1);


    const adventoInicio = new Date(anoAtual, 10, 28); // 28 de Novembro
    const natalInicio = new Date(anoAtual, 11, 24); // 24 de Dezembro
    const natalFim = new Date(anoAtual + 1, 0, 5); // 5 de Janeiro
    const epifaniaInicio = new Date(anoAtual +1, 0, 6); // 6 de Janeiro
    const epifaniaFim = new Date(anoAtual + 1, 2, 4); // 4 de Março
    const quaresmaInicio = new Date(anoAtual + 1, 2, 5); // 5 de Março
    const quaresmaFim = new Date(anoAtual + 1, 3, 13); // 13 de Abril
    const semanaSantaInicio = new Date(anoAtual + 1, 3, 14); // 14 de Abril
    const semanaSantaFim = new Date(anoAtual + 1, 3, 19); // 19 de Abril
    const pascoaInicio = dataPascoa;
    const pascoaFim = new Date(anoAtual + 1, 5, 11); // 11 de Junho
    const depoisPentecostesInicio = new Date(anoAtual + 1, 5, 12); // 12 de Junho
    const depoisPentecostesFim = new Date(anoAtual + 1, 10, 27); // 27 de Novembro

    if (hoje >= adventoInicio && hoje <= new Date(anoAtual, 11, 23)) {
      return "advento";
    } else if (hoje >= natalInicio && hoje <= natalFim) {
      return "natal";
    } else if (hoje >= epifaniaInicio && hoje <= epifaniaFim) {
      return "epifania";
    } else if (hoje >= quaresmaInicio && hoje <= quaresmaFim) {
      return "Quaresma";
    } else if (hoje >= semanaSantaInicio && hoje <= semanaSantaFim) {
      return "Semana Santa";
    } else if (hoje >= pascoaInicio && hoje <= pascoaFim) {
      return "Páscoa";
    } else if (hoje >= depoisPentecostesInicio && hoje <= depoisPentecostesFim) {
      return "Depois de Pentecostes";
    } else {
      return "Tempo Ordinário"; // ou outro período apropriado se existir
    }
  }


  // Cálculo aproximado da data da Páscoa (método de Gauss)
  private calcularDataPascoa(ano: number): Date {
    let a = ano % 19;
    let b = Math.floor(ano / 100);
    let c = ano % 100;
    let d = Math.floor(b / 4);
    let e = b % 4;
    let f = Math.floor((b + 8) / 25);
    let g = Math.floor((b - f + 1) / 3);
    let h = (19 * a + b - d - g + 15) % 30;
    let i = Math.floor(c / 4);
    let k = c % 4;
    let l = (32 + 2 * e + 2 * i - h - k) % 7;
    let m = Math.floor((a + 11 * h + 22 * l) / 451);
    let n = (h + l - 7 * m + 114) / 31;
    let p = (h + l - 7 * m + 114) % 31;

    // Dia e mês da Páscoa (0 é março e 1 é abril)
    let dia = p + 1;
    let mes = n -1;

    return new Date(ano, mes, dia);
  }

}
