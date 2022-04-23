import { Cell } from "@/types/types";

describe("Cell class", () => {
  it("distinguishes between neighbours and non-neighbours", () => {
    const c = new Cell(0, 0);
    // Giong clockwise from top (assuming negative goes up and left)
    const above = new Cell(0, -1);
    expect(c.isNeighbour(above)).toBeTruthy();
    const aboveRight = new Cell(1, -1);
    expect(c.isNeighbour(aboveRight)).toBeTruthy();
    const right = new Cell(0, -1);
    expect(c.isNeighbour(right)).toBeTruthy();
    const belowRight = new Cell(0, -1);
    expect(c.isNeighbour(belowRight)).toBeTruthy();
    const below = new Cell(0, -1);
    expect(c.isNeighbour(below)).toBeTruthy();
    const belowLeft = new Cell(0, -1);
    expect(c.isNeighbour(belowLeft)).toBeTruthy();
    const left = new Cell(0, -1);
    expect(c.isNeighbour(left)).toBeTruthy();
    const aboveLeft = new Cell(-1, -1);
    expect(c.isNeighbour(aboveLeft)).toBeTruthy();


    const x0yN2 = new Cell(0, -2);
    expect(c.isNeighbour(x0yN2)).toBeFalsy();
    const x1yN2 = new Cell(1, -2);
    expect(c.isNeighbour(x1yN2)).toBeFalsy();
    const x2y0 = new Cell(2, 0);
    expect(c.isNeighbour(x2y0)).toBeFalsy();
  });

  it("detects the same cell correctly", () => {
    const c1 = new Cell(0, 0);
    const c2 = new Cell(0, 0);
    const c3 = new Cell(0, 1);
    expect(c1.isSameCell(c2)).toBeTruthy();
    expect(c2.isSameCell(c1)).toBeTruthy();
    expect(c1.isSameCell(c3)).toBeFalsy();
  });

  describe("finds live neighbours from a list of live cells", () => {
    it ("returns all cells in a square of cells", () => {
      const x0y0 = new Cell(0, 0);
      const x0y1 = new Cell(0, 1);
      const x1y0 = new Cell(1, 0);
      const x1y1 = new Cell(1, 1);
      const squareOfLiveCells = [
        x0y0,
        x0y1,
        x1y0,
        x1y1,
      ];

      const expected = [
        x0y1,
        x1y0,
        x1y1,
      ];

      expect(x0y0.liveNeighbours(squareOfLiveCells)).toEqual(expected);
    })

    it("returns correct neighbours for bee-hive pattern", () => {
      // See https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns
      const x2y3 = new Cell(2, 3);
      const x3y3 = new Cell(3, 3);
      const x4y2 = new Cell(4, 2);
      const x3y1 = new Cell(3, 1);
      const x2y1 = new Cell(2, 1);
      const x1y2 = new Cell(1, 2);

      const beeHive = [
        x2y3,
        x3y3,
        x4y2,
        x3y1,
        x2y1,
        x1y2,
      ];

      const localTest = (c: Cell, expected: Cell[]) => {
        expect(c.liveNeighbours(beeHive).length).toEqual(expected.length);
        expect(c.liveNeighbours(beeHive)).toEqual(expect.arrayContaining(expected));
      }

      const tests = [
        {
          c: x2y3,
          expected: [x3y3, x1y2],
        },
        {
          c: x3y3,
          expected: [x2y3, x4y2],
        },
        {
          c: x4y2,
          expected: [x3y3, x3y1],
        },
        {
          c: x3y1,
          expected: [x4y2, x2y1],
        },
        {
          c: x2y1,
          expected: [x3y1, x1y2],
        },
        {
          c: x1y2,
          expected: [x2y1, x2y3],
        },
      ];

      tests.map(t => localTest(t.c, t.expected));
    });
  });
});