import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EstadisticasService } from '../../services/estadisticas.service';

@Component({
  selector: 'app-stats',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.css'
})
export class StatsComponent {

  juego!:string

  estadisticas:any[] = [];

  constructor(private stats: EstadisticasService)
  {
    this.juego="Banderas";
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.LlenarTabla("banderas");
  }

  LlenarTabla(juego:string)
  {
    switch(juego)//seteo el titulo h2 en el html
    {
      case "banderas":
        this.juego="Banderas"
        break;

      case "ahorcado":
        this.juego="Ahorcado"
        break;

      case "mayorMenor":
        this.juego="Mayor o Menor"
        break;

      case "simon":
        this.juego="Simon"
        break;

    }
    this.stats.TraerEstadisticas(juego).subscribe((estadisticas:any[])=>{
      this.estadisticas=estadisticas;
      console.log(estadisticas);
      
    });
  }

}
