import { TestBed, inject } from "@angular/core/testing";

import { WinDetectionService } from "app/services/win-detection.service";
import { Location } from "app/shared/location";
import { Disc   } from "app/shared/disc";
import { Board } from "app/shared/board";

describe("WinDetectionService", () => {
  let board: Board;
  let winDetectionService: WinDetectionService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WinDetectionService]
    });
  });

  beforeEach(inject([WinDetectionService], (_winDetectionService: WinDetectionService) => {
    winDetectionService = _winDetectionService;
    board = new Board(_winDetectionService);
  }));

  it("should detect four discs vertically", () => {
    board.setCell(new Disc(new Location(0, 0), "yellow"));
    board.setCell(new Disc(new Location(0, 1), "yellow"));
    board.setCell(new Disc(new Location(0, 2), "yellow"));
    board.setCell(new Disc(new Location(0, 3), "yellow"));
    let lastDiscPlayed: Disc = new Disc(new Location(0, 3), "yellow");

    expect(winDetectionService.checkForWin(board.cells, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs horizontally", () => {
    board.setCell(new Disc(new Location(0, 0), "yellow"));
    board.setCell(new Disc(new Location(1, 0), "yellow"));
    board.setCell(new Disc(new Location(2, 0), "yellow"));
    board.setCell(new Disc(new Location(3, 0), "yellow"));
    let lastDiscPlayed: Disc = new Disc(new Location(3, 0), "yellow");
    expect(winDetectionService.checkForWin(board.cells, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs diagonally", () => {
    board.setCell(new Disc(new Location(0, 0), "yellow"));
    board.setCell(new Disc(new Location(1, 1), "yellow"));
    board.setCell(new Disc(new Location(2, 2), "yellow"));
    board.setCell(new Disc(new Location(3, 3), "yellow"));
    let lastDiscPlayed: Disc = new Disc(new Location(3, 3), "yellow");
    expect(winDetectionService.checkForWin(board.cells, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs diagonally upward in upper quandrant", () => {
    board.setCell(new Disc(new Location(0, 1), "yellow"));
    board.setCell(new Disc(new Location(1, 2), "yellow"));
    board.setCell(new Disc(new Location(2, 3), "yellow"));
    board.setCell(new Disc(new Location(3, 4), "yellow"));
    let lastDiscPlayed: Disc = new Disc(new Location(3, 4), "yellow");
    expect(winDetectionService.checkForWin(board.cells, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs diagonally downward", () => {
    board.setCell(new Disc(new Location(0, 3), "yellow"));
    board.setCell(new Disc(new Location(1, 2), "yellow"));
    board.setCell(new Disc(new Location(2, 1), "yellow"));
    board.setCell(new Disc(new Location(3, 0), "yellow"));
    let lastDiscPlayed: Disc = new Disc(new Location(3, 0), "yellow");
    expect(winDetectionService.checkForWin(board.cells, lastDiscPlayed)).toBeTruthy();
  });

  it("should detect four discs diagonally downward in upper quadrant", () => {
    board.setCell(new Disc(new Location(1, 5), "yellow"));
    board.setCell(new Disc(new Location(2, 4), "yellow"));
    board.setCell(new Disc(new Location(3, 3), "yellow"));
    board.setCell(new Disc(new Location(4, 2), "yellow"));
    let lastDiscPlayed: Disc = new Disc(new Location(4, 2), "yellow");
    expect(winDetectionService.checkForWin(board.cells, lastDiscPlayed)).toBeTruthy();
  });
});