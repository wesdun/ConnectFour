import { Board } from "app/shared/board";
import { Location } from "app/shared/location";

describe("Board", () => {
  let board: Board;

  beforeEach(() => {
    board = new Board();
  });

  it("should initialize with empty cells", () => {
    expect(board.cells.length).toEqual(7);
    expect(board.cells[0].length).toEqual(6);
  });

  it("should get cell for given row and column", () => {
    expect(board.cellIsEmpty(board.getCell(new Location(0, 5)))).toBeTruthy();
  });

  it("should play disc", () => {
    board.playDisc(0, "yellow");
    expect(board.getCell(new Location(0, 5))).toEqual("yellow");
  });
  it("should clear cells on new game", () => {
    board.playDisc(1, "red");
    board.clear();
    expect(board.isEmpty()).toEqual(true);
  });

  it("should return true if board is full", () => {
    board.cells = board.cells.map((column: string[]) => column.map((cell: string) => "occupied"));
    expect(board.isFull()).toEqual(true);
  });

  it("should return null if playing disc on full column", () => {
    board.setCell(new Location(0, 0), "yellow");
    board.setCell(new Location(0, 1), "red");
    board.setCell(new Location(0, 2), "yellow");
    board.setCell(new Location(0, 3), "red");
    board.setCell(new Location(0, 4), "yellow");
    board.setCell(new Location(0, 5), "red");
    expect(board.playDisc(0, "")).toEqual(null);
  });
});