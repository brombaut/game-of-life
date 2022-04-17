import { Grid, Cell } from "@/types";

describe("Grid class", () => {
  describe("correctly keeps live cells with 2 or 3 neighbours living", () => {
    it("returns all adjacent cells in a live square", () => {
      const square = [
        new Cell(0, 0),
        new Cell(0, 1),
        new Cell(1, 0),
        new Cell(1, 1),
      ];
  
      const g = new Grid(square);
      const result = g.getLiveCellsWithTwoOrThreeLiveNeighbours();
      expect(result.length).toEqual(square.length);
      expect(result).toEqual(expect.arrayContaining(square));
    });

    it("returns all adjacent cells in a live bee-hive", () => {
      // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns
      const beeHive = [
        new Cell(2, 3),
        new Cell(3, 3),
        new Cell(4, 2),
        new Cell(3, 1),
        new Cell(2, 1),
        new Cell(1, 2),
      ];

      const g = new Grid(beeHive);
      const result = g.getLiveCellsWithTwoOrThreeLiveNeighbours();
      expect(result.length).toEqual(beeHive.length);
      expect(result).toEqual(expect.arrayContaining(beeHive));
    });

    it("returns only the center cell on a blinker", () => {
      // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns
      const blinker = [
        new Cell(-1, 0),
        new Cell(0, 0),
        new Cell(1, 0),
      ];

      const expected = [new Cell(0, 0)];
      const g = new Grid(blinker);
      const result = g.getLiveCellsWithTwoOrThreeLiveNeighbours();
      expect(result.length).toEqual(expected.length);
      expect(result).toEqual(expect.arrayContaining(expected));
    });

  });

  describe("correctly turns dead cells with 3 live neighbours into live cells", () => {
    it("does not return any cells on a still life pattern", () => {
      const square = [
        new Cell(0, 0),
        new Cell(0, 1),
        new Cell(1, 0),
        new Cell(1, 1),
      ];

      const expected: Cell[] = [];
  
      const g = new Grid(square);
      const result = g.getDeadCellsWithThreeLiveNeighbours();
      expect(result.length).toEqual(expected.length);
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it("finds to correct cells in a blinker (gen1) to turn into living cells", () => {
      const blinker = [
        new Cell(-1, 0),
        new Cell(0, 0),
        new Cell(1, 0),
      ];

      const expected = [new Cell(0, -1), new Cell(0, 1)];
      const g = new Grid(blinker);
      const result = g.getDeadCellsWithThreeLiveNeighbours();
      expect(result.length).toEqual(expected.length);
      expect(result).toEqual(expect.arrayContaining(expected));
    });

    it("finds to correct cells in a blinker (gen2) to turn into living cells", () => {
      const blinker = [
        new Cell(0, -1),
        new Cell(0, 0),
        new Cell(0, 1),
      ];

      const expected = [new Cell(-1, 0), new Cell(1, 0)];
      const g = new Grid(blinker);
      const result = g.getDeadCellsWithThreeLiveNeighbours();
      expect(result.length).toEqual(expected.length);
      expect(result).toEqual(expect.arrayContaining(expected));
    });
  });
  // describe("still lifes don't change", () => {
  //   it("doesn't change squares", () => {
  //     const square = [
  //       new Cell(0, 0),
  //       new Cell(0, 1),
  //       new Cell(1, 0),
  //       new Cell(1, 1),
  //     ];
  //     const g = new Grid(square);

  //   });
  // });
});