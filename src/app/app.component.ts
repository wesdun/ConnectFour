import { Component } from "@angular/core";

import { GameService } from "./services/game.service";
import { State } from "./state/state";
import { PlayerService } from "./services/player.service";
import { Player } from "./shared/player";

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})

export class AppComponent {
  private gameState: State;
  private currentPlayer: Player;

  constructor(private gameService: GameService,
              private playerService: PlayerService) {}

  ngOnInit(): void {
    this.gameService.onStateChange().subscribe((gameState: State) => this.gameState = gameState);
    this.playerService.onPlayerChange().subscribe((currentPlayer: Player) => this.currentPlayer = currentPlayer);
    this.startGame();
  }

  startGame(): void {
    this.gameService.startGame();
  }
}
