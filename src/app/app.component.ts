import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';
import { MatIconModule } from '@angular/material/icon';
import { routeAnimations } from './animation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [MatIconModule, RouterOutlet],
  animations: [routeAnimations],
  standalone: true,
})
export class AppComponent implements OnInit {
  title = 'casa';
  activeButton: string = 'home';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.activeButton = this.router.url.replace('/', '');
      }
    });
  }

  goToLecionario() {
    this.router.navigate(['lecionario']);
  }

  goToHome() {
    this.router.navigate(['home']);
  }

  setActiveButton(button: string): void {
    this.activeButton = button;
  }

  prepareRoute(outlet: any) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
}

