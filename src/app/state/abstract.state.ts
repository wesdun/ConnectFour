import {State} from "./state";
import {GameService} from "../services/game.service";
import { Board } from "../shared/board";

export abstract class AbstractState implements State {
  isBoardActive: boolean;
  playerColor: string;
  board: Board;
  gameService: GameService;

  abstract getDisplay(): string;

  newGame(): void {
    this.board.clear();
    this.gameService.changeState(this.gameService.getRandomPlayingState());
  }

  takeTurn(column: number): void {}

  endTurn(): void {}

  handleWin(): void {}
}