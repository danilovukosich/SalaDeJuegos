import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore'
import { orderBy, query } from 'firebase/firestore';
import { NgToastService } from 'ng-angular-popup';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private firestore:Firestore, private auth:Auth, private toast:NgToastService) { }




  GuardarMensaje(mensaje:string)
  {
    if(mensaje!="" && mensaje!=" " && mensaje.trim() !== "" && mensaje!=null && mensaje!=undefined)
    {
      let col = collection(this.firestore, 'messages');
      let date = new Date();
      let horas = date.getHours();
      let minutos = date.getMinutes()

      addDoc(col,{fecha: date, "userMail":this.auth.currentUser?.email, "message":mensaje, "hora": horas + ":" + minutos});
    }
    else
    {
      this.toast.warning("Escriba algo antes de enviar un mensaje");
    }
    
  }

  TraerMensajes()
  {
    let col = collection(this.firestore, "messages");

    const q = query(col, orderBy('fecha','asc'));

    return collectionData(q);
  }




  }







