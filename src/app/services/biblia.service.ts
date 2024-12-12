import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BibliaService {

  private httpClient = inject(HttpClient);


  getBiblia(){
    return this.httpClient.get('assets/nvi.json');
    }


  getVersiculo(livro: number, capitulo: number, versiculos: number[]){
    this.httpClient.get('assets/nvi.json').subscribe({
      next: (data: any) => {
        let biblia: any[] = data;
        console.log(data[livro].chapters[capitulo][0])
        console.log(biblia[livro].chapters[capitulo].slice(0,3))
      },
      error: (err) => {
        console.error('Erro ao carregar o JSON:', err);
      },
    });
  }

  getFilteredData(livro: number, biblia: any): any {
    console.log(biblia)
    return biblia.abbrev === livro;
  }
}
