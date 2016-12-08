import * as _ from "lodash";

import { Location } from "./location";

export class Board {
  cells: string[][];

  constructor() {
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

  setCell(location: Location, color: string): void {
    this.cells[location.column][location.row] = color;
  }

  playDisc(column: number, color: string): number {
    let rowOfCellToChange: number = _.findLastIndex(this.cells[column], (cell: string) => this.cellIsEmpty(cell));
    if (!this.rowIsValid(rowOfCellToChange)) return null;
    this.setCell(new Location(column, rowOfCellToChange), color);
    return rowOfCellToChange;
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
}