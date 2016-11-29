import { Component, HostListener } from "@angular/core";
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
  cells: string[][];
  currentPlayer: Player;
  private discInPlayLocation: any;
  discInPlayVisible: boolean;
  private gameState: string;

  constructor(private gameService: GameService,
              private winDetectionService: WinDetectionService,
              private boardFactoryService: BoardFactoryService) {
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
    this.cells = this.boardFactoryService.createBoard();
  }

  getCell(location: Location): string {
    return this.cells[location.column][location.row];
  }

  playDisc(column: number, color: string): number {
    if (this.gameService.getState() !== "playing") return;

    let cellToChangeRow: number = _.findLastIndex(this.cells[column], (cell: string) => this.cellIsEmpty(cell));
    if (this.rowIsValid(cellToChangeRow)) {
      this.cells[column][cellToChangeRow] = color;
      this.winDetectionService.checkForWin(this.cells, new Location(column, cellToChangeRow), color)
        ? this.handleWin()
        : this.endTurn();
    }
    return cellToChangeRow;
  }

  endTurn(): void {
    this.isFull()
      ? this.gameService.changeState("tie")
      : this.gameService.advancePlayer();
  }

  isFull(): boolean {
    return this.cells.map((column: string[]) => {
      return column.every((cell: string) => !this.cellIsEmpty(cell));
    }).every((columnIsFull: boolean) => columnIsFull);
  }

  isEmpty(): boolean {
    return this.cells.map((column: string[]) => {
      return column.every((cell: string) => this.cellIsEmpty(cell));
    }).every((columnIsEmpty: boolean) => columnIsEmpty);
  }

  handleWin(): void {
    this.gameService.changeState("win");
  }

  private rowIsValid(row: number): boolean {
    return row !== -1;
  }

  cellIsEmpty(cell: string): boolean {
    return cell === "white";
  }

  clear(): void {
    this.cells = this.cells.map((column: string[]) => column.map((cell: string) => "white"));
  }
}
