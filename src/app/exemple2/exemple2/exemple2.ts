import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageDto } from '../../dtos/message.dto';
import { FormsModule } from '@angular/forms';
import { Service2 } from '../service2/service2';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-exemple2',
  imports: [FormsModule],
  templateUrl: './exemple2.html',
  styleUrl: './exemple2.scss',
  providers: [],
})
export class Exemple2 implements OnInit {
  newMessage: string = '';
  messages: MessageDto[] = [];

  constructor(
    private service: Service2,
    private cdr: ChangeDetectorRef,
  ) {}

  async ngOnInit() {
    await this.getMessages();
  }

  async addMessage() {
    if (this.newMessage.trim().length > 0) {
      await firstValueFrom(this.service.addMessage({ content: this.newMessage.trim() }));
      await this.getMessages();
      this.newMessage = '';
    }
  }

  async getMessages() {
    this.messages = await firstValueFrom(this.service.getMessages());
    this.cdr.markForCheck(); //refresh le ui
  }

  async removeMessage(id: string) {
    await firstValueFrom(this.service.deleteMessage(id));
    await this.getMessages();
  }
}
