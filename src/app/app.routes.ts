import { Routes } from '@angular/router';
import { BibliaComponent } from './componentes/biblia/biblia.component';
import { HomeComponent } from './componentes/home/home.component';
import { LecionarioComponent } from './componentes/lecionario/lecionario.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent, data: { animation: 'home' } },
    { path: 'lecionario', component: LecionarioComponent, data: { animation: 'lecionario' } },
    { path: '', redirectTo: '/home', pathMatch: 'full' }
  ];