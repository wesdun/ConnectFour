import { Component, style, state, Input, trigger, animate, transition } from "@angular/core";
import { State } from "../state/state";
@Component({
  moduleId: module.id,
  selector: "anouncer",
  animations: [
    trigger("gameOver", [
      state("false", style({ opacity: 1, transform: "scale(1.0)"})),
      state("true", style({opacity: 0, transform: "scale(0)"})),
      transition("1 => 0", animate("500ms")),
      transition("0 => 1", animate("200ms"))
    ])
  ],
  templateUrl: "anouncer.component.html",
  styleUrls: ["anouncer.component.css"]
})

export class AnouncerComponent {
  @Input() gameState: State;
}