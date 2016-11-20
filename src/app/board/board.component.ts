import { Component, HostListener, ViewChild } from "@angular/core";
import * as _ from "lodash";

import { Location } from "../shared/location";
import { GameService } from "../services/game.service";
import { Player } from "../shared/player";
import { WinDetectionService } from "../services/win-detection.service";
import { BoardFactoryService } from "../services/board-factory.service";

@Component({
  moduleId: module.id,
  selector: "cf-board",
  templateUrl: "board.component.html",
  styleUrls: ["board.component.css"]
})

export class BoardComponent {
  @ViewChild("myBoard") boardElement: any;
  board: string[][];
  currentPlayer: Player;
  private discInPlayLocation: any;
  private discInPlayVisible: boolean;
  private gameState: string;

  constructor(private gameService: GameService,
              private winDetectionService: WinDetectionService,
              private boardFactoryService: BoardFactoryService) {
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: any): void {
    if (this.boardElement.nativeElement.contains(event.target)) {
      this.discInPlayLocation = { left: event.clientX - 35, top: event.clientY - 35 };
      this.discInPlayVisible = true;
    }
    else {
      this.discInPlayVisible = false;
    }
  }

  ngOnInit(): void {
    this.createBoard();
    this.gameService.onPlayerChange().subscribe((currentPlayer: Player) => this.currentPlayer = currentPlayer);
    this.gameService.onStateChange().subscribe((gameState: string) => this.gameState = gameState);
  }

  createBoard(): void {
    this.board = this.boardFactoryService.createBoard();
  }

  getCell(location: Location): string {
    return this.board[location.column][location.row];
  }

  playDisc(column: number, color: string): number {
    if (this.gameService.getState() !== "playing") return;

    let cellToChangeRow: number = _.findLastIndex(this.board[column], (cell: string) => this.cellIsEmpty(cell));
    if (this.rowIsValid(cellToChangeRow)) {
      this.board[column][cellToChangeRow] = color;
      this.winDetectionService.checkForWin(this.board, new Location(column, cellToChangeRow), color)
        ? this.handleWin(color)
        : this.gameService.advancePlayer();
    }
    return cellToChangeRow;
  }

  private handleWin(color: string): void {
    this.gameService.changeState("gameover");
  }

  private rowIsValid(row: number): boolean {
    return row !== -1;
  }

  cellIsEmpty(cell: string): boolean {
    return cell === "white";
  }

  clear(): void {
    for (let i: number = 0; i < 7; i++) {
      for (let j: number = 0; j < 6; j++) {
        this.board[i][j] = "white";
      }
    }
  }
}
