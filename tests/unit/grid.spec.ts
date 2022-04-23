import { Grid, Cell } from "@/types/types";

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


  describe("correctly generates new generations", () => {
    describe("still lifes", () => {
      it("doesn't change squares", () => {
        const square = [
          new Cell(0, 0),
          new Cell(0, 1),
          new Cell(1, 0),
          new Cell(1, 1),
        ];
        const g = new Grid(square);
        g.nextGeneration();
        const result = g.liveCells;
        expect(result.length).toEqual(square.length);
        expect(result).toEqual(expect.arrayContaining(square));
      });

      it("doesn't change bee-hive", () => {
        const beeHive = [
          new Cell(2, 3),
          new Cell(3, 3),
          new Cell(4, 2),
          new Cell(3, 1),
          new Cell(2, 1),
          new Cell(1, 2),
        ];
  
        const g = new Grid(beeHive);
        g.nextGeneration();
        const result = g.liveCells;
        expect(result.length).toEqual(beeHive.length);
        expect(result).toEqual(expect.arrayContaining(beeHive));
      });
    });

    describe("oscilators", () => {
      // https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life#Examples_of_patterns
      it("oscilates a blinker", () => {
        const blinkerG1 = [
          new Cell(0, -1),
          new Cell(0, 0),
          new Cell(0, 1),
        ];

        const blinkerG2 = [
          new Cell(-1, 0),
          new Cell(0, 0),
          new Cell(1, 0),
        ];

        let result: Cell[];
        const g = new Grid(blinkerG1);
        g.nextGeneration();
        result = g.liveCells;
        expect(result.length).toEqual(blinkerG2.length);
        expect(result).toEqual(expect.arrayContaining(blinkerG2));

        g.nextGeneration();
        result = g.liveCells;
        expect(result.length).toEqual(blinkerG1.length);
        expect(result).toEqual(expect.arrayContaining(blinkerG1));

      });

      it("oscilates a toad", () => {
        const toadG1 = [
          new Cell(2, 3),
          new Cell(3, 3),
          new Cell(4, 3),
          new Cell(1, 2),
          new Cell(2, 2),
          new Cell(3, 2),
        ];

        const toadG2 = [
          new Cell(3, 4),
          new Cell(4, 3),
          new Cell(4, 2),
          new Cell(2, 1),
          new Cell(1, 2),
          new Cell(1, 3),
        ];
        
        let result: Cell[];
        const g = new Grid(toadG1);
        g.nextGeneration();
        result = g.liveCells;
        expect(result.length).toEqual(toadG2.length);
        expect(result).toEqual(expect.arrayContaining(toadG2));

        g.nextGeneration();
        result = g.liveCells;
        expect(result.length).toEqual(toadG1.length);
        expect(result).toEqual(expect.arrayContaining(toadG1));
      });
    });

    describe("spaceships", () => {
        it("glides a glider", () => {
          const gliderG1 = [
            new Cell(0, 0),
            new Cell(1, -1),
            new Cell(1, -2),
            new Cell(0, -2),
            new Cell(-1, -2),
          ];

          const gliderG2 = [
            new Cell(-1, -1),
            new Cell(1, -1),
            new Cell(1, -2),
            new Cell(0, -2),
            new Cell(0, -3),
          ];

          const gliderG3 = [
            new Cell(-1, -2),
            new Cell(1, -1),
            new Cell(1, -2),
            new Cell(1, -3),
            new Cell(0, -3),
          ];

          const gliderG4 = [
            new Cell(0, -1),
            new Cell(2, -2),
            new Cell(1, -2),
            new Cell(1, -3),
            new Cell(0, -3),
          ];

          let result: Cell[];
          const g = new Grid(gliderG1);
          g.nextGeneration();
          result = g.liveCells;
          expect(result.length).toEqual(gliderG2.length);
          expect(result).toEqual(expect.arrayContaining(gliderG2));

          g.nextGeneration();
          result = g.liveCells;
          expect(result.length).toEqual(gliderG3.length);
          expect(result).toEqual(expect.arrayContaining(gliderG3));

          g.nextGeneration();
          result = g.liveCells;
          expect(result.length).toEqual(gliderG4.length);
          expect(result).toEqual(expect.arrayContaining(gliderG4));

        });
    });

  });
});