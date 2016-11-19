export class BoardFactoryService {
  createBoard(): string[][] {
    let board: string[][] = [];
    for (let i: number = 0; i < 7; i++) {
      board.push([]);
      for (let j: number = 0; j < 6; j++) {
        board[i].push("white");
      }
    }
    return board;
  }
}