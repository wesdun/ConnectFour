import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { PlayingState } from "../state/playing.state";
import { Board } from "../shared/board";
import { State } from "../state/state";
import { TieState } from "../state/tie.state";
import { WinState } from "../state/win.state";
import { PlayerService } from "./player.service";
import {WinDetectionService} from "./win-detection.service";

@Injectable()
export class GameService {
  private stateChanged: Observable<State>;
  private state: BehaviorSubject<State>;
  private board: Board;
  private playingState: State;
  private tieState: State;
  private winState: State;


  constructor(private playerService: PlayerService) {
    this.board = new Board(new WinDetectionService);
    this.createStates();
    this.state = new BehaviorSubject<State>(this.playingState);
    this.stateChanged = this.state.asObservable();
  }

  private createStates(): void {
    this.playingState = new PlayingState(this.board, this, this.playerService);
    this.tieState = new TieState(this);
    this.winState = new WinState(this, this.playerService);
  }

  startGame(): void {
    this.board.clear();
    this.playerService.setCurrentPlayer(Math.round(Math.random()));
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

  takeTurn(column: number): void {
    this.state.getValue().takeTurn(column, this.playerService.getCurrentPlayer().color);
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