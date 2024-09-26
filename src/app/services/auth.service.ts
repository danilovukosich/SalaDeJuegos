import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth, private firestore:Firestore, private router:Router) //inyeccion de dependencias
  {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(()=>{

    },1000);
  }

  LogUser(email:string,password:string):boolean // funcion de login
  {
    signInWithEmailAndPassword(this.auth, email,password)
    .then(()=>{

      console.log("Se logueo exitosamente!");

      this.Log();//logs en firestore

      this.router.navigate(["home"]);//redireccion al home
       
      return true;
    })
    .catch((e)=>{

      switch(e.code)
      {
        case "auth/invalid-credential":
        //agragar alert
        break;
        
        case "auth/invalid-email":
        //agragar alert
        break;

        default:

        break;
      }

      return false;
    })
    return false;
  } 

  Register(nuevoUsuarioMail:string,nuevoUsuarioContra:string)
  {
    createUserWithEmailAndPassword(this.auth, nuevoUsuarioMail,nuevoUsuarioContra)
    .then((res)=>{

      //if(res.user.email !== null) this.flagUserLoged = true;

      this.router.navigate(["home"]);
      this.LogUser(nuevoUsuarioMail, nuevoUsuarioContra);
    })
    .catch((e)=>{
      console.log(e.code);

      //this.flagUserLoged = false;

      switch (e.code) {
        case "auth/invalid-email":
          // this.msjError = "Email invalido";
          //this.ShowModal("Error","Email invalido.","error");
        break;
        case "auth/email-already-in-use":
          // this.msjError = "Email ya en uso";
          //this.ShowModal("Error","Email ya en uso.","error");
        break;
        case "auth/weak-password":
          // this.msjError = e.code
          //this.ShowModal("Error","Password muy debil. Debe contener al menos 6 letras.","error");
        break;
        case "auth/invalid-credential":
          //this.ShowModal("Error","Credenciales invalidas.","error");
        break;
        default:
          // this.msjError = e.code
          //this.ShowModal("Error","Se produjo un error.","error");
        break;
      }
    })
  }

  Log()//Funcion que creo los logs un vez que inicion secion el usuario 
  {
    let col = collection(this.firestore, 'logs');
    
    addDoc(col,{fecha:new Date(), "userMail":this.auth.currentUser?.email});
  }

  LogOut()//Funcion de loogut
  {
    signOut(this.auth).then(()=>{
      console.log("Se deslogueo exitosamente!");
    });
  }

  GetUser()//trae el usuario si esta logueado, sino devuelve null
  {
    return this.auth.currentUser;
  }





}
