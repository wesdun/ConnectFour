import { Location } from "../shared/location";

export class WinDetectionService {
  checkForWin(board: string[][], locationOfDiscPlayed: Location, color: string): boolean {
    let testString: string = color + color + color + color;
    let directionsToTest: string[] = [];
    directionsToTest.push(this.createVerticalTest(board, locationOfDiscPlayed));
    directionsToTest.push(this.createHorizontalTest(board, locationOfDiscPlayed));
    directionsToTest.push(this.createDiagonalUpTest(board, locationOfDiscPlayed));
    directionsToTest.push(this.createDiagonalDownTest(board, locationOfDiscPlayed));

    return directionsToTest.reduce((result: boolean, stringToTest: string) => {
      return result || stringToTest.includes(testString);
    }, false);
  }

  private createHorizontalTest(board: string[][], location: Location): string {
    return board.map((column: string[]) => {
      return column[location.row];
    }).join("");
  }

  private createVerticalTest(board: string[][], location: Location): string {
    return board[location.column].map((cell: string) => {
      return cell;
    }).join("");
  }

  private createDiagonalUpTest(board: string[][], locationOfDiscPlayed: Location): string {
    let diagonalUpString: string = "";
    let location: Location = this.calculateDiagonalUpTestStartLocation(board, locationOfDiscPlayed);

    while (location.column < board.length && location.row >= 0) {
      diagonalUpString += board[location.column][location.row];
      location.column++;
      location.row--;
    }
    return diagonalUpString;
  }

  private createDiagonalDownTest(board: string[][], locationOfDiscPlayed: Location): string {
    let diagonalDownString: string = "";
    let location: Location = this.calculateDiagonalDownTestStartLocation(locationOfDiscPlayed);

    while (location.column < board.length && location.row < board[location.column].length) {
      diagonalDownString += board[location.column][location.row];
      location.column++;
      location.row++;
    }

    return diagonalDownString;
  }

  private calculateDiagonalUpTestStartLocation(board: string[][], location: Location): Location {
    let diagonalRow: number = Math.min(board[location.column].length, location.column + location.row);
    let diagonalColumn: number = location.column + location.row - diagonalRow;

    return new Location(diagonalColumn, diagonalRow);
  }

  private calculateDiagonalDownTestStartLocation(locationOfDiscPlayed: Location): Location {
    return new Location(Math.max(0, locationOfDiscPlayed.column - locationOfDiscPlayed.row), Math.max(0, locationOfDiscPlayed.row - locationOfDiscPlayed.column));
  }
}