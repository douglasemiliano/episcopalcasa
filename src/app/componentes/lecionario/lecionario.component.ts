import { Component, OnInit } from '@angular/core';
import { NgSelectComponent } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LecionarioService } from '../../services/lecionario.service';
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
import { MatButtonModule } from '@angular/material/button';
import { LecionarioMock } from '../../mocks/lecionario.mock';
import { log } from 'console';
import { Conteudo, Lecionario } from '../../model/Lecionario.model';



@Component({
  selector: 'app-lecionario',
  standalone: true,
  imports: [ FormsModule, CommonModule, DatePipe,MatButtonModule, MatIconModule, MatRippleModule, MatCardModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule, OverlayModule],
  templateUrl: './lecionario.component.html',
  providers: [provideNativeDateAdapter()],
  styleUrl: './lecionario.component.scss'
})
export class LecionarioComponent{
  dataUnica: Date = this.lecionarioSerivce.dataUnica();
  dataInicio: Date | null = null;
  dataFim: Date | null = null;
  conteudoLecionario: Conteudo | null = null;

  isOpen = false;

  isDragging = false;

  dataSelecionada: any = ""

  lecionarioCompleto: Lecionario[] = LecionarioMock;

    descricaoLecionario: string = "Esta ferramenta é organizada para nos conduzir a uma vida de disciplina espiritual e desfrutar do livre acesso proporcionado pela obra de Cristo. Não se trata apenas de interpretar textos, mas de aprender a ouvir Deus falar diretamente com você através da oração e leitura bíblica."
  liturgiaDiariaTitulo: string = "Liturgia Diária"
  
  liturgiaDiaria: string[] = ["Inicie com uma oração, pedindo ao Senhor que fale através de Sua Palavra e prepare seu coração para desfrutar de Sua presença.",
    "Faça uma ou todas as leituras indicadas (podendo usar as leituras em mais de um momento durante o dia, desde que se faça todas as leituras).", 
    "Ouça ou cante um louvor.", 
    "Conclua com a oração diária, utilizando-a como guia para refletir sobre o que buscar nesse momento."
  ] 

  constructor(private lecionarioSerivce: LecionarioService){}

  ngOnInit(){
    this.getConteudoLecionario();
  }
  
  getConteudoLecionario(){
    this.conteudoLecionario = this.lecionarioSerivce.getConteudoPorData(this.lecionarioSerivce.dataUnica())!
  }

  mudouData() {
    this.lecionarioSerivce.getConteudoPorData(this.dataUnica);
    console.log(this.dataUnica.setDate(this.dataUnica.getDate() + 1));
    
  }

   primeiraLetraMaiuscula(nome: string) {
    return nome.charAt(0).toUpperCase() + nome.substring(1);
  }

  incrementarDecrementarDia(increment: boolean): void {
    const dataAtual = this.dataUnica; // lê o valor atual
    const novaData = new Date(dataAtual); // cria uma nova cópia da data
    if (increment){
      novaData.setDate(novaData.getDate() + 1); // incrementa 1 dia
    } else {
      novaData.setDate(novaData.getDate() - 1); // decrementa 1 dia
    }
    this.dataUnica = novaData; // atualiza o signal

    this.lecionarioSerivce.dataUnica.set(this.dataUnica); // atualiza o valor do signal no serviço
    
  }

  onSelect(event:any){   
    this.dataUnica = event;
    this.lecionarioSerivce.getConteudoPorData(this.dataUnica);
    this.isOpen = false;
  }
  
  formatarTexto(){

    console.log(this.conteudoLecionario?.leituras.map((texto: any) => texto));

    
    let texto: string = `${this.negritoWhatsapp(this.conteudoLecionario?.tempo + " - Dia: " + this.dataUnica.toLocaleDateString())}
    \n${this.negritoWhatsapp(this.conteudoLecionario?.nome!)}
    \n${this.descricaoLecionario}
    \n${this.negritoWhatsapp(this.liturgiaDiariaTitulo)}
    \n${this.liturgiaDiaria.map((item, index) => `${index+1}. ${item}`).join("\n")}
    \n${this.negritoWhatsapp("Textos Bíblicos")}
    \n${this.conteudoLecionario!.leituras.map((leitura: any) => `${leitura.tipo}: ${leitura.texto}`).join("\n")}
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


}