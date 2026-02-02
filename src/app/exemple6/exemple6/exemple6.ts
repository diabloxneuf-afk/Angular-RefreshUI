import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Service6 } from '../service6';
import { MessageDto } from '../../dtos/message.dto';
import { map, Observable, startWith, Subject, switchMap } from 'rxjs';
import { AsyncPipe } from '@angular/common';


@Component({
  selector: 'app-exemple6',
  imports: [FormsModule, AsyncPipe],
  templateUrl: './exemple6.html',
  styleUrl: './exemple6.scss',
})
export class Exemple6 implements OnInit {
  newMessage: string = "";
  private refresh$ = new Subject<void>();
  messages$ = new Observable<MessageDto[]>();
 
  constructor(private service: Service6) {}

  ngOnInit(): void {
    this.messages$ = this.refresh$.pipe(
      startWith(void 0), // 👈 première charge automatique | Sans startWith, il n’y aurait aucune émission tant que je fait fait un refresh$.next().
      switchMap(() => this.service.getMessages())
    );
  }

  addMessage() {
    if (this.newMessage.trim().length > 0) {
        this.service.addMessage({ content: this.newMessage.trim() }).subscribe(() => {
          this.refresh$.next(); //cela déclanche le switchmap, donc getMessages()
        });
        this.newMessage = '';
    }
  }

  removeMessage(id: string) {
    this.service.deleteMessage(id).subscribe(() => {
      this.refresh$.next(); //cela déclanche le switchmap, donc getMessages()
    });
  }
}
