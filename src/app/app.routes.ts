import { Routes } from '@angular/router';
import { BibliaComponent } from './componentes/biblia/biblia.component';
import { HomeComponent } from './componentes/home/home.component';
import { LecionarioComponent } from './componentes/lecionario/lecionario.component';

export const routes: Routes = [
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", component: HomeComponent},
    { path: "lecionario", component: LecionarioComponent},
    { path: "biblia", component: BibliaComponent}
];
