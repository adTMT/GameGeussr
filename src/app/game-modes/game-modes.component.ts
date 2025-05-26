import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LevelService } from '../level.service';

@Component({
  selector: 'app-game-modes',
  standalone: true,
  imports: [],
  templateUrl: './game-modes.component.html',
  styleUrl: './game-modes.component.css'
})
export class GameModesComponent {
  gamemode: string;
  constructor(private router: Router, private svc: LevelService) {
    this.gamemode = svc.getGamemode();
  }

  selectMode(mode: string): void {
    // Navigate to a route based on the selected game mode
    this.svc.updateGamemode(mode);
    this.router.navigate(['/levels',mode]);
  }
}
