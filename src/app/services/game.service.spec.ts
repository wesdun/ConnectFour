import { GameService } from "app/services/game.service";
import { Player } from "../shared/player";

describe("GameService", () => {
  it("should start game", () => {
    let game: GameService = new GameService();
    game.startGame();
    expect(game.getState()).toEqual("playing");
  });

  it("should have a list of players", () => {
    let game: GameService = new GameService();
    let players: Player[] = game.getPlayers();
    expect(players[0].color).toEqual("red");
    expect(players[1].color).toEqual("black");
  });

  it("should set current player on start", () => {
    let game: GameService = new GameService();
    game.startGame();
    expect(game.getCurrentPlayer()).toBeDefined();
  });
});
