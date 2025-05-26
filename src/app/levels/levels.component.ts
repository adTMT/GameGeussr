import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LevelService } from '../level.service';
import { FooterComponent } from '../footer/footer.component';
import { Level } from '../types';


@Component({
  selector: 'app-levels',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent],
  templateUrl: './levels.component.html',
  styleUrls: ['./levels.component.css']
})
export class LevelsComponent implements OnInit {
  levels: Level[] | undefined;
  userStars = 0;
  unlockedLevels = 5;
  completedLevels: Set<number> = new Set();
  gamemode: string; // default gamemode

  constructor(private router: Router, private route: ActivatedRoute, private levelService: LevelService) {
    this.gamemode = levelService.getGamemode();
    this.levels = levelService.getLevels(this.gamemode)
  }

  ngOnInit(): void {
    // Get gamemode from route param
    this.route.paramMap.subscribe(params => {
      const mode = params.get('mode');
      if (mode) {
        this.gamemode = mode;
        this.userStars = this.levelService.getUserStars(mode);
        this.unlockedLevels = this.levelService.getUnlockedLevels(mode);
        this.completedLevels = this.levelService.getCompletedLevels(mode);
      }
    });
  }

  isLocked(level: number): boolean {
    return level > this.unlockedLevels;
  }

  handleLevelClick(level: number): void {
    if (this.isLocked(level)) {
      console.log('Level is locked, no navigation.');
      return;
    }

    this.goToLevel(level);
  }

  goToLevel(level: number): void {
    this.router.navigate(['/level', this.gamemode, level]);
  }

  markLevelCompleted(level: number): void {
    if (!this.completedLevels.has(level)) {
      this.completedLevels.add(level);
      this.saveProgress();
      console.log(`Level ${level} marked as completed in mode ${this.gamemode}.`);
    }
  }

  private saveProgress(): void {
    localStorage.setItem(`${this.gamemode}_userStars`, this.userStars.toString());
    localStorage.setItem(`${this.gamemode}_unlockedLevels`, this.unlockedLevels.toString());
    localStorage.setItem(`${this.gamemode}_completedLevels`, JSON.stringify(Array.from(this.completedLevels)));
  }

  private loadProgress(): void {
    const stars = localStorage.getItem(`${this.gamemode}_userStars`);
    const levels = localStorage.getItem(`${this.gamemode}_unlockedLevels`);
    const completed = localStorage.getItem(`${this.gamemode}_completedLevels`);

    this.userStars = stars ? +stars : 0;
    this.unlockedLevels = levels ? +levels : 5;
    const parsedCompleted = completed ? JSON.parse(completed) : [];
    this.completedLevels = new Set<number>(parsedCompleted.map((n: any) => +n));
  }
}
