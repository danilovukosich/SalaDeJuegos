import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink, FormsModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router:Router, private authService:AuthService,  private toast:NgToastService){}

  NavigateMayorMenor():void
  {
    this.router.navigate(["mayor-menor"]);
  }

  NavigateAhoracdo():void
  {
    this.router.navigate(["ahorcado"]);
  }

  // NavigatePreguntados():void
  // {
  //   this.router.navigate(["preguntados"]);
  // }

  NavigateBanderas():void
  {
    this.router.navigate(["banderas"]);
  }


  NavigateSimon():void
  {
    this.router.navigate(["simon"]);
  }

  VerifyCurrentUser()
  {
    if(this.authService.GetUser()!=null)
    {
      return true;
    }
    else
    {
      this.toast.warning("Debe estar loguado para jugar", "Inicie sesion o Registrese");
      return false;
    }

  }

}
