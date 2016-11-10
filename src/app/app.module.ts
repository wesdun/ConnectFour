import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { BoardComponent } from "./board/board.component";
import { AppComponent } from "./app.component";
import { GameService } from "./services/game.service";

@NgModule({
  declarations: [AppComponent, BoardComponent],
  providers: [GameService],
  bootstrap: [AppComponent],
  imports: [BrowserModule]
})

export class AppModule {}