import "rxjs/add/operator/takeLast";

import { GameService } from "app/services/game.service";
import { Player } from "app/shared/player";

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

  it("should change turns", () => {
    let game: GameService = new GameService();
    game.startGame();
    let player1: Player = game.getCurrentPlayer();
    game.advancePlayer();
    let player2: Player = game.getCurrentPlayer();
    expect(player1).not.toBe(player2);
  });

  it("should notify other of player change", () => {
    let game: GameService = new GameService();
    game.startGame();
    game.onPlayerChange().subscribe((currentPlayer: Player) => {
      expect(currentPlayer).not.toBe(null);
    });
  });
});
