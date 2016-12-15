import { Board } from "../shared/board";
import { WinDetectionService } from "../services/win-detection.service";
import { GameService } from "../services/game.service";
import { PlayerService } from "../services/player.service";
import { AbstractState } from "./abstract.state";

export class PlayingState extends AbstractState {
  private board: Board;
  private winDetectionService: WinDetectionService;
  private playerService: PlayerService;

  constructor(board: Board, gameService: GameService, playerService: PlayerService) {
    super();
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
    return "";
  }
}