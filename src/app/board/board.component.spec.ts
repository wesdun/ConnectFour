import { TestBed, async, ComponentFixture } from "@angular/core/testing";

import { BoardComponent } from "app/board/board.component";
import { GameService } from "app/services/game.service";

describe("BoardComponent", () => {
  let board: BoardComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [GameService],
      declarations: [BoardComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    let fixture: ComponentFixture<BoardComponent> = TestBed.createComponent(BoardComponent);
    board = fixture.componentInstance;
    board.setBoard();
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