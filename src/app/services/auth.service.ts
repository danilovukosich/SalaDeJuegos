import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { NgToastService } from 'ng-angular-popup';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth, private firestore:Firestore, private router:Router, private toast:NgToastService) //inyeccion de dependencias
  {

  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    setTimeout(()=>{

    },1000);
  }
  

  //TIPOS DE ALERTS
  //this.toast.success("This is new success message", "SUCCESS", 5000);
  //this.toast.danger("This is new error message"); // by default visible duration is 2000ms
  //this.toast.info("This is new info message", "INFO", 5000);
  //this.toast.warning("This is new warning message", "WARNING", 5000);


  LogUser(email:string,password:string):boolean // funcion de login
  {
    signInWithEmailAndPassword(this.auth, email,password)
    .then(()=>{

      //console.log("Se logueo exitosamente!");
      this.toast.success("Logueo exitoso", "Exito");
      this.Log();//logs en firestore

      this.router.navigate(["home"]);//redireccion al home
       
      return true;
    })
    .catch((e)=>{

      switch(e.code)
      {
        case "auth/invalid-credential":
        //agragar alert
        this.toast.danger("Credenciales invalidas", "Error");
        break;
        
        case "auth/invalid-email":
          this.toast.danger("Email invalido", "Error");
        break;

        default:
          this.toast.danger("Credenciales invalidas", "Error");
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

      this.toast.success("Registro exitoso", "Exito");
      this.router.navigate(["home"]);
      this.LogUser(nuevoUsuarioMail, nuevoUsuarioContra);
    })
    .catch((e)=>{
      console.log(e.code);

      switch (e.code) {
        case "auth/invalid-email":
          this.toast.danger("Email Invalido", "Error");
        break;
        case "auth/email-already-in-use":
          this.toast.danger("Email en uso", "Error");
        break;
        case "auth/weak-password":
          this.toast.danger("Contraseña debil", "Error");
        break;
        case "auth/invalid-credential":
          this.toast.danger("Credenciales invalidas", "Error");
        break;
        default:
          this.toast.danger("Credenciales invalidas", "Error");
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
      this.toast.info("Se deslogueo", "Atencion");
      this.router.navigate(["login"]);
    });
  }

  GetUser()//trae el usuario si esta logueado, sino devuelve null
  {
    return this.auth.currentUser;
  }





}
