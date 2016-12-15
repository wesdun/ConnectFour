export interface State {
  isBoardActive: boolean;
  getDisplay(): string;
  newGame(): void;
  takeTurn(column: number, color: string): void;
}