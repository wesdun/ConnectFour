import { PlayingState } from "app/state/playing.state";
import { Board } from "app/shared/board";
import { GameService } from "app/services/game.service";
import { State } from "app/state/state";

describe("PlayingState", () => {
  let player1PlayingState: State;
  let player2PlayingState: State;
  let gameService: GameService;
  let board: Board;

  beforeEach(() => {
    gameService = new GameService();
    board = gameService.getBoard();
    player1PlayingState = gameService.getPlayer1PlayingState();
    player2PlayingState = gameService.getPlayer2PlayingState();
  });

  it("should change player at end of turn", () => {
    gameService.changeState(player1PlayingState);
    player1PlayingState.endTurn();
    expect(gameService.getState()).toEqual(player2PlayingState);
  });

  it("should not change player if can't play disc", () => {
    spyOn(board, "playDisc").and.returnValue(false);
    gameService.changeState(player1PlayingState);
    player1PlayingState.takeTurn(0);
    expect(gameService.getState()).toEqual(player1PlayingState);
  });

  it("should set state to tie if no more moves can be made", () => {
    spyOn(board, "isFull").and.returnValue(true);
    gameService.changeState(player1PlayingState);
    player1PlayingState.endTurn();
    expect(gameService.getState()).toEqual(gameService.getTieState());
  });

  it("should set state to win if win is detected", () => {
    spyOn(board, "playDisc").and.returnValue(true);
    spyOn(board, "checkForWin").and.returnValue(true);
    gameService.changeState(player1PlayingState);
    player1PlayingState.takeTurn(0);
    expect(gameService.getState()).toEqual(gameService.getPlayer1WinState());
  });
});