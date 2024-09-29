import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ChatService } from '../../services/chat.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent 
{

  constructor(private chat:ChatService, private auth:AuthService){}


  mensaje!:string;
  mensajes:any[] = [];
  userEmail:any;

  @ViewChild('containerDos') containerDos!: ElementRef;

  
  private scrollToBottom(): void {
    if (this.containerDos) {
      const container = this.containerDos.nativeElement;
      container.scrollTop = container.scrollHeight;
    } else {
      console.error('containerDos is undefined');
    }
  }

  GuardarMensaje()
  {
    this.chat.GuardarMensaje(this.mensaje);
    this.mensaje="";
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.chat.TraerMensajes().subscribe((messages:any[])=>{
      this.mensajes = messages;
      //console.log(this.mensajes);
      this.scrollToBottom(); 
    });

    const user = this.auth.GetUser();
    this.userEmail = user?.email;
    console.log(this.userEmail);

  }

  ngAfterViewChecked()//chekea cambios en la view
  {
    this.scrollToBottom();
    let user = this.auth.GetUser();
    this.userEmail = user?.email;
  }




  

}
