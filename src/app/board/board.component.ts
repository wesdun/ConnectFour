import { Component } from "@angular/core";
import {CellComponent} from "../cell/cell.component";
import * as _ from "lodash";

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
        this.board[i].push("");
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
    let cellToChangeIndex: number = _.findLastIndex(this.board[column], (cell: string) => { return cell === ""; });
    if (cellToChangeIndex === -1) {
      return -1;
    }
    this.board[column][cellToChangeIndex] = color;

    return cellToChangeIndex;
  }

  takeTurn(column: number, color: string): void {
    let row: number = this.playDisc(column, color);
    if (this.checkForWin(column, row, color)) {
      console.log(color + " wins");
    }
  }

  checkForWin(column: number, row: number, color: string): boolean {
    let testString: string = color + color + color + color;
    let stringsToTest: string[] = [];
    stringsToTest.push(this.board[column].map((cell: string) => { return cell; }).join(""));
    stringsToTest.push(this.board.map((column: string[]) => { return column[row]; }).join(""));
    stringsToTest.push(this.createDiagDownString(column, row));
    stringsToTest.push(this.createDiagUpString(column, row));

    return stringsToTest.reduce((result: boolean, stringToTest: string) => {
      return result || stringToTest.includes(testString);
    }, false);
  }

  private createDiagDownString(column: number, row: number): string {
    let diagUpString: string = "";
    let diagRow: number = Math.min(5, column + row);
    let diagCol: number = column + row - diagRow;

    while (diagCol < this.board.length && diagRow >= 0) {
      diagUpString += this.board[diagCol][diagRow];
      diagCol++;
      diagRow--;
    }
    return diagUpString;
  }

  private createDiagUpString(column: number, row: number): string {
    let diagDownString: string = "";
    let diagRow: number = Math.max(0, row - column);
    let diagCol: number = Math.max(0, column - row);

    while (diagCol < this.board.length && diagRow < this.board[diagCol].length) {
      diagDownString += this.board[diagCol][diagRow];
      diagCol++;
      diagRow++;
    }

    return diagDownString;
  }
}