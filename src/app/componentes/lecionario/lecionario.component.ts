import { Component, model, OnInit } from '@angular/core';
import { NgLabelTemplateDirective, NgOptionTemplateDirective, NgSelectComponent } from '@ng-select/ng-select';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LecionarioService } from '../../services/lecionario.service';
import { Advento, Lecionario } from '../../model/Advento.model';
import { DatePipe } from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatRippleModule} from '@angular/material/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { log } from 'console';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import {OverlayModule} from '@angular/cdk/overlay';

@Component({
  selector: 'app-lecionario',
  standalone: true,
  imports: [ FormsModule, NgLabelTemplateDirective,
    NgOptionTemplateDirective,
    NgSelectComponent, CommonModule, DatePipe, 
    MatIconModule, MatRippleModule, MatCardModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, OverlayModule],
  templateUrl: './lecionario.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './lecionario.component.scss'
})
export class LecionarioComponent implements OnInit {
  isOpen = false;
  dataSelecionada: any

  dataForm: FormControl = new FormControl();


  color: string;

  advento: Advento;


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
  constructor(private service: LecionarioService, private datePipe: DatePipe){}
  
  ngOnInit(): void {
    this.carregarData();

  }

  onSelect(event:any){
    this.dataSelecionada = (this.datePipe.transform(event, 'dd/MM/yyyy'));
    this.carregarData(this.dataSelecionada)
    this.isOpen = false;
    
  }
  
  carregarData(data?: string){
    if(!data) {
      let myDate = new Date();
      this.inicializarFormularioData(myDate);
      this.dataSelecionada = this.datePipe.transform(myDate, 'dd/MM/yyyy');
      this.carregarLecionario(this.dataSelecionada);
    }
    else {
      this.carregarLecionario(data)
    }
  }

  carregarLecionario(data: string){
    this.service.getLecionario().subscribe({
      next: (dados: any) => {
        this.lecionario = null;
        
        setTimeout(() => {
          this.advento = dados.advento;
          this.lecionario = (this.getByData(data, this.advento.lecionario));
          this.oracao = dados.advento.oracoes[this.getWeekOfAdvent(data)]
        }, 1500);
      

        this.oracaoTitulo = (`Oração para a ${this.getWeekOfAdvent(data) + 1}ª Semana do Advento`);
      }
    })
  }

  getWeekOfAdvent(dateStr: string): number {
    // Dividir a string no formato "dd/MM/yyyy"
    const [day, month, year] = dateStr.split("/").map(Number);

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

  getByData(targetDate: string, advento: Lecionario[]): Lecionario {
    return advento.find((entry: any) => entry.data === targetDate) as Lecionario;
  }



  copiarTexto2() {
    const container = document.querySelector('.container') as HTMLElement;
    if (container) {
      const texto = container.innerText;
      navigator.clipboard.writeText(texto).then(() => {
        console.log(texto);
        
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
      console.log(texto);
      this.enviarParaWhatsapp(texto)

      alert('Texto copiado para a área de transferência!');
    }).catch(err => {
      console.error('Erro ao copiar o texto: ', err);
    });
    
  }

  negritoWhatsapp(text: string): string{
    return `*${text}*`;
  }


  selecionarData(){
    let data = this.formatarData(this.dataForm.value);
    this.dataSelecionada = data;
    this.carregarData(data)
  }

  inicializarFormularioData(date: Date){
    this.dataForm.setValue(date.toISOString().slice(0,10));
  }

  formatarData(data: string){
    const [ano, mes, dia] = data.split("-");
    const dataFormatada = `${dia}/${mes}/${ano}`;
    return dataFormatada;
  }

  incrementarData() {
    const dataAtual = new Date(this.dataSelecionada.split('/').reverse().join('-') + 'T00:00:00Z');
    dataAtual.setDate(dataAtual.getDate() + 2);
    this.dataSelecionada = this.datePipe.transform(dataAtual, 'dd/MM/yyyy')!;
    this.carregarLecionario(this.dataSelecionada);
  }

  decrementarData() {
    const dataAtual = new Date(this.dataSelecionada.split('/').reverse().join('-') + 'T00:00:00Z');
    dataAtual.setDate(dataAtual.getDate());
    this.dataSelecionada = this.datePipe.transform(dataAtual, 'dd/MM/yyyy')!;
    this.carregarLecionario(this.dataSelecionada);
  }

}
