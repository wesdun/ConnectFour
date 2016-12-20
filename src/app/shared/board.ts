import * as _ from "lodash";

import { Location } from "./location";
import {WinDetectionService} from "../services/win-detection.service";
import {Disc} from "./disc";

export class Board {
  cells: string[][];
  winDetectionService: WinDetectionService;
  lastDiscPlayed: Disc;

  constructor(winDetector: WinDetectionService) {
    this.winDetectionService = winDetector;
    this.initializeBoard();
  }

  initializeBoard(): void {
    this.cells = [];
    for (let i: number = 0; i < 7; i++) {
      this.cells.push([]);
      for (let j: number = 0; j < 6; j++) {
        this.cells[i].push("white");
      }
    }
  }

  getCell(location: Location): string {
    return this.cells[location.column][location.row];
  }

  setCell(disc: Disc): void {
    this.cells[disc.location.column][disc.location.row] = disc.color;
  }

  playDisc(column: number, color: string): boolean {
    let rowOfCellToChange: number = _.findLastIndex(this.cells[column], (cell: string) => this.cellIsEmpty(cell));
    if (!this.rowIsValid(rowOfCellToChange)) return false;

    let discPlayed: Disc = new Disc(new Location(column, rowOfCellToChange), color);
    this.setCell(discPlayed);
    this.lastDiscPlayed = discPlayed;
    return true;
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

  cellIsEmpty(cell: string): boolean {
    return cell === "white";
  }

  clear(): void {
    this.cells = this.cells.map((column: string[]) => column.map((cell: string) => "white"));
  }

  private rowIsValid(row: number): boolean {
    return row !== -1;
  }

  checkForWin(): boolean {
    return this.winDetectionService.checkForWin(this.cells, this.lastDiscPlayed);
  }
}