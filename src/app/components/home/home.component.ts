import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

constructor(private router:Router){}

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

}
