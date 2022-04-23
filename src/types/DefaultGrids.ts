import { Cell, Grid } from "./types";

export class Square extends Grid {
  constructor() {
    const square = [
      new Cell(0, 0),
      new Cell(0, 1),
      new Cell(1, 0),
      new Cell(1, 1),
    ];
    super(square);
  }
}

export class BeeHive extends Grid {
  constructor() {
    const beeHive = [
      new Cell(2, 3),
      new Cell(3, 3),
      new Cell(4, 2),
      new Cell(3, 1),
      new Cell(2, 1),
      new Cell(1, 2),
    ];
    super(beeHive);
  }
}


export class Blinker extends Grid {
  constructor() {
    const blinker = [
      new Cell(-1, 0),
      new Cell(0, 0),
      new Cell(1, 0),
    ];
    super(blinker);
  }
}

export class Toad extends Grid {
  constructor() {
    const toad = [
      new Cell(2, 3),
      new Cell(3, 3),
      new Cell(4, 3),
      new Cell(1, 2),
      new Cell(2, 2),
      new Cell(3, 2),
    ];
    super(toad);
  }
}

export class Glider extends Grid {
  constructor() {
    const glider = [
      new Cell(0, 0),
      new Cell(1, -1),
      new Cell(1, -2),
      new Cell(0, -2),
      new Cell(-1, -2),
    ];
    super(glider);
  }
}