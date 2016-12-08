import { Injectable } from "@angular/core";
import { Player } from "../shared/player";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { NullPlayer } from "../shared/null-player";

@Injectable()
export class PlayerService {
  private playerChanged: Observable<Player>;
  private currentPlayer: BehaviorSubject<Player>;
  private players: Player[];
  private currentPlayerIndex: number;

  constructor() {
    this.players = [
      new Player("red"),
      new Player("black")
    ];
    this.currentPlayer = new BehaviorSubject<Player>(new NullPlayer());
    this.playerChanged = this.currentPlayer.asObservable();
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getCurrentPlayer(): Player {
    return this.currentPlayer.getValue();
  }

  setCurrentPlayer(playerIndex: number): void {
    this.currentPlayerIndex = playerIndex;
    this.currentPlayer.next(this.players[playerIndex]);
  }

  advancePlayer(): void {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    this.currentPlayer.next(this.players[this.currentPlayerIndex]);
  }

  onPlayerChange(): Observable<Player> {
    return this.playerChanged;
  }
}