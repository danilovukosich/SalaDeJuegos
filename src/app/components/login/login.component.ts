import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { addDoc, collection, Firestore } from 'firebase/firestore';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{


    email!:string;
    password!:string;

    constructor(private auth:AuthService)
    {
        
    }

    LogIn()
    {   
        this.auth.LogUser(this.email, this.password);
    }
    

    ShowHidePassword():void
    {
            
        let eyeIcon:any = document.getElementById('eyeIcon');
        let password:any = document.getElementById('password-login');


        
        if(password.type == "password")
        {
            password.type = "text";
            eyeIcon.className = "bx bxs-hide";
        }
        else
        {
            eyeIcon.className = "bx bxs-show";
            password.type = "password"
        }   
    }

    LogInRegisterButton():void
    {
        const container:any = document.querySelector('.container');

        container.classList.add('active');
    }

    RegisterLogInButton():void
    {
        const container:any = document.querySelector('.container');

        container.classList.remove('active');
    }


}

