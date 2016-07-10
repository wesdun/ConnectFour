import {CellComponent} from "../cell/cell.component";
describe("CellComponent", () => {
  it("should initialize as blank", () => {
    let cell: CellComponent = new CellComponent();
    expect(cell.isEmpty()).toBe(true);
  });
});