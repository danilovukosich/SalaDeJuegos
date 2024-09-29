import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore'
import { orderBy, query } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore:Firestore, private auth:Auth) { }




  GuardarMensaje(mensaje:string)
  {
    let col = collection(this.firestore, 'messages');
    let date = new Date();
    let horas = date.getHours();
    let minutos = date.getMinutes()

    addDoc(col,{fecha: date, "userMail":this.auth.currentUser?.email, "message":mensaje, "hora": horas + ":" + minutos});
  }

  TraerMensajes()
  {
    let col = collection(this.firestore, "messages");

    const q = query(col, orderBy('fecha','asc'));

    return collectionData(q);
  }




  }







