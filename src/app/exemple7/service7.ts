import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MessageDto } from '../dtos/message.dto';
import { map, Observable, startWith, Subject, switchMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Service7 {
  url = 'https://my-new-project-e3774-default-rtdb.firebaseio.com/messages.json';
  private refresh$ = new Subject<void>();

  messages$ = this.refresh$.pipe(
      startWith(void 0), // 👈 première charge automatique | Sans startWith, il n’y aurait aucune émission tant que je fait fait un refresh$.next().
      switchMap(() => this.getMessages())
  );

  constructor(private http: HttpClient) {}

  addMessage(message: MessageDto): Observable<void> {
    return this.http.post<void>(this.url, message).pipe(
      tap(() => this.refresh$.next()) //cela déclanche le switchmap, donc getMessages()
    );
  }

  getMessages(): Observable<MessageDto[]> {
    return this.http.get<MessageDto[]>(this.url).pipe(
      map((data) => {
        if (!data) {
          return [];
        }

        return Object.entries(data).map(([key, value]) => ({
          ...value,
          id: key,
        }));
      })
    );
  }

  deleteMessage(id: string): Observable<void> {
    console.log('sdadsdas');
    const deleteUrl = `https://my-new-project-e3774-default-rtdb.firebaseio.com/messages/${id}.json`;

    return this.http.delete<void>(deleteUrl).pipe(
      tap(() => this.refresh$.next()) //cela déclanche le switchmap, donc getMessages()
    );
  }
}
