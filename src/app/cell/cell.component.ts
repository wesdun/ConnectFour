import { Component } from "@angular/core";

@Component({
  moduleId: module.id,
  selector: "cf-cell",
  templateUrl: "cell.component.html",
})

export class CellComponent {
  color: string;

  constructor() {
    this.color = "";
  }

  isEmpty(): boolean {
    return this.color === "";
  }
}