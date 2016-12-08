import { State } from "./state";
import { PlayerService } from "../services/player.service";

export class WinState implements State {
  isBoardActive: boolean;
  private playerService: PlayerService;

  constructor(playerService: PlayerService) {
    this.playerService = playerService;
    this.isBoardActive = false;
  }

  takeTurn(column: number, color: string): void {
  }

  getDisplay(): string {
    return this.playerService.getCurrentPlayer().color + " wins";
  }
}