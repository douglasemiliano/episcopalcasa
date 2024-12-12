import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',

  imports: [CommonModule, FormsModule, RouterModule, MatIconModule]
})
export class HomeComponent implements OnInit {

  constructor(private router: Router ) {

  }
  ngOnInit() {
    
  }

  goToLecionario(){
    this.router.navigateByUrl("/lecionario")
  }

  goToBiblia(){
    this.router.navigateByUrl("/biblia")
  }
}
