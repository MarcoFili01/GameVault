import { Component } from '@angular/core';
import { NgFor, NgIf, AsyncPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { GameService } from '../../services/game.service';
import { Game } from '../../models/game';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [NgFor, NgIf, RouterLink, AsyncPipe],
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.css']
})
export class GameListComponent {
  games$: Observable<Game[]>;

  constructor(private gameService: GameService) {
    this.games$ = this.gameService.getGames();
  }

  trackById(_: number, game: Game) {
    return game.id ?? game.title;
  }
}
