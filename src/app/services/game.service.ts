import { Injectable } from "@angular/core";
import { Player } from "../shared/player";

@Injectable()
export class GameService {
  private state: string;
  private players: Player[];
  private currentPlayer: Player;

  constructor() {
    this.players = [
        new Player("red"),
        new Player("black")
    ];
  }

  startGame(): void {
    this.state = "playing";
    this.currentPlayer = this.players[Math.round(Math.random())];
  }

  getState(): string {
    return this.state;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer;
  }
}