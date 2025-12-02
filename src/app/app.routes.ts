import { Routes } from '@angular/router';
import { GameListComponent } from './components/game-list/game-list.component';
import { SaveFormComponent } from './components/save-form/save-form.component';
import { GameDetailComponent } from './components/game-detail/game-detail.component';

export const routes: Routes = [
  { path: '', component: GameListComponent },
  { path: 'add', component: SaveFormComponent },
  { path: 'detail/:id', component: GameDetailComponent },
  { path: '**', redirectTo: '' }
];
