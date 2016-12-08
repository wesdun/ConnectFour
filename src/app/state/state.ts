export interface State {
  isBoardActive: boolean;
  takeTurn(column: number, color: string): void;
  getDisplay(): string;
}