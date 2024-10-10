import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore'
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from './auth.service';
import { limit, orderBy, query, where } from 'firebase/firestore';
import { groupBy } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EstadisticasService {

  constructor(private firestore:Firestore, private auth:Auth, private toast:NgToastService, private authService:AuthService) { }


  GuardarEstadisticas(juego:string, puntos:number)
  {
    let col = collection(this.firestore, 'stats');
    let date = new Date();

    // Obtener el día, mes y año
    let day = String(date.getDate()); // Día del mes (01-31)
    let month = String(date.getMonth() + 1).padStart(2, '0'); // Mes (01-12)
    let year = date.getFullYear(); // Año (ej. 2024)

    // Formatear la fecha en dd/mm/yyyy
    let formattedDate = day + '/' + month + '/' + year;

    //console.log(formattedDate);
    
    //alert("entro a estadisticas");

    addDoc(col, {fecha: formattedDate, "user": this.auth.currentUser?.email, "game": juego, "points": puntos});
    

  }

  TraerEstadisticas(juego:string)
  {
    let col = collection(this.firestore, "stats");
    const q = query(
      col,
      where('game', '==', juego),  // Filtro por el campo 'juego'
      orderBy('points', 'desc'),         // Ordenar por 'points' de mayor a menor
      limit(5)                             // Limitar a los primeros 5 resultados
    );


    return collectionData(q);

  }

}
