import { Component, Inject, Injectable } from '@angular/core';
import { MessageDto } from '../../dtos/message.dto';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service2 {
  url = 'https://my-new-project-e3774-default-rtdb.firebaseio.com/messages.json';

  constructor(private http: HttpClient) {}

  addMessage(message: MessageDto): Observable<void> {
    return this.http.post<void>(this.url, message);
  }

  getMessages(): Observable<MessageDto[]> {
    console.log(this.http.get<MessageDto[]>(this.url));

    return this.http.get<MessageDto[]>(this.url).pipe(
      map((data) => {
        if (!data) {
          return [];
        }

        //ceci va retriev la key de chaque élément de array et le mettre dans id
        //retourne la liste complete avec id et content
        return Object.entries(data).map(([key, value]) => ({
          ...value,
          id: key,
        }));

        //ne marche pas comme il faut, car je veux retriev la key de l'object our la mettre dans id
        /*
        const messages = Object.values(data); //transforme un object en tableau
        console.log(data)
        messages.forEach((msg) => {
          console.log(msg.content);
          console.log(msg.id);
        });

        return messages;
        */
      }),
    );
  }

  deleteMessage(id: string): Observable<void> {
    const deleteUrl = `https://my-new-project-e3774-default-rtdb.firebaseio.com/messages/${id}.json`;

    return this.http.delete<void>(deleteUrl);
  }
}
