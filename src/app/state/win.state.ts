import { State } from "./state";
import { GameService } from "../services/game.service";

export class WinState implements State {
  isBoardActive: boolean;
  private gameService: GameService;

  constructor(gameService: GameService) {
    this.isBoardActive = false;
    this.gameService = gameService;
  }

  takeTurn(column: number, color: string): void {
  }

  getDisplay(): string {
    return this.gameService.getCurrentPlayer().color + " wins";
  }
}