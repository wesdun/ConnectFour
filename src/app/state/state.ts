import { Board } from "../shared/board";
export interface State {
  isBoardActive: boolean;
  playerColor: string;
  board: Board;
  getDisplay(): string;
  newGame(): void;
  takeTurn(column: number): void;
  handleWin(): void;
  endTurn(): void;
}