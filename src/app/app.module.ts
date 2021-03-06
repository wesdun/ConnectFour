import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { BoardComponent } from "./board/board.component";
import { AppComponent } from "./app.component";
import { GameService } from "./services/game.service";
import { WinDetectionService } from "./services/win-detection.service";
import { AnouncerComponent } from "./anouncer/anouncer.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
  declarations: [AppComponent, BoardComponent, AnouncerComponent],
  providers: [GameService, WinDetectionService],
  bootstrap: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule]
})

export class AppModule {}