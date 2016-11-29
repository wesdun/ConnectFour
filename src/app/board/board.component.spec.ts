import { TestBed, async, ComponentFixture } from "@angular/core/testing";

import { BoardComponent } from "app/board/board.component";
import { BoardFactoryService } from "app/services/board-factory.service";
import { GameService } from "app/services/game.service";
import { WinDetectionService } from "app/services/win-detection.service";
import { Location } from "app/shared/location";

describe("BoardComponent", () => {
  let board: BoardComponent;
  let gameService: GameService;
  let winDetectionService: WinDetectionService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GameService, WinDetectionService, BoardFactoryService],
      declarations: [BoardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    let fixture: ComponentFixture<BoardComponent> = TestBed.createComponent(BoardComponent);
    board = fixture.componentInstance;
    gameService = fixture.debugElement.injector.get(GameService);
    winDetectionService = fixture.debugElement.injector.get(WinDetectionService);
    spyOn(gameService, "getState").and.returnValue("playing");
    spyOn(gameService, "advancePlayer");
    spyOn(winDetectionService, "checkForWin");
    board.createBoard();
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

  it("should play 2nd disc in column in correct spot", () => {
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    expect(board.getCell(new Location(0, 4))).toEqual("red");
  });

  it("should return -1 if playing disc on full column", () => {
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    board.playDisc(0, "yellow");
    board.playDisc(0, "red");
    expect(board.playDisc(0, "yellow")).toEqual(-1);
  });

  it("should return -1 if playing disc to column that doesn't exist", () => {
    expect(board.playDisc(-1, "")).toEqual(-1);
    expect(board.playDisc(7, "")).toEqual(-1);
  });

  it("should change player at end of turn", () => {
    board.endTurn();
    expect(gameService.advancePlayer).toHaveBeenCalled();
  });

  it("should not change player if can't play disc", () => {
    spyOn(board, "rowIsValid").and.returnValue(false);
    board.playDisc(0, "");
    expect(gameService.advancePlayer).not.toHaveBeenCalled();
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

  it("should set state to tie if no more moves can be made", () => {
    spyOn(gameService, "changeState");
    spyOn(board, "isFull").and.returnValue(true);
    board.endTurn();
    expect(gameService.changeState).toHaveBeenCalledWith("tie");
  });

  it("should set state to win if win is detected", () => {
    spyOn(gameService, "changeState");
    board.handleWin();
    expect(gameService.changeState).toHaveBeenCalledWith("win");
  });

  it("should hide disc in play on mouse out", () => {
    board.discInPlayVisible = true;
    board.onMouseOut();
    expect(board.discInPlayVisible).toEqual(false);
  });

  it("should show disc in play on mouse move inside board", () => {
    let event: any = { left: 0, top: 0 };
    board.discInPlayVisible = false;
    board.onMouseMove(event);
    expect(board.discInPlayVisible).toEqual(true);
  });
});