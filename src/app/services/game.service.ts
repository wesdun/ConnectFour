import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Board } from "../shared/board";
import { State } from "../state/state";
import { TieState } from "../state/tie.state";
import {WinDetectionService} from "./win-detection.service";
import { Player1PlayingState } from "../state/player1Playing.state";
import { Player2PlayingState } from "../state/player2Playing.state";
import { Player1WinState } from "../state/player1Win.state";
import { Player2WinState } from "../state/player2Win.state";

@Injectable()
export class GameService {
  private stateChanged: Observable<State>;
  private state: BehaviorSubject<State>;
  private board: Board;
  private tieState: State;
  private player1PlayingState: State;
  private player2PlayingState: State;
  private player1WinState: State;
  private player2WinState: State;


  constructor() {
    this.board = new Board(new WinDetectionService);
    this.createStates();
    this.state = new BehaviorSubject<State>(this.getRandomPlayingState());
    this.stateChanged = this.state.asObservable();
  }

  private createStates(): void {
    let player1Color: string = "red";
    let player2Color: string = "black";
    this.player1PlayingState = new Player1PlayingState(this.board, this, player1Color);
    this.player2PlayingState = new Player2PlayingState(this.board, this, player2Color);
    this.tieState = new TieState(this);
    this.player1WinState = new Player1WinState(this, player1Color);
    this.player2WinState = new Player2WinState(this, player2Color);
  }

  getState(): State {
    return this.state.getValue();
  }

  changeState(state: State): void {
    this.state.next(state);
  }

  onStateChange(): Observable<State> {
    return this.stateChanged;
  }

  getTieState(): State {
    return this.tieState;
  }

  getBoard(): Board {
    return this.board;
  }

  getPlayer2PlayingState(): State {
    return this.player2PlayingState;
  }

  getPlayer1PlayingState(): State {
    return this.player1PlayingState;
  }

  getPlayer1WinState(): State {
    return this.player1WinState;
  }

  getPlayer2WinState(): State {
    return this.player2WinState;
  }

  getRandomPlayingState(): State {
    let randomPlayer: number = Math.round(Math.random());
    return !!randomPlayer
      ? this.player1PlayingState
      : this.player2PlayingState;
  }

  clearBoard(): void {
    this.board.clear();
  }
}