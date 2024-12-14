import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LecionarioComum } from '../model/Advento.model';

@Injectable({
  providedIn: 'root'
})
export class LecionarioService {

  private httpClient = inject(HttpClient);

  getLecionario(): Observable<LecionarioComum>{
    return this.httpClient.get<LecionarioComum>('assets/lecionario2.json') as Observable<LecionarioComum>;
    }
}
