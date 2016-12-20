import {GameService} from "../services/game.service";
import {AbstractState} from "./abstract.state";

export class Player1WinState extends AbstractState {
  constructor(gameService: GameService, playerColor: string) {
    super();
    this.gameService = gameService;
    this.playerColor = playerColor;
    this.isBoardActive = false;
  }

  getDisplay(): string {
    return this.playerColor + " wins";
  }

  newGame(): void {
    this.gameService.clearBoard();
    this.gameService.changeState(this.gameService.getPlayer2PlayingState());
  }
}