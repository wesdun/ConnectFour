import { PlayerService } from "../services/player.service";
import {GameService} from "../services/game.service";
import {AbstractState} from "./abstract.state";

export class WinState extends AbstractState {
  isBoardActive: boolean;
  private playerService: PlayerService;

  constructor(gameService: GameService, playerService: PlayerService) {
    super();
    this.gameService = gameService;
    this.playerService = playerService;
    this.isBoardActive = false;
  }

  getDisplay(): string {
    return this.playerService.getCurrentPlayer().color + " wins";
  }
}