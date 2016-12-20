import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { BoardComponent } from "./board/board.component";
import { AppComponent } from "./app.component";
import { GameService } from "./services/game.service";
import { WinDetectionService } from "./services/win-detection.service";
import { BoardFactoryService } from "./services/board-factory.service";
import { PlayerService } from "./services/player.service";
import { AnouncerComponent } from "./anouncer/anouncer.component";

@NgModule({
  declarations: [AppComponent, BoardComponent, AnouncerComponent],
  providers: [GameService, WinDetectionService, BoardFactoryService, PlayerService],
  bootstrap: [AppComponent],
  imports: [BrowserModule]
})

export class AppModule {}