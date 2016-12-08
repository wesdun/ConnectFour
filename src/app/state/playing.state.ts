import { State } from "./state";
import { Board } from "../shared/board";
import { WinDetectionService } from "../services/win-detection.service";
import { Location } from "../shared/location";
import { GameService } from "../services/game.service";
import { PlayerService } from "../services/player.service";

export class PlayingState implements State {
  isBoardActive: boolean;
  private board: Board;
  private winDetectionService: WinDetectionService;
  private gameService: GameService;
  private playerService: PlayerService;

  constructor(board: Board, gameService: GameService, playerService: PlayerService) {
    this.board = board;
    this.gameService = gameService;
    this.playerService = playerService;
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
        : this.playerService.advancePlayer();
  }

  handleWin(): void {
    this.gameService.changeState(this.gameService.getWinState());
  }

  getDisplay(): string {
    return this.playerService.getCurrentPlayer().color + "'s turn";
  }
}