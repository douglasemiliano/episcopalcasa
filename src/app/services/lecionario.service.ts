import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LecionarioService {

  private httpClient = inject(HttpClient);

  getLecionario(){
    return this.httpClient.get('assets/lecionario.json');
    }
}
