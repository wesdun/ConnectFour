import { Component, HostListener } from "@angular/core";

import { GameService } from "../services/game.service";
import { Board } from "../shared/board";
import { State } from "../state/state";

@Component({
  moduleId: module.id,
  selector: "cf-board",
  templateUrl: "board.component.html",
  styleUrls: ["board.component.css"]
})

export class BoardComponent {
  board: Board;
  discInPlayVisible: boolean;
  private discInPlayLocation: any;
  private gameState: State;

  constructor(private gameService: GameService) {
  }

  @HostListener("mousemove", ["$event"])
  onMouseMove(event: any): void {
    this.discInPlayLocation = { left: event.clientX - 35, top: event.clientY - 35 };
    this.discInPlayVisible = true;
  }

  @HostListener("mouseout", ["$event"])
  onMouseOut(): void {
    this.discInPlayVisible = false;
  }

  ngOnInit(): void {
    this.setBoard();
    this.gameService.onStateChange().subscribe((gameState: State) => this.gameState = gameState);
  }

  setBoard(): void {
    this.board = this.gameService.getBoard();
  }

  playDisc(column: number): void {
    this.gameState.takeTurn(column);
  }
}
