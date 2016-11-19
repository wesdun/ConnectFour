import { TestBed, async, inject } from "@angular/core/testing";

import { BoardComponent } from "app/board/board.component";
import { BoardFactoryService } from "app/services/board-factory.service";
import { GameService } from "app/services/game.service";
import { WinDetectionService } from "app/services/win-detection.service";
import { Player } from "app/shared/player";

describe("BoardComponent", () => {
  let board: BoardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GameService, WinDetectionService, BoardFactoryService],
      declarations: [BoardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    board = TestBed.createComponent(BoardComponent).componentInstance;
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

  it("should not change player if can't play disc", inject([WinDetectionService], (winDetectionService: WinDetectionService) => {
    spyOn(GameService.prototype, "advancePlayer");
    spyOn(board, "playDisc").and.returnValue(-1);
    spyOn(winDetectionService, "checkForWin");
    board.currentPlayer = new Player("");
    board.takeTurn(0);
    expect(GameService.prototype.advancePlayer).not.toHaveBeenCalled();
  }));

  it("should clear board on new game", () => {
    board.playDisc(1, "red");
    board.clear();
    let boardIsEmpty: boolean;
    board.board.forEach((column: any) => {
      boardIsEmpty = column.every((cell: string) => cell === "white");
    });
    expect(boardIsEmpty).toEqual(true);
  });
});