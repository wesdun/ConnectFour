import { Component } from "@angular/core";
import { BoardComponent } from "./board/board.component";
import { GameService } from "./services/game.service";
import {ViewChild} from "@angular/core";
import { Player } from "./shared/player";

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
  styleUrls: ["app.component.css"]
})

export class AppComponent {
  @ViewChild(BoardComponent) board: any;
  private gameState: string;
  private currentPlayer: Player;

  constructor(private gameService: GameService) {}

  ngOnInit(): void {
    this.gameService.onStateChange().subscribe((gameState: string) => this.gameState = gameState);
    this.gameService.onPlayerChange().subscribe((currentPlayer: Player) => this.currentPlayer = currentPlayer);
  }

  startGame(): void {
    this.board.clear();
    this.gameService.startGame();
  }
}
