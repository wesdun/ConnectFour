import {GameService} from "../services/game.service";
import { WinState } from "./win.state";

export class Player1WinState extends WinState {
  constructor(gameService: GameService, playerColor: string) {
    super();
    this.gameService = gameService;
    this.playerColor = playerColor;
    this.isBoardActive = false;
  }

  newGame(): void {
    this.gameService.clearBoard();
    this.gameService.changeState(this.gameService.getPlayer2PlayingState());
  }
}