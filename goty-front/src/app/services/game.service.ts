import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Game } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class GameService {
  private juegos: Game[] = [];

  constructor(private http: HttpClient) {}

  getJuegos() {
    if (this.juegos.length === 0) {
      return this.http
        .get<Game[]>(`${environment.url}/api/goty`)
        .pipe(tap((juegos) => (this.juegos = juegos)));
    } else {
      return of(this.juegos);
    }
  }

  votarJuego(id: string) {
    return this.http
      .post(`${environment.url}/api/goty/${id}`, {})
      .pipe(catchError((error) => of(error.error)));
  }
}
