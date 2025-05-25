import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-game-modes',
  standalone: true,
  imports: [],
  templateUrl: './game-modes.component.html',
  styleUrl: './game-modes.component.css'
})
export class GameModesComponent {
  constructor(private router: Router) {}

  selectMode(mode: string): void {
    // Navigate to a route based on the selected game mode
    this.router.navigate(['/levels',mode]);
  }
}
