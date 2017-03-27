import { PlayingState } from "./playing.state";
import { Board } from "../shared/board";
import { GameService } from "../services/game.service";
import { State } from "./state";

export class Player1PlayingState extends PlayingState {
  constructor(board: Board, gameService: GameService, playerColor: string) {
    super();
    this.board = board;
    this.gameService = gameService;
    this.playerColor = playerColor;
  }

  endTurn(): void {
    this.board.isFull()
      ? this.gameService.changeState(this.gameService.getTieState())
      : this.gameService.changeState(this.otherState());
  }

  private otherState(): State {
    return this.gameService.getPlayer2PlayingState();
  }

  handleWin(): void {
    this.gameService.changeState(this.gameService.getPlayer1WinState());
  }
}