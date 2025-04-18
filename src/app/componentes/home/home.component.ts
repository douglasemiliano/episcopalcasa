import { CdkDrag } from "@angular/cdk/drag-drop";
import { OverlayModule } from "@angular/cdk/overlay";
import { CommonModule, DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule, provideNativeDateAdapter } from "@angular/material/core";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";
import { NgSelectComponent } from "@ng-select/ng-select";
import { LecionarioService } from "../../services/lecionario.service";



@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [provideNativeDateAdapter()],
  imports: [FormsModule,
    CommonModule, MatButtonModule,
    MatIconModule, MatRippleModule, MatCardModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule,
    MatInputModule, OverlayModule],
})
export class HomeComponent implements OnInit {
  dataUnica: Date = new Date();

  constructor(private router: Router, private lecionarioService: LecionarioService) {

  }
  ngOnInit() {

  }

  goToLecionario() {
    this.router.navigateByUrl("/lecionario")
  }

  goToBiblia() {
    this.router.navigateByUrl("/biblia")
  }

  mudouData() {
    this.lecionarioService.dataUnica.set(this.dataUnica);
    this.router.navigateByUrl("/lecionario")
  }
}
