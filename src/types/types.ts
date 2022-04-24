/**
 * The universe of the Game of Life is an infinite, two-dimensional orthogonal grid of square cells, each of which is in one of two possible states, live or dead (or populated and unpopulated, respectively). Every cell interacts with its eight neighbours, which are the cells that are horizontally, vertically, or diagonally adjacent. At each step in time, the following transitions occur:

1. Any live cell with fewer than two live neighbours dies, as if by underpopulation.
2. Any live cell with two or three live neighbours lives on to the next generation.
3. Any live cell with more than three live neighbours dies, as if by overpopulation.
4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.

These rules, which compare the behavior of the automaton to real life, can be condensed into the following:

1. Any live cell with two or three live neighbours survives.
2. Any dead cell with three live neighbours becomes a live cell.
3. All other live cells die in the next generation. Similarly, all other dead cells stay dead.

The initial pattern constitutes the seed of the system. The first generation is created by applying the above rules simultaneously to every cell in the seed, live or dead; births and deaths occur simultaneously, and the discrete moment at which this happens is sometimes called a tick.[nb 1] Each generation is a pure function of the preceding one. The rules continue to be applied repeatedly to create further generations.
 */

export class Cell {
  constructor(public x: number, public y: number) {}

  isNeighbour(c: Cell): boolean {
    const xDistance = Math.abs(c.x - this.x);
    const yDistance = Math.abs(c.y - this.y);
    return xDistance <= 1 && yDistance <= 1;
  }

  isSameCell(c: Cell) {
    return this.x === c.x && this.y === c.y;
  }

  liveNeighbours(liveCells: Cell[]): Cell[] {
    // liveCells may contain this cell, so make sure it is removed;
    const otherLiveCells = liveCells.filter((c: Cell) => !this.isSameCell(c));
    return otherLiveCells.filter((c: Cell) => this.isNeighbour(c));
  }
}

export class Grid {
  liveCells: Cell[];
  generation: number;
  previousGenerations: Cell[][];

  constructor(liveCells: Cell[]) {
    this.liveCells = liveCells;
    this.generation = 0;
    this.previousGenerations = [];
  }

  cellIsLive(c: Cell): boolean {
    // TODO: Test this function
    return this.liveCells.some((lc: Cell) => c.isSameCell(lc));
  }

  nextGeneration() {
    this.previousGenerations.push([...this.liveCells]);
    const continueLivingCells: Cell[] = this.getLiveCellsWithTwoOrThreeLiveNeighbours();
    const newLivingCells: Cell[] = this.getDeadCellsWithThreeLiveNeighbours();
    this.liveCells = [...continueLivingCells, ...newLivingCells];
    this.generation++;
  }

  previousGeneration() {
    if (this.previousGenerations.length === 0)  return;
    this.liveCells = this.previousGenerations.pop() as Cell[];
    this.generation--;
  }

  reset() {
    if (this.previousGenerations.length === 0)  return;
    this.liveCells = this.previousGenerations[0];
    this.previousGenerations = [];
    this.generation = 0;
  }

  getLiveCellsWithTwoOrThreeLiveNeighbours(): Cell[] {
    const result: Cell[] = [];
    this.liveCells.forEach((c: Cell) => {
      const liveNeighbours = c.liveNeighbours(this.liveCells);
      if (liveNeighbours.length === 2 || liveNeighbours.length === 3) {
        result.push(c);
      }
    });
    return result;
  }

  getDeadCellsWithThreeLiveNeighbours(): Cell[] {
    const result: Cell[] = [];
    this.liveCells.forEach((c: Cell) => {
      const adjDeacCells = this.getAdjacentDeadCells(c);
      adjDeacCells.forEach((c: Cell) => {
        const liveNeighbours = c.liveNeighbours(this.liveCells);
        const cellIsNotInResult = result.findIndex((rc: Cell) => rc.isSameCell(c)) === -1;
        if (liveNeighbours.length === 3 && cellIsNotInResult) {
          result.push(c);
        }
      });
    });
    return result;
  }

  private getAdjacentDeadCells(c: Cell): Cell[] {
    const result: Cell[] = [];
    const ranges = [-1, 0, 1];
    
    ranges.forEach((i: number) => {
      ranges.forEach((j: number) => {
        if (i === 0 && j === 0) return;  // Don't check against yourself
        const cellToCheck: Cell = new Cell(c.x + i, c.y + j);
        const isDeadCell = this.liveCells.findIndex((c: Cell) => c.isSameCell(cellToCheck)) === -1;
        const cellIsNotInResult = result.findIndex((c: Cell) => c.isSameCell(cellToCheck)) === -1;
        if (isDeadCell && cellIsNotInResult) {
          result.push(cellToCheck);
        }
      });
    });
    return result;
  }

}