import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartasService } from '../../../services/cartas.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-mayor-menor',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './mayor-menor.component.html',
  styleUrl: './mayor-menor.component.css'
})
export class MayorMenorComponent {

  puntos!:number;
  vidas!:number;

  mazo!:any;
  carta!:any;
  cartaImagen!:HTMLImageElement;

  subscripcion!:Subscription;

  constructor(private cartaService:CartasService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.vidas = 2;//sacar cunado no se mas de prueba
    this.puntos = 0;//sacar cunado no se mas de prueba

   /*  this.subscripcion = this.paisesService.getPaises()
    .subscribe(paises => {
      this.paises = paises;
      
    });
 */
    this.TraerMazo();
    setTimeout(()=>{
      this.TraerCarta();
    },1000);

  }

  
  TraerMazo()
  {
    this.cartaService.GetMazo().subscribe((data)=>{
      this.mazo = data;
      console.log(this.mazo);
      console.log(this.mazo.deck_id);
    });
  }

  TraerCarta()
  {
    this.cartaService.GetCarta(this.mazo.deck_id).subscribe((carta)=>{
      this.carta = carta.cards[0];
      this.cartaImagen = carta.cards[0].image;
      console.log(this.carta);
    });
  }



}
