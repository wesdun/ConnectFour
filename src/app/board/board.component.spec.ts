import {BoardComponent} from "../board/board.component";

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
    expect(board.cellIsEmpty(board.getCell(0, 5))).toBeTruthy();
  });

  it("should play disc", () => {
    board.playDisc(0, "yellow");
    expect(board.getCell(0, 5)).toEqual("yellow");
  });

  it("should play 2nd disc in column in correct spot", () => {
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    expect(board.getCell(0, 4)).toEqual("red");
  });

  it("should return false if playing disc on full column", () => {
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    expect(board.playDisc(0, "yellow")).toEqual(-1);
  });

  it("should return false if playing disc to column that doesn't exist", () => {
    expect(board.playDisc(-1, "")).toEqual(-1);
    expect(board.playDisc(7, "")).toEqual(-1);
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

  it("should detect four discs diagonally", () => {
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

  it("should detect four discs diagonally upward in upper quandrant", () => {
    board.playDisc(0, "red");
    board.playDisc(0, "yellow");
    board.playDisc(1, "red");
    board.playDisc(1, "red");
    board.playDisc(1, "yellow");
    board.playDisc(2, "red");
    board.playDisc(2, "red");
    board.playDisc(2, "red");
    board.playDisc(2, "yellow");
    board.playDisc(3, "red");
    board.playDisc(3, "red");
    board.playDisc(3, "red");
    board.playDisc(3, "red");
    board.playDisc(3, "yellow");
    expect(board.checkForWin(3, 1, "yellow")).toBeTruthy();
  });

  it("should detect four discs diagonally downward", () => {
    board.playDisc(0, "yellow");
    board.playDisc(0, "yellow");
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    board.playDisc(1, "yellow");
    board.playDisc(1, "yellow");
    board.playDisc(1, "red");
    board.playDisc(2, "yellow");
    board.playDisc(2, "red");
    board.playDisc(3, "red");
    expect(board.checkForWin(3, 5, "red")).toBeTruthy();
  });

  it("should detect four discs diagonally downward in upper quadrant", () => {
    board.playDisc(1, "yellow");
    board.playDisc(1, "yellow");
    board.playDisc(1, "yellow");
    board.playDisc(1, "yellow");
    board.playDisc(1, "yellow");
    board.playDisc(1, "red");
    board.playDisc(2, "yellow");
    board.playDisc(2, "yellow");
    board.playDisc(2, "yellow");
    board.playDisc(2, "yellow");
    board.playDisc(2, "red");
    board.playDisc(3, "yellow");
    board.playDisc(3, "yellow");
    board.playDisc(3, "yellow");
    board.playDisc(3, "red");
    board.playDisc(4, "yellow");
    board.playDisc(4, "yellow");
    board.playDisc(4, "red");
    expect(board.checkForWin(4, 3, "red")).toBeTruthy();
  });
});