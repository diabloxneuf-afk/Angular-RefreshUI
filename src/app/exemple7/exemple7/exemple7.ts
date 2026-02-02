import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Service7 } from '../service7';
import { MessageDto } from '../../dtos/message.dto';
import { map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-exemple7',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './exemple7.html',
  styleUrl: './exemple7.scss',
})

export class Exemple7 implements OnInit {
  newMessage: string = "";
  messages$ = new Observable<MessageDto[]>();
 
  constructor(private service: Service7) {}

  ngOnInit(): void {
    this.messages$ = this.service.messages$;
  }

  addMessage() {
    if (this.newMessage.trim().length > 0) {
        this.service.addMessage({ content: this.newMessage.trim() }).subscribe();
        this.newMessage = '';
    }
  }

  removeMessage(id: string) {
    this.service.deleteMessage(id).subscribe();
  }
}
