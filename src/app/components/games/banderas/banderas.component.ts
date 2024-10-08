import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-banderas',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './banderas.component.html',
  styleUrl: './banderas.component.css'
})
export class BanderasComponent {

  vidas!:number;
  puntos!:number;

  constructor()
  {
    this.vidas = 3;
    this.puntos = 0;
  }

}
