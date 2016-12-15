import {GameService} from "../services/game.service";
import {AbstractState} from "./abstract.state";

export class TieState extends AbstractState {
  constructor(gameService: GameService) {
    super();
    this.gameService = gameService;
    this.isBoardActive = false;
  }

  getDisplay(): string {
    return "Nobody Wins";
  }
}