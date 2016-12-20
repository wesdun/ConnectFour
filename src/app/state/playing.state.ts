import { AbstractState } from "./abstract.state";

export abstract class PlayingState extends AbstractState {
  constructor() {
    super();
    this.isBoardActive = true;
  }

  abstract endTurn(): void;
  abstract handleWin(): void;

  takeTurn(column: number): void {
    let wasDiscPlayed: boolean = this.board.playDisc(column, this.playerColor);
    if (!wasDiscPlayed) return;
    this.board.checkForWin()
      ? this.handleWin()
      : this.endTurn();
  }

  getDisplay(): string {
    return "";
  }
}