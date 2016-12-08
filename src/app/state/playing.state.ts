import { State } from "./state";
import { Board } from "../shared/board";
import { WinDetectionService } from "../services/win-detection.service";
import { Location } from "../shared/location";
import { GameService } from "../services/game.service";

export class PlayingState implements State {
  isBoardActive: boolean;
  private board: Board;
  private winDetectionService: WinDetectionService;
  private gameService: GameService;

  constructor(board: Board, gameService: GameService) {
    this.board = board;
    this.gameService = gameService;
    this.winDetectionService = new WinDetectionService();
    this.isBoardActive = true;
  }

  takeTurn(column: number, color: string): void {
    let rowOfDiscPlayed: number = this.board.playDisc(column, color);
    if (rowOfDiscPlayed === null) return;
    this.winDetectionService.checkForWin(this.board.cells, new Location(column, rowOfDiscPlayed), color)
        ? this.handleWin()
        : this.endTurn();
  }

  endTurn(): void {
    this.board.isFull()
        ? this.gameService.changeState(this.gameService.getTieState())
        : this.gameService.advancePlayer();
  }

  handleWin(): void {
    this.gameService.changeState(this.gameService.getWinState());
  }

  getDisplay(): string {
    return this.gameService.getCurrentPlayer().color + "'s turn";
  }
}