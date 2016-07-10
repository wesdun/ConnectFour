import { Component } from "@angular/core";
import {CellComponent} from "../cell/cell.component";
import * as _ from "lodash";

@Component({
  moduleId: module.id,
  selector: "cf-board",
  templateUrl: "board.component.html",
})

export class BoardComponent {
  board: CellComponent[][];

  constructor() {
  }

  createBoard(): void {
    this.board = [];
    for (let i: number = 0; i < 7; i++) {
      this.board.push([]);
      for (let j: number = 0; j < 6; j++) {
        this.board[i].push(new CellComponent());
      }
    }
  }

  ngOnInit(): void {
    this.createBoard();
  }

  getCell(column: number, row: number): CellComponent {
    return this.board[column][row];
  }

  playDisc(column: number, color: string): boolean {
    let cellToChangeIndex: number = _.findLastIndex(this.board[column], (cell: CellComponent) => { return cell.isEmpty(); });
    if (cellToChangeIndex === -1) {
      return false;
    }
    this.board[column][cellToChangeIndex].color = color;
    return true;
  }

  checkForWin(column: number, row: number, color: string): boolean {
    let testString: string = color + color + color + color;
    let stringsToTest: string[] = [];
    stringsToTest.push(this.board[column].map((cell: CellComponent) => { return cell.color; }).join(""));
    stringsToTest.push(this.board.map((column: CellComponent[]) => { return column[row].color; }).join(""));
    let diagCol: number;
    let diagRow: number;
    let diagUpString: string = "";
    let diagDownString: string = "";

    diagRow = Math.min(5, column + row);
    diagCol = column + row - diagRow;

    while (diagCol < this.board.length && diagRow >= 0) {
      diagUpString += this.board[diagCol][diagRow].color;
      diagCol++;
      diagRow--;
    }
    stringsToTest.push(diagUpString);

    diagRow = Math.max(0, row - column);
    diagCol = Math.max(0, column - row);

    while (diagCol < this.board.length && diagRow < this.board[diagCol].length) {
      diagDownString += this.board[diagCol][diagRow].color;
      diagCol++;
      diagRow++;
    }

    stringsToTest.push(diagDownString);

    return stringsToTest.reduce((result: boolean, stringToTest: string) => {
      return result || stringToTest.includes(testString);
    }, false);
  }
}