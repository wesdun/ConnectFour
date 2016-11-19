import {Component, HostListener, ViewChild} from "@angular/core";
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
    this.gameService.onPlayerChange().subscribe((currentPlayer: Player) => {
      if (currentPlayer) {
        this.currentPlayer = currentPlayer;
      }
    });
  }

  createBoard(): void {
    this.board = this.boardFactoryService.createBoard();
  }

  getCell(column: number, row: number): string {
    return this.board[column][row];
  }

  takeTurn(column: number): void {
    if (this.gameService.getState() !== "playing") return;
    let rowOfNewDisc: number = this.playDisc(column, this.currentPlayer.color);
    if (!this.rowIsValid(rowOfNewDisc)) {
      return;
    }
    if (this.winDetectionService.checkForWin(this.board, new Location(column, rowOfNewDisc), this.currentPlayer.color)) {
      console.log(this.currentPlayer.color + " wins");
    }
    this.gameService.advancePlayer();
  }


  playDisc(column: number, color: string): number {
    let cellToChangeRow: number = _.findLastIndex(this.board[column], (cell: string) => { return this.cellIsEmpty(cell); });
    if (this.rowIsValid(cellToChangeRow)) {
      this.board[column][cellToChangeRow] = color;
    }

    return cellToChangeRow;
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
