import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { addDoc, collection } from 'firebase/firestore';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, CommonModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css'
})
export class EncuestaComponent {

  form!:FormGroup;
  formSubido = false;


  constructor(private firestore:Firestore, private toast:NgToastService, private auth:Auth){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form = new FormGroup({

      nombre: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      apellido: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      edad: new FormControl("", [Validators.required, Validators.min(18), Validators.max(99)]),
      telefono: new FormControl("", [Validators.required, Validators.pattern('^[0-9]+$')]),
      conocio: new FormControl("", [Validators.required, Validators.pattern('^[a-zA-Z ]+$')]),
      recomendaria: new FormControl("si"),
      juegoFavorito: new FormControl("banderas",[Validators.required]) 
    });


  }

  EnviarEncuesta()
  {
    this.formSubido = true;
    // console.log("form");
    
    // console.log(this.form.get('nombre')?.value);

    if(this.form.valid)
    {
      
      let col = collection(this.firestore, 'encuesta');
      let date = new Date();
      addDoc(col,{fecha: date, "userMail":this.auth.currentUser?.email, 
                                "nombre":this.form.get('nombre')?.value, 
                                "apellido": this.form.get('apellido')?.value, 
                                "edad": this.form.get('edad')?.value,
                                "telefono": this.form.get('telefono')?.value,
                                "conocio": this.form.get('conocio')?.value,
                                "recomendaria": this.form.get('recomendaria')?.value,
                                "favorito":this.form.get('juegoFavorito')?.value});


                                this.toast.success("¡Encuesta enviada!");
                                
                                this.form.reset();
                                this.formSubido=false;
    }
    else
    {
      this.toast.warning("Verifique el formulario");
    }
  }

  get nombre()
  {
    return this.form.get('nombre');
  }

  get apellido()
  {
    return this.form.get('apellido');
  }

  get edad()
  {
    return this.form.get('edad');
  }

  get telefono()
  {
    return this.form.get('telefono');
  }

  get conocio()
  {
    return this.form.get('conocio');
  }

  get juegoFavorito()
  {
    return this.form.get('juegosFavoritos');
  }


  


}
