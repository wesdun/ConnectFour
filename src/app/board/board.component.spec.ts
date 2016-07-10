import {BoardComponent} from "../board/board.component";
import {CellComponent} from "../cell/cell.component";

describe("BoardComponent", () => {
  let board: BoardComponent;
  beforeEach(() => {
    board = new BoardComponent();
    board.createBoard();
  });

  it("should initialize with empty board", () => {
    expect(board.board.length).toEqual(7);
    expect(board.board[0].length).toEqual(6);
  });

  it("should get cell for given row and column", () => {
    expect(board.getCell(0, 5) instanceof CellComponent).toBeTruthy();
  });

  it("should play disc", () => {
    board.playDisc(0, "yellow");
    expect(board.getCell(0, 5).color).toEqual("yellow");
  });

  it("should play 2nd disc in column in correct spot", () => {
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    expect(board.getCell(0, 4).color).toEqual("red");
  });

  it("should return false if playing disc on full column", () => {
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    expect(board.playDisc(0, "yellow")).toBeFalsy();
  });

  it("should return false if playing disc to column that doesn't exist", () => {
    expect(board.playDisc(-1, "")).toBeFalsy();
    expect(board.playDisc(7, "")).toBeFalsy();
  });

  it("should detect four discs vertically", () => {
    let column: number = 0;
    let row: number = 2;
    board.playDisc(column, "yellow");
    board.playDisc(column, "yellow");
    board.playDisc(column, "yellow");
    board.playDisc(column, "yellow");
    expect(board.checkForWin(column, row, "yellow")).toBeTruthy();
  });

  it("should detect four discs horizontally", () => {
    board.playDisc(0, "yellow");
    board.playDisc(1, "yellow");
    board.playDisc(2, "yellow");
    board.playDisc(3, "yellow");
    expect(board.checkForWin(3, 5, "yellow")).toBeTruthy();
  });

  xit("should detect four discs diagonally", () => {
    board.playDisc(0, "yellow");
    board.playDisc(1, "red");
    board.playDisc(1, "yellow");
    board.playDisc(2, "red");
    board.playDisc(2, "red");
    board.playDisc(2, "yellow");
    board.playDisc(3, "red");
    board.playDisc(3, "red");
    board.playDisc(3, "red");
    board.playDisc(3, "yellow");
    expect(board.checkForWin(3, 2, "yellow")).toBeTruthy();
  });
});