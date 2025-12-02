import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, tap } from 'rxjs';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = '/api/games';

  constructor(private http: HttpClient) {}

  // Recupera la lista giochi e li ordina alfabeticamente
  getGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.apiUrl).pipe(
      tap(games => console.log('Lista giochi ricevuta:', games)),
      map(games => [...games].sort((a, b) => a.title.localeCompare(b.title)))
    );
  }

  // Recupera un singolo gioco per id
  getGame(id: number): Observable<Game> {
    return this.http.get<Game>(`${this.apiUrl}/${id}`, {
      headers: { 'Cache-Control': 'no-cache' }
    }).pipe(
      tap(game => console.log(`Gioco ricevuto (id=${id}):`, game))
    );
  }

  // Aggiunge un nuovo gioco
  addGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.apiUrl, game).pipe(
      tap(newGame => console.log('Gioco aggiunto:', newGame))
    );
  }

  // Aggiorna un gioco esistente
  updateGame(id: number, game: Partial<Game>): Observable<Game> {
    return this.http.patch<Game>(`${this.apiUrl}/${id}`, game).pipe(
      tap(updated => console.log(`Gioco aggiornato (id=${id}):`, updated))
    );
  }

  // Elimina un gioco
  deleteGame(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Gioco eliminato (id=${id})`))
    );
  }
}
