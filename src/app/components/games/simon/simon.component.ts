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

  sequence: string[] = [];
  userSequence: string[] = [];
  buttons = ['verde', 'rojo', 'amarillo', 'azul'];
  index = 0;
  playing = false;
  speed = 1000; // Velocidad inicial (1 segundo entre botones)
  win!:boolean;
  points!:number;

  @ViewChild('botonVerde') botonVerde!: ElementRef;
  @ViewChild('botonRojo') botonRojo!: ElementRef;
  @ViewChild('botonAmarillo') botonAmarillo!: ElementRef;
  @ViewChild('botonAzul') botonAzul!: ElementRef;

  constructor()
  {
    this.win=false;
    this.points=0;
  }

  startGame() 
  {
    this.sequence = [];
    this.userSequence = [];
    this.index = 0;
    this.playing = true;
    this.speed = 1000; // Reiniciar la velocidad en cada nuevo juego
    this.nextRound();
  }

  nextRound() 
  {
    const randomButton = this.buttons[Math.floor(Math.random() * 4)];
    this.sequence.push(randomButton);
    
    // Aumentar la velocidad a partir de la 3ra y 6ta ronda
    if (this.sequence.length >= 3 && this.sequence.length < 6) 
    {
      this.speed = 750; // Más rápido a partir de la 3ra ronda
    } 
    else if (this.sequence.length >= 6) 
    {
      this.speed = 500; // Aún más rápido a partir de la 6ta ronda
    }
    else if (this.sequence.length >= 7)
    {
      this.speed = 300;// Ultimas 2 rondas lo mas rapido
    }
    else if(this.sequence.length == 8)// A las 8 rondas se gana
    {
      this.playing = false;
      this.win=true;
      this.points=100;
      alert('Usted gano delicidades')
    }

    setTimeout(() => {//tiempo para que no se pise el color al pasar de ronda
      this.showSequence();
    }, 500);
    
  }

  showSequence() 
  {
    let delay = 0;

    this.sequence.forEach((color) => {
      setTimeout(() => {
        this.activateButton(color);
      }, delay);
      
      // Usar la velocidad modificada para ajustar el tiempo entre activaciones
      delay += this.speed;
    });
  }

  activateButton(color: string) 
  {
    let buttonElement: ElementRef | undefined;
    let originalColor: string;
    let highlightColor!: string;

    switch (color) 
    {
      case 'verde':
        buttonElement = this.botonVerde;
        originalColor = 'green';
        highlightColor = 'rgb(4, 206, 4)';
        break;
      case 'rojo':
        buttonElement = this.botonRojo;
        originalColor = 'rgb(177, 2, 2)';
        highlightColor = 'red';
        break;
      case 'amarillo':
        buttonElement = this.botonAmarillo;
        originalColor = 'rgb(182, 182, 4)';
        highlightColor = 'yellow';
        break;
      case 'azul':
        buttonElement = this.botonAzul;
        originalColor = 'rgb(4, 126, 156)';
        highlightColor = 'rgb(0, 201, 252)';
        break;
    }

    if (buttonElement) 
    {
      buttonElement.nativeElement.style.backgroundColor = highlightColor;

      setTimeout(() => {
        buttonElement!.nativeElement.style.backgroundColor = originalColor;
      }, 200);//200 para que no se pisen los colores con el cambio de velocidad
    }
  }

  onClick(color: string) 
  {
    if (!this.playing) return;

    this.activateButton(color);
    this.userSequence.push(color);

    if (this.userSequence[this.index] === this.sequence[this.index]) 
    {
      this.index++;

      if (this.index === this.sequence.length) 
      {
        this.userSequence = [];
        this.index = 0;
        setTimeout(() => this.nextRound(), 1000);
      }
    } 
    else 
    {
      this.playing = false;
      alert('Game Over! Start again.');
    }
  }
}
