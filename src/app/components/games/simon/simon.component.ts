import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-simon',
  standalone: true,
  imports: [RouterLink, CommonModule, RouterLink, FormsModule],
  templateUrl: './simon.component.html',
  styleUrl: './simon.component.css'
})
export class SimonComponent {

  secuencia: string[] = [];
  usersecuencia: string[] = [];
  botones = ['verde', 'rojo', 'amarillo', 'azul'];
  index = 0;
  flagJugando = false;
  velocidad = 700; // Velocidad inicial (700ms entre botones)
  win!:boolean;
  puntos!:number;

  @ViewChild('botonVerde') botonVerde!: ElementRef;
  @ViewChild('botonRojo') botonRojo!: ElementRef;
  @ViewChild('botonAmarillo') botonAmarillo!: ElementRef;
  @ViewChild('botonAzul') botonAzul!: ElementRef;

  constructor()
  {
    this.win=false;
    this.puntos=0;
  }

  startGame() 
  {
    this.secuencia = [];
    this.usersecuencia = [];
    this.index = 0;
    this.flagJugando = true;
    this.velocidad = 700; // reiniciar la velocidad en cada nuevo juego
    this.puntos=0;
    this.nextRound();
  }

  nextRound() 
  {
    const randomButton = this.botones[Math.floor(Math.random() * 4)];
    this.secuencia.push(randomButton);
    
   if(this.flagJugando==true)
   {
      if(this.secuencia.length < 2)// ronda 1
      {
        setTimeout(() => {//tiempo para que no se pise el color al pasar de ronda 
          this.showsecuencia();
          }, 500);
      }
      if (this.secuencia.length >= 2 && this.secuencia.length <= 4) //rondas 2 a 4
      {
        this.velocidad = 500;// Mas Rapido
        this.puntos = 25;

        setTimeout(() => {
          this.showsecuencia();
          }, 500);
      
      } 
      else if (this.secuencia.length > 4 && this.secuencia.length <= 7) //rondas 5 a 7
      {
        this.velocidad = 300; // Mas Rapido
        this.puntos = 50;
        setTimeout(() => {
          this.showsecuencia();
          }, 500);
      }
      else if (this.secuencia.length > 7 && this.secuencia.length <= 10)// rondas 8 a 10 
      {
        this.velocidad = 250;// Ultimas 2 rondas el nivel mas rapido
        this.puntos = 75;
         setTimeout(() => {
          this.showsecuencia();
         }, 500);
      }
      else if(this.secuencia.length > 10)// A las 10 rondas se gana
      {
        this.flagJugando = false;
        this.win=true;
        this.puntos=100;

        const audio = new Audio('../../../../assets/sounds/win.mp3');
        audio.volume = 0.2;// sonido de victoria a la mitad para que no sea tan fuerte
        audio.play();
      }

   }
   
    
    
  }

  showsecuencia() 
  {
    let delay = 0;

    this.secuencia.forEach((color) => {
      setTimeout(() => {
        this.activateButton(color);
      }, delay);
      
      // Usar la velocidad modificada para ajustar el tiempo entre activaciones
      delay += this.velocidad;
    });
  }

  activateButton(color: string) 
  {
    let buttonElement: ElementRef | undefined;
    let originalColor: string;
    let highlightColor!: string;
    let sonido!:string;

    switch (color) 
    {
      case 'verde':
        buttonElement = this.botonVerde;
        originalColor = 'green';
        highlightColor = 'rgb(4, 206, 4)';
        sonido='../../../../assets/sounds/green.mp3';
        break;
      case 'rojo':
        buttonElement = this.botonRojo;
        originalColor = 'rgb(177, 2, 2)';
        highlightColor = 'red';
        sonido='../../../../assets/sounds/red.mp3';
        break;
      case 'amarillo':
        buttonElement = this.botonAmarillo;
        originalColor = 'rgb(182, 182, 4)';
        highlightColor = 'yellow';
        sonido='../../../../assets/sounds/yellow.mp3';
        break;
      case 'azul':
        buttonElement = this.botonAzul;
        originalColor = 'rgb(4, 126, 156)';
        highlightColor = 'rgb(0, 201, 252)';
        sonido='../../../../assets/sounds/blue.mp3';
        break;
    }

    const audio = new Audio(sonido);
    audio.volume = 0.5;
    audio.play();

    if (buttonElement) 
    {
      buttonElement.nativeElement.style.backgroundColor = highlightColor;

      setTimeout(() => {
        buttonElement!.nativeElement.style.backgroundColor = originalColor;
      }, 180);//200 para que no se pisen los colores con el cambio de velocidad tiene q ser menor a la velocidad maxima de 300ms
    }
  }

  onClick(color: string) 
  {
    if (!this.flagJugando) return;

    this.activateButton(color);
    this.usersecuencia.push(color);

    if (this.usersecuencia[this.index] === this.secuencia[this.index]) 
    {
      this.index++;

      if (this.index === this.secuencia.length) 
      {
        this.usersecuencia = [];
        this.index = 0;
        setTimeout(() => this.nextRound(), 1000);
      }
    } 
    else 
    {
      this.flagJugando = false;
      const audio = new Audio('../../../../assets/sounds/lose.mp3');
      audio.play();
    }
  }
}
