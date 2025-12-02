import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgIf, NgFor, AsyncPipe } from '@angular/common';
import { Observable, switchMap, catchError, of, tap } from 'rxjs';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';

@Component({
  selector: 'app-game-detail',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink, AsyncPipe],
  templateUrl: './game-detail.component.html',
  styleUrls: ['./game-detail.component.css']
})
export class GameDetailComponent {
  game$: Observable<Game | null>;
  error = '';

  constructor(private route: ActivatedRoute, private gameService: GameService) {
    this.game$ = this.route.paramMap.pipe(
      switchMap(params => {
        const id = Number(params.get('id'));
        if (!id || isNaN(id)) {
          this.error = 'ID non valido';
          return of(null);
        }
        return this.gameService.getGame(id).pipe(
          tap(g => console.log('Gioco ricevuto dal servizio:', g)),
          catchError(err => {
            console.error('Errore API:', err);
            this.error = 'Errore nel recupero del gioco';
            return of(null);
          })
        );
      })
    );
  }
}
