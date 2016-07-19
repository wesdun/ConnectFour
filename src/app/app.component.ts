import { Component } from "@angular/core";
import { BoardComponent } from "./board/board.component";

@Component({
  moduleId: module.id,
  selector: "my-app",
  templateUrl: "app.component.html",
  directives: [BoardComponent]
})

export class AppComponent {
  constructor() {}
}
