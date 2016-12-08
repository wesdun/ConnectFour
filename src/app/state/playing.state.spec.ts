import { PlayingState } from "app/state/playing.state";
import { Board } from "app/shared/board";
import { GameService } from "app/services/game.service";
import { PlayerService } from "app/services/player.service";

describe("PlayingState", () => {
  let playingState: PlayingState;
  let gameService: GameService;
  let playerService: PlayerService;
  let board: Board;

  beforeEach(() => {
    board = new Board();
    playerService = new PlayerService();
    gameService = new GameService(playerService);
    playingState = new PlayingState(board, gameService, playerService);
    spyOn(playerService, "advancePlayer");
  });

  it("should change player at end of turn", () => {
    playingState.endTurn();
    expect(playerService.advancePlayer).toHaveBeenCalled();
  });

  it("should not change player if can't play disc", () => {
    spyOn(board, "playDisc").and.returnValue(null);
    playingState.takeTurn(0, "");
    expect(playerService.advancePlayer).not.toHaveBeenCalled();
  });

  it("should set state to tie if no more moves can be made", () => {
    spyOn(gameService, "changeState");
    spyOn(board, "isFull").and.returnValue(true);
    playingState.endTurn();
    expect(gameService.changeState).toHaveBeenCalledWith(gameService.getTieState());
  });

  it("should set state to win if win is detected", () => {
    spyOn(gameService, "changeState");
    playingState.handleWin();
    expect(gameService.changeState).toHaveBeenCalledWith(gameService.getWinState());
  });
});