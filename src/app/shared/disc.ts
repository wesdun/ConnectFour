import { Location } from "./location";

export class Disc {
  private _location: Location;
  private _color: string;

  constructor(location: Location, color: string) {
    this._location = location;
    this._color = color;
  }

  get location(): Location {
    return this._location;
  }
  get color(): string {
    return this._color;
  }
}