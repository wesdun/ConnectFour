import { PlayerService } from "app/services/player.service";
import { Player } from "app/shared/player";
describe("PlayerService", () => {
  let playerService: PlayerService;

  beforeEach(() => {
    playerService = new PlayerService();
  });

  it("should notify other of player change", () => {
    playerService.onPlayerChange().subscribe((currentPlayer: Player) => {
      expect(currentPlayer).not.toBe(null);
    });
  });

  it("should have a list of players", () => {
    let players: Player[] = playerService.getPlayers();
    expect(players[0].color).toEqual("red");
    expect(players[1].color).toEqual("black");
  });

  it("should change turns", () => {
    playerService.setCurrentPlayer(0);
    let player1: Player = playerService.getCurrentPlayer();
    playerService.advancePlayer();
    let player2: Player = playerService.getCurrentPlayer();
    expect(player1).not.toBe(player2);
  });
});