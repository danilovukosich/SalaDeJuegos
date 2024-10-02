import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css'
})
export class AhorcadoComponent {

  vidas!:number;
  puntos!:number;

  constructor()
  {
    this.puntos=0;
    this.vidas=6;//seis vidas por cada parte del cuerpo (cabeza, torso, 2 brazos, 2 piernas)
  }


  
}
