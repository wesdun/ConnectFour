import { Component } from "@angular/core";

import { GameService } from "./services/game.service";
import { State } from "./state/state";

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})

export class AppComponent {
  private gameState: State;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.onStateChange().subscribe((gameState: State) => this.gameState = gameState);
  }

  startGame(): void {
    this.gameService.startGame();
  }
}
