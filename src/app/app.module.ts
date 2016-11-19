import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { BoardComponent } from "./board/board.component";
import { AppComponent } from "./app.component";
import { GameService } from "./services/game.service";
import { WinDetectionService } from "./services/win-detection.service";
import { BoardFactoryService } from "./services/board-factory.service";

@NgModule({
  declarations: [AppComponent, BoardComponent],
  providers: [GameService, WinDetectionService, BoardFactoryService],
  bootstrap: [AppComponent],
  imports: [BrowserModule]
})

export class AppModule {}