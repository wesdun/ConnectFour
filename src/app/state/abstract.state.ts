import {State} from "./state";
import {GameService} from "../services/game.service";

export abstract class AbstractState implements State {
  isBoardActive: boolean;
  protected gameService: GameService;

  abstract getDisplay(): string;

  newGame(): void {
    this.gameService.changeState(this.gameService.getPlayingState());
    this.gameService.startGame();
  }

  takeTurn(column: number, color: string): void {}
}