import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BanderasService } from '../../../services/banderas.service';
import { documentId } from 'firebase/firestore';
import { EstadisticasService } from '../../../services/estadisticas.service';
import { AuthService } from '../../../services/auth.service';

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

  banderaCorrecta!:string;
  imagenBandera:string = "";

  paises!:any[];
  opcionesPaises:string[]=[];

  respuestaSeleccionada!: string; 
  esCorrecta: boolean = false;
  

  constructor(private banderas:BanderasService, private stats:EstadisticasService, private authService:AuthService)
  {
    this.vidas = 3;
    this.puntos = 0;
    this.imagenBandera="../../../../assets/images/banderaVacia.png";
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TraerBanderas();    
    
  }

  TraerBanderas()
  {
    this.banderas.TraerPaises().subscribe((paises)=>{
      this.paises = paises;
      console.log(this.paises);
      this.IniciarRonda();
    });
  }

  // iniciar una nueva ronda
  IniciarRonda(): void 
  {
    this.opcionesPaises = [];
    const indicePaisCorrecto = Math.floor(Math.random() * this.paises.length);
    const paisCorrecto = this.paises[indicePaisCorrecto];

    // asigna la bandera e informacion correcta
    this.imagenBandera = paisCorrecto.flags.png;
    this.banderaCorrecta = paisCorrecto.translations.spa.common;

    

    //la opcion correcta
    this.opcionesPaises.push(this.banderaCorrecta);

    //3 opcionesPaises incorrectas
    while (this.opcionesPaises.length < 4) 
    {
      const indicePaisIncorrecto = Math.floor(Math.random() * this.paises.length);
      const paisIncorrecto = this.paises[indicePaisIncorrecto].translations.spa.common;

      // duplicados
      if (!this.opcionesPaises.includes(paisIncorrecto)) 
      {
        this.opcionesPaises.push(paisIncorrecto);
      }
    }

    //que la correcta no este siempre en la misma posicion
    this.opcionesPaises = this.MezclarOpciones(this.opcionesPaises);
    this.respuestaSeleccionada = ''; // Reinicia la selección

  }

  // mezclar las opcionesPaises
  MezclarOpciones(opciones: string[]): string[] 
  {
    for (let i = opciones.length - 1; i > 0; i--) 
    {
      const j = Math.floor(Math.random() * (i + 1));
      [opciones[i], opciones[j]] = [opciones[j], opciones[i]];
    }

    return opciones;
  }

  // verificar si la opcion seleccionada es correcta
  VerificarRespuesta(opcionSeleccionada: string): void 
  {

    this.respuestaSeleccionada = opcionSeleccionada;
    this.esCorrecta = opcionSeleccionada === this.banderaCorrecta;

    setTimeout(() => {
      if (opcionSeleccionada === this.banderaCorrecta) 
      {
        this.puntos+=5;
        // alert('¡Correcto!');
      } else {
        this.vidas--;
        // alert('Incorrecto. Vidas restantes: ' + this.vidas);
      }

      // comproba si el juego sigue o si se han acabado las vidas
      if (this.vidas > 0) 
      {
        this.IniciarRonda(); // Inicia una nueva ronda
      } 
      else 
      {
        //alert('Juego terminado. Puntos: ' + this.puntos);
        this.GameOver();
        console.log("perdio");
        
      }
    }, 500);
  }

  ReiniciarJuego()
  {
    this.vidas=3;
    this.puntos=0;
    this.opcionesPaises = [];
    this.IniciarRonda();
  }


  GameOver()
  {
    if(this.VerifyCurrentUser())
    {
      this.stats.GuardarEstadisticas("banderas", this.puntos);
    }
  }


  VerifyCurrentUser()
  {
    if(this.authService.GetUser()!=null)
    {
      return true;
    }
    else
    {
      return false;
    }

  }

  

}
