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

  gano!:boolean;
  perdio!:boolean;


  palabras: string[] = [
    'GATITO', 'CIELOSO', 'SOLANA', 'LLUVIA', 'CASTILLO', 'PALABRA', 'MURALLA', 'CIENCIA', 'TRENES',
    'ANILLOS', 'PEQUEÑO', 'CUADERNO', 'PARAGUAS', 'PELIGRO', 'JARDINES', 'MELONERO', 'BOSQUES', 'RELOJES', 'ESPINAS',
    'COLORES', 'TIGRES', 'BOTELLA', 'PIZARRON', 'LAMPARAS', 'SOMBRA', 'MUÑECO', 'TIJERAS', 'CUCHARAS', 'FRUTERO',
    'PARQUES', 'ESTRELLA', 'COMEDOR', 'FLORERO', 'VENTILAR', 'MUSEO', 'AVIONES', 'CEREZAS', 'LIBERAR', 'MOTIVOS',
    'MANTEROS', 'ANDENES', 'SALUDOS', 'CARRERA', 'NAVEGAR', 'PRENDAS', 'CAMINAR', 'BATALLA', 'MONTES', 'HORMIGA'
  ];

  palabraSeleccionada: string = '';
  palabraOculta: string[] = [];
  letrasSeleccionadas: string[] = [];


  constructor() 
  {
    this.puntos=0;
    this.vidas=6;//seis vidas por cada parte del cuerpo (cabeza, torso, 2 brazos, 2 piernas)
    this.iniciarJuego();
  }

  iniciarJuego() 
  {
    // Selecciona una palabra aleatoria y oculta con guiones bajos
    this.palabraSeleccionada = this.palabras[Math.floor(Math.random() * this.palabras.length)];
    this.palabraOculta = Array(this.palabraSeleccionada.length).fill('_');
    this.letrasSeleccionadas = [];
    this.vidas = 6;
    console.log(this.palabraSeleccionada);//palabra seleccionada.
    
  }

  seleccionarLetra(letra: string) 
  {
    
    if (this.letrasSeleccionadas.includes(letra)) return;

    this.letrasSeleccionadas.push(letra);

    if (this.palabraSeleccionada.includes(letra)) 
    {
      
      for (let i = 0; i < this.palabraSeleccionada.length; i++) 
      {
        if (this.palabraSeleccionada[i] === letra) 
        {
          this.palabraOculta[i] = letra;
        }
      }
      this.puntos += 5; // Suma puntos si acierta
    } else {
      this.vidas--; // Resta una vida si falla
    }

    // Verifica ganado o perdido
    if (this.vidas === 0) 
    {
      // alert('¡Has perdido! La palabra era: ' + this.palabraSeleccionada);
      this.puntos=0;
      this.perdio=true;
      setTimeout(()=>{

        this.reiniciarJuego();
      },3000);
    }

    if (!this.palabraOculta.includes('_')) 
    {
      // alert('¡Felicidades, has ganado!');
      this.gano=true;
      this.puntos += 25; // Puntos extra por ganar
      setTimeout(()=>{
        this.reiniciarJuego();

      },3000);
    }
  }

  reiniciarJuego() 
  {
    this.gano=false;
    this.perdio=false;

    this.iniciarJuego();
  }

  obtenerImagenAhorcado(): string 
  {
    return `../../../../assets/images/ahorcado${7 - this.vidas}.png`;
  }




  
}
