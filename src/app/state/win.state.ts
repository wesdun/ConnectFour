import { AbstractState } from "./abstract.state";

export class WinState extends AbstractState {
  getDisplay(): string {
    return this.playerColor + " wins";
  }
}