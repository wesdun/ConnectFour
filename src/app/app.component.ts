import { Component } from "@angular/core";
import { BoardComponent } from "./board/board.component";
import { GameService } from "./services/game.service";

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
})

export class AppComponent {
  constructor(private gameService: GameService) {}

  startGame(): void {
    this.gameService.startGame();
  }
}
