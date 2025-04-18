import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { LecionarioMock } from '../mocks/lecionario.mock';

@Injectable({
  providedIn: 'root'
})
export class LecionarioService {

  public dataUnica: WritableSignal<Date> = signal<Date>(new Date());

  getConteudoPorData(date: Date) {
    if (!this.dataUnica) return;

    const data = this.formatDate(date);

    const ano = 'C'; // você pode tornar isso dinâmico se quiser
    const lecionario = LecionarioMock.find(l => l.ano === ano);

    const diaEncontrado = lecionario!.conteudo.find(item => item.dia === data);

    console.log(diaEncontrado);

    return diaEncontrado!;
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0]; // retorna yyyy-mm-dd
  }


}
