import { Component } from "@angular/core";
import { BoardComponent } from "./board/board.component";
import { GameService } from "./services/game.service";
import {ViewChild} from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
})

export class AppComponent {
  @ViewChild(BoardComponent) board: any;

  constructor(private gameService: GameService) {}

  startGame(): void {
    this.board.clear();
    this.gameService.startGame();
  }

  clearBoard(): void {
    this.board.clear();
  }
}
