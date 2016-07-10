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

  checkForWin(column: number, row: number): boolean {
    let yellowTestString: string = "yellowyellowyellowyellow";
    let redTestString: string = "redredredred";
    let columnString: string = this.board[column].map((cell: CellComponent) => { return cell.color; }).join("");
    let rowString: string = this.board.map((column: CellComponent[]) => { return column[row].color; }).join("");
    return columnString.includes(redTestString) || columnString.includes(yellowTestString)
        || rowString.includes(redTestString) || rowString.includes(yellowTestString);
  }
}