import "rxjs/add/operator/takeLast";

import { GameService } from "app/services/game.service";
import { PlayerService } from "app/services/player.service";
import { NullPlayer } from "app/shared/null-player";

describe("GameService", () => {
  let playerService: PlayerService;
  let gameService: GameService;

  beforeEach(() => {
    playerService = new PlayerService();
    gameService = new GameService(playerService);
  });

  it("should start game", () => {
    spyOn(playerService, "setCurrentPlayer");
    gameService.startGame();
    expect(gameService.getState()).toEqual(gameService.getPlayingState());
  });

  it("should set current player on start", () => {
    gameService.startGame();
    expect(playerService.getCurrentPlayer()).not.toEqual(new NullPlayer());
  });
});
