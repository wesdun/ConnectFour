import { State } from "./state";

export class TieState implements State {
  isBoardActive: boolean;

  constructor() {
    this.isBoardActive = false;
  }

  takeTurn(column: number, color: string): void {
  }

  getDisplay(): string {
    return "Nobody Wins";
  }
}