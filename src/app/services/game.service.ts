import { Injectable } from "@angular/core";
import { Player } from "../shared/player";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class GameService {
  private players: Player[];
  private currentPlayerIndex: number;
  private playerChanged: Observable<Player>;
  private currentPlayer: BehaviorSubject<Player>;
  private stateChanged: Observable<string>;
  private state: BehaviorSubject<string>;

  constructor() {
    this.players = [
        new Player("red"),
        new Player("black")
    ];
    this.currentPlayer = new BehaviorSubject<Player>(null);
    this.playerChanged = this.currentPlayer.asObservable();
    this.state = new BehaviorSubject<string>("init");
    this.stateChanged = this.state.asObservable();
  }

  startGame(): void {
    this.changeState("playing");
    this.currentPlayerIndex = Math.round(Math.random());
    this.currentPlayer.next(this.players[this.currentPlayerIndex]);
  }

  getState(): string {
    return this.state.getValue();
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getCurrentPlayer(): Player {
    return this.players[this.currentPlayerIndex];
  }

  advancePlayer(): void {
    this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
    this.currentPlayer.next(this.players[this.currentPlayerIndex]);
  }

  onPlayerChange(): Observable<Player> {
    return this.playerChanged;
  }

  changeState(state: string): void {
    this.state.next(state);
  }

  onStateChange(): Observable<String> {
    return this.stateChanged;
  }
}