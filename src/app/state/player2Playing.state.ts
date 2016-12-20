import { PlayingState } from "./playing.state";
import { Board } from "../shared/board";
import { GameService } from "../services/game.service";

export class Player2PlayingState extends PlayingState {
  constructor(board: Board, gameService: GameService, playerColor: string) {
    super();
    this.board = board;
    this.gameService = gameService;
    this.playerColor = playerColor;
  }

  endTurn(): void {
    this.board.isFull()
      ? this.gameService.changeState(this.gameService.getTieState())
      : this.gameService.changeState(this.gameService.getPlayer1PlayingState());
  }

  handleWin(): void {
    this.gameService.changeState(this.gameService.getPlayer2WinState());
  }
}