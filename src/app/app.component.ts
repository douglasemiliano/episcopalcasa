import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,MatIconModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  title = 'casa';
  activeButton: string = 'home'; 

  constructor(private router: Router){

  }

  goToLecionario(){
    this.router.navigateByUrl("lecionario")
  }

  goToHome(){
    this.router.navigateByUrl("/home")
  }

  setActiveButton(button: string): void {
    this.activeButton = button; // Atualiza o botão ativo
  }

}
