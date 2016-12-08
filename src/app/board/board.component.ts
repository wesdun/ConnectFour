import { Component, HostListener } from "@angular/core";

import { Location } from "../shared/location";
import { GameService } from "../services/game.service";
import { Player } from "../shared/player";
import { WinDetectionService } from "../services/win-detection.service";
import { BoardFactoryService } from "../services/board-factory.service";
import { Board } from "../shared/board";
import { State } from "../state/state";

@Component({
  moduleId: module.id,
  selector: "cf-board",
  templateUrl: "board.component.html",
  styleUrls: ["board.component.css"]
})

export class BoardComponent {
  board: Board;
  currentPlayer: Player;
  private discInPlayLocation: any;
  discInPlayVisible: boolean;
  private gameState: string;

  constructor(private gameService: GameService,
              private winDetectionService: WinDetectionService) {
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: any): void {
    this.discInPlayLocation = { left: event.clientX - 35, top: event.clientY - 35 };
    this.discInPlayVisible = true;
  }

  @HostListener("mouseout", ["$event"])
  onMouseOut(): void {
    this.discInPlayVisible = false;
  }

  ngOnInit(): void {
    this.createBoard();
    this.gameService.onPlayerChange().subscribe((currentPlayer: Player) => this.currentPlayer = currentPlayer);
    this.gameService.onStateChange().subscribe((gameState: string) => this.gameState = gameState);
  }

  createBoard(): void {
    this.board = new Board();
  }

  playDisc(column: number, color: string): void {
    let rowOfDiscPlayed: number = this.board.playDisc(column, color);
    if (rowOfDiscPlayed === null) return;
    this.winDetectionService.checkForWin(this.board.cells, new Location(column, rowOfDiscPlayed), color)
      ? this.handleWin()
      : this.endTurn();
  }

  endTurn(): void {
    this.board.isFull()
      ? this.gameService.changeState("tie")
      : this.gameService.advancePlayer();
  }

  handleWin(): void {
    this.gameService.changeState("win");
  }


}
