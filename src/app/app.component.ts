import { Component } from "@angular/core";
import {BoardComponent} from "./board/board.component";

@Component({
  moduleId: module.id,
  selector: "my-app",
  template: `<cf-board></cf-board>`,
  directives: [BoardComponent]
})

export class AppComponent {
  constructor() {}
}
