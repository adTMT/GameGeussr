import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SettingsComponent } from './settings/settings.component';
import { LevelsComponent } from './levels/levels.component';
import { InfoComponent } from './info/info.component';
import { GameComponent } from './game/game.component';

export const routes: Routes = [ { path: "home", component: HomeComponent },
    { path: "settings", component: SettingsComponent},
    { path: "levels", component: LevelsComponent},
    { path: "info", component: InfoComponent},
    { path: "level", component: GameComponent},
    { path: "", redirectTo: "home", pathMatch: "full" }];
