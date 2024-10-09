import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartasService } from '../../../services/cartas.service';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup';



@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {

  //METRICAS
  puntos!:number;
  vidas!:number;

  //CARTAS
  mazo!:any;
  cartaActual!:any;
  cartaSiguiente!:any;
  cartaImagen!:HTMLImageElement;

  //SUBCRIPTION
  subscripcion!:Subscription;

  constructor(private cartaService:CartasService, private toast:NgToastService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.vidas = 3;
    this.puntos = 0;

    this.TraerMazo();
  }

  
  TraerMazo()
  {
    this.cartaService.GetMazo().subscribe((data)=>{
      this.mazo = data;
      this.TraerPrimerCarta();
      console.log(this.mazo);
      
    });
  }

  TraerPrimerCarta()
  {
    this.cartaService.GetCarta(this.mazo.deck_id).subscribe((carta)=>{
      this.cartaActual = carta.cards[0];
      this.cartaImagen = carta.cards[0].image;
      /* console.log(this.carta); */
    });
  }

  TraerSiguienteCartaMayor()
  {
    this.cartaService.GetCarta(this.mazo.deck_id).subscribe((carta)=>{
      
      this.cartaSiguiente = carta.cards[0];

      const valorActual = this.convertirValor(this.cartaActual.value);
      const valorSiguiente = this.convertirValor(this.cartaSiguiente.value);

      
      /* console.log(valorSiguiente);
      console.log("Es mayor que...");
      console.log(valorActual); */

      if(valorSiguiente > valorActual)
      {
        this.puntos+=5;
      }
      else
      {
        this.vidas-=1;
      }

      this.cartaActual=this.cartaSiguiente;
      this.cartaImagen=this.cartaActual.image;

    });
  }

  TraerSiguienteCartaMenor()
  {
    this.cartaService.GetCarta(this.mazo.deck_id).subscribe((carta)=>{
      
      this.cartaSiguiente = carta.cards[0];

      const valorActual = this.convertirValor(this.cartaActual.value);
      const valorSiguiente = this.convertirValor(this.cartaSiguiente.value);

      /* console.log(valorSiguiente);
      console.log("Es menor que...");
      console.log(valorActual); */
      
      
      if(valorSiguiente < valorActual)
        {
          this.puntos+=5;
        }
        else
        {
          this.vidas-=1;
        }

        this.cartaActual=this.cartaSiguiente;
        this.cartaImagen=this.cartaActual.image;

    });
  }

  TraerSiguienteIgual()
  {
    this.cartaService.GetCarta(this.mazo.deck_id).subscribe((carta)=>{
      
      this.cartaSiguiente = carta.cards[0];

      const valorActual = this.convertirValor(this.cartaActual.value);
      const valorSiguiente = this.convertirValor(this.cartaSiguiente.value);

      /* console.log(valorSiguiente);
      console.log("Es igual que...");
      console.log(valorActual); */
      
      
      if(valorSiguiente == valorActual)
        {
          this.puntos+=15;
        }
        else
        {
          this.vidas-=1;
        }

        this.cartaActual=this.cartaSiguiente;
        this.cartaImagen=this.cartaActual.image;

    });
  }

  convertirValor(valor: string): number 
  {
    switch (valor) 
    {
      case 'ACE':
        return 14;

      case 'KING':
        return 13;

      case 'QUEEN':
        return 12;

      case 'JACK':
        return 11;

      default:
        return parseInt(valor);
    }
  }
  

  ngAfterViewChecked()//chekea cambios en la view
  {
    if(this.vidas==0)
    {
      this.toast.danger("Sus puntos fueron: "+this.puntos, "PERDIO");
      this.puntos = 0;
      this.vidas = 3;

      this.TraerMazo();
    }
  }



}
