import { TestBed, inject } from "@angular/core/testing";

import { BoardFactoryService } from "app/services/board-factory.service";
import { WinDetectionService } from "app/services/win-detection.service";
import { Location } from "app/shared/location";
import {Disc} from "app/shared/disc";

describe("WinDetectionService", () => {
  let board: string[][];
  let winDetectionService: WinDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinDetectionService, BoardFactoryService]
    });
  });

  beforeEach(inject([WinDetectionService, BoardFactoryService], (_winDetectionService: WinDetectionService, _boardFactoryService: BoardFactoryService) => {
    board = _boardFactoryService.createBoard();
    winDetectionService = _winDetectionService;
  }));

  it("should detect four discs vertically", () => {
    board[0][0] = "yellow";
    board[0][1] = "yellow";
    board[0][2] = "yellow";
    board[0][3] = "yellow";
    let lastDiscPlayed: Disc = new Disc(new Location(0, 3), "yellow");

    expect(winDetectionService.checkForWin(board, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs horizontally", () => {
    board[0][0] = "yellow";
    board[1][0] = "yellow";
    board[2][0] = "yellow";
    board[3][0] = "yellow";
    let lastDiscPlayed: Disc = new Disc(new Location(3, 0), "yellow");
    expect(winDetectionService.checkForWin(board, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs diagonally", () => {
    board[0][0] = "yellow";
    board[1][1] = "yellow";
    board[2][2] = "yellow";
    board[3][3] = "yellow";
    let lastDiscPlayed: Disc = new Disc(new Location(3, 3), "yellow");
    expect(winDetectionService.checkForWin(board, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs diagonally upward in upper quandrant", () => {
    board[0][1] = "yellow";
    board[1][2] = "yellow";
    board[2][3] = "yellow";
    board[3][4] = "yellow";
    let lastDiscPlayed: Disc = new Disc(new Location(3, 4), "yellow");
    expect(winDetectionService.checkForWin(board, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs diagonally downward", () => {
    board[0][3] = "yellow";
    board[1][2] = "yellow";
    board[2][1] = "yellow";
    board[3][0] = "yellow";
    let lastDiscPlayed: Disc = new Disc(new Location(3, 0), "yellow");
    expect(winDetectionService.checkForWin(board, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs diagonally downward in upper quadrant", () => {
    board[1][5] = "yellow";
    board[2][4] = "yellow";
    board[3][3] = "yellow";
    board[4][2] = "yellow";
    let lastDiscPlayed: Disc = new Disc(new Location(4, 2), "yellow");
    expect(winDetectionService.checkForWin(board, lastDiscPlayed)).toBeTruthy();
  });
});