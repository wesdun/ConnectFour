import { Component } from "@angular/core";
import * as _ from "lodash";

import { CellComponent } from "../cell/cell.component";
import { Location } from "../shared/location";

@Component({
  moduleId: module.id,
  selector: "cf-board",
  templateUrl: "board.component.html",
  styleUrls: ["board.component.css"],
  directives: [CellComponent]
})

export class BoardComponent {
  board: string[][];

  constructor() {
  }

  createBoard(): void {
    this.board = [];
    for (let i: number = 0; i < 7; i++) {
      this.board.push([]);
      for (let j: number = 0; j < 6; j++) {
        this.board[i].push("white");
      }
    }
  }

  ngOnInit(): void {
    this.createBoard();
  }

  getCell(column: number, row: number): string {
    return this.board[column][row];
  }

  playDisc(column: number, color: string): number {
    let cellToChangeIndex: number = _.findLastIndex(this.board[column], (cell: string) => { return this.cellIsEmpty(cell); });
    if (cellToChangeIndex !== -1) {
      this.board[column][cellToChangeIndex] = color;
    }

    return cellToChangeIndex;
  }

  cellIsEmpty(cell: string): boolean {
    return cell === "white";
  }

  takeTurn(column: number, color: string): void {
    let row: number = this.playDisc(column, color);
    if (this.checkForWin(column, row, color)) {
      console.log(color + " wins");
    }
  }

  checkForWin(column: number, row: number, color: string): boolean {
    let testString: string = color + color + color + color;
    let directionsToTest: string[] = [];
    directionsToTest.push(this.createVerticalTest(column));
    directionsToTest.push(this.createHorizontalTest(row));
    directionsToTest.push(this.createDiagonalUpTest(column, row));
    directionsToTest.push(this.createDiagonalDownTest(column, row));

    return directionsToTest.reduce((result: boolean, stringToTest: string) => {
      return result || stringToTest.includes(testString);
    }, false);
  }

  private createHorizontalTest(row: number): string {
    return this.board.map((column: string[]) => {
      return column[row];
    }).join("");
  }

  private createVerticalTest(column: number): string {
    return this.board[column].map((cell: string) => {
      return cell;
    }).join("");
  }

  private createDiagonalUpTest(column: number, row: number): string {
    let diagonalUpString: string = "";
    let location: Location = this.calculateDiagonalUpTestStartLocation(column, row);

    while (location.column < this.board.length && location.row >= 0) {
      diagonalUpString += this.board[location.column][location.row];
      location.column++;
      location.row--;
    }
    return diagonalUpString;
  }

  private createDiagonalDownTest(column: number, row: number): string {
    let diagonalDownString: string = "";
    let location: Location = this.calculateDiagonalDownTestStartLocation(row, column);

    while (location.column < this.board.length && location.row < this.board[location.column].length) {
      diagonalDownString += this.board[location.column][location.row];
      location.column++;
      location.row++;
    }

    return diagonalDownString;
  }

  private calculateDiagonalUpTestStartLocation(column: number, row: number): Location {
    let diagonalRow: number = Math.min(this.board[column].length, column + row);
    let diagonalColumn: number = column + row - diagonalRow;

    return new Location(diagonalColumn, diagonalRow);
  }

  private calculateDiagonalDownTestStartLocation(row: number, column: number): Location {
    return new Location(Math.max(0, column - row), Math.max(0, row - column));
  }
}
