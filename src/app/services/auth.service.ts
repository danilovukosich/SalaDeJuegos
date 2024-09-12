import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, signOut } from '@angular/fire/auth';
 

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth:Auth) 
  {

  }

  LogUser(email:string,password:string):boolean
  {
    signInWithEmailAndPassword(this.auth, email,password)
    .then(()=>{

      console.log("Entro mmm");
      
      return true;
    })
    .catch((e)=>{

      switch(e.code)
      {
          case "auth/invalid-credential":

          case "auth/invalid-email":

          break;
          default:

          break;
      }

      return false;
    })
    return false;
  } 

  LogOut()
  {
    signOut(this.auth).then(()=>{
      console.log("salio mmm");
    });
  }



}
