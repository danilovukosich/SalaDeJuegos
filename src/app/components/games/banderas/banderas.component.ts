import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BanderasService } from '../../../services/banderas.service';
import { documentId } from 'firebase/firestore';

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

  banderasIncorrectas:string[] = [];

  paises!:any;

  pais1!:string;
  pais2!:string;
  pais3!:string;
  pais4!:string;



  

  constructor(private banderas:BanderasService)
  {
    this.vidas = 3;
    this.puntos = 0;
    // this.imagenBandera="../../../../assets/images/banderas.png";
    
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.TraerBanderas();

    setTimeout(() => {//tiempo para que no se pise el color al pasar de ronda 
      this.GetPaisCorrecto();
      }, 2000);
    
    
  }

  TraerBanderas()
  {
    this.banderas.TraerPaises().subscribe((paises)=>{
      this.paises = paises;
      console.log(this.paises);

    });
  }

  GetPaisCorrecto()
  {
    let indicePais =Math.round(Math.random() * 250) ;

    console.log(indicePais);
    console.log(this.paises[indicePais]);
    
    this.imagenBandera = this.paises[indicePais].flags.png;
    this.pais1=this.paises[indicePais].name.common;

    this.pais2 = this.paises[Math.round(Math.random() * 250)].name.common;
    this.pais3 = this.paises[Math.round(Math.random() * 250)].name.common;
    this.pais4 = this.paises[Math.round(Math.random() * 250)].name.common;

  }

}
