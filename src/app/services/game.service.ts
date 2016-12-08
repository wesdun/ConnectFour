import { Injectable } from "@angular/core";
import { Player } from "../shared/player";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { NullPlayer } from "../shared/null-player";
import { PlayingState } from "../state/playing.state";
import { Board } from "../shared/board";
import { State } from "../state/state";
import { TieState } from "../state/tie.state";
import { WinState } from "../state/win.state";
import { ReadyState } from "../state/ready.state";

@Injectable()
export class GameService {
  private players: Player[];
  private currentPlayerIndex: number;
  private playerChanged: Observable<Player>;
  private currentPlayer: BehaviorSubject<Player>;
  private stateChanged: Observable<State>;
  private state: BehaviorSubject<State>;
  private board: Board;
  private playingState: State;
  private tieState: State;
  private winState: State;
  private readyState: State;

  constructor() {
    this.players = [
        new Player("red"),
        new Player("black")
    ];
    this.board = new Board();
    this.createStates();
    this.currentPlayer = new BehaviorSubject<Player>(new NullPlayer());
    this.playerChanged = this.currentPlayer.asObservable();
    this.state = new BehaviorSubject<State>(this.readyState);
    this.stateChanged = this.state.asObservable();
  }

  private createStates(): void {
    this.playingState = new PlayingState(this.board, this);
    this.tieState = new TieState();
    this.winState = new WinState(this);
    this.readyState = new ReadyState();
  }

  startGame(): void {
    this.board.clear();
    this.changeState(this.playingState);
    this.currentPlayerIndex = Math.round(Math.random());
    this.currentPlayer.next(this.players[this.currentPlayerIndex]);
  }

  getState(): State {
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

  changeState(state: State): void {
    this.state.next(state);
  }

  onStateChange(): Observable<State> {
    return this.stateChanged;
  }

  takeTurn(column: number): void {
    this.state.getValue().takeTurn(column, this.currentPlayer.getValue().color);
  }

  getTieState(): State {
    return this.tieState;
  }

  getWinState(): State {
    return this.winState;
  }

  getBoard(): Board {
    return this.board;
  }

  getPlayingState(): State {
    return this.playingState;
  }
}