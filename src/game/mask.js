export const MaskCoordinate = Object.freeze({
  X: { x: 1, y: 4 },
  A: { x: 1, y: 8 },
  B: { x: 0, y: 7 },
  C: { x: 1, y: 6 },
  D: { x: 2, y: 7 },
  AB: { x: 0, y: 5 },
  AC: { x: 0, y: 4 },
  AD: { x: 2, y: 5 },
  BC: { x: 0, y: 3 },
  BD: { x: 1, y: 3 },
  CD: { x: 2, y: 3 },
  ABC: { x: 0, y: 10 },
  ABD: { x: 1, y: 11 },
  ACD: { x: 2, y: 10 },
  BCD: { x: 1, y: 9 },
  ABCD: { x: 1, y: 7 },
  A1B: { x: 0, y: 2 },
  B2C: { x: 0, y: 0 },
  C3D: { x: 2, y: 0 },
  AD4: { x: 2, y: 2 },
  A1BC: { x: 0, y: 17 },
  AB2C: { x: 0, y: 18 },
  B2CD: { x: 1, y: 19 },
  BC3D: { x: 0, y: 19 },
  AC3D: { x: 1, y: 18 },
  ACD4: { x: 1, y: 17 },
  A1BD: { x: 1, y: 20 },
  ABD4: { x: 0, y: 20 },
  A1B2C: { x: 0, y: 1 },
  B2C3D: { x: 1, y: 0 },
  AC3D4: { x: 2, y: 1 },
  A1BD4: { x: 1, y: 2 },
  A1BCD: { x: 0, y: 22 },
  AB2CD: { x: 0, y: 21 },
  ABC3D: { x: 1, y: 21 },
  ABCD4: { x: 1, y: 22 },
  A1B2CD: { x: 2, y: 13 },
  AB2C3D: { x: 1, y: 14 },
  ABC3D4: { x: 0, y: 13 },
  A1BCD4: { x: 1, y: 12 },
  A1B2C3D: { x: 1, y: 16 },
  AB2C3D4: { x: 0, y: 16 },
  A1BC3D4: { x: 0, y: 15 },
  A1B2CD4: { x: 1, y: 15 },
  A1BC3D: { x: 0, y: 23 },
  AB2CD4: { x: 1, y: 23 },
  A1B2C3D4: { x: 1, y: 1 },
});

var Mask;
(function (Mask) {
  Mask["X"] = "X";
  Mask["A"] = "A";
  Mask["B"] = "B";
  Mask["C"] = "C";
  Mask["D"] = "D";
  Mask["AB"] = "AB";
  Mask["AC"] = "AC";
  Mask["AD"] = "AD";
  Mask["BC"] = "BC";
  Mask["BD"] = "BD";
  Mask["CD"] = "CD";
  Mask["ABC"] = "ABC";
  Mask["ABD"] = "ABD";
  Mask["ACD"] = "ACD";
  Mask["BCD"] = "BCD";
  Mask["ABCD"] = "ABCD";
  Mask["A1B"] = "A1B";
  Mask["B2C"] = "B2C";
  Mask["C3D"] = "C3D";
  Mask["AD4"] = "AD4";
  Mask["A1BC"] = "A1BC";
  Mask["AB2C"] = "AB2C";
  Mask["B2CD"] = "B2CD";
  Mask["BC3D"] = "BC3D";
  Mask["AC3D"] = "AC3D";
  Mask["ACD4"] = "ACD4";
  Mask["A1BD"] = "A1BD";
  Mask["ABD4"] = "ABD4";
  Mask["A1B2C"] = "A1B2C";
  Mask["B2C3D"] = "B2C3D";
  Mask["AC3D4"] = "AC3D4";
  Mask["A1BD4"] = "A1BD4";
  Mask["A1BCD"] = "A1BCD";
  Mask["AB2CD"] = "AB2CD";
  Mask["ABC3D"] = "ABC3D";
  Mask["ABCD4"] = "ABCD4";
  Mask["A1B2CD"] = "A1B2CD";
  Mask["AB2C3D"] = "AB2C3D";
  Mask["ABC3D4"] = "ABC3D4";
  Mask["A1BCD4"] = "A1BCD4";
  Mask["A1B2C3D"] = "A1B2C3D";
  Mask["AB2C3D4"] = "AB2C3D4";
  Mask["A1BC3D4"] = "A1BC3D4";
  Mask["A1B2CD4"] = "A1B2CD4";
  Mask["A1BC3D"] = "A1BC3D";
  Mask["AB2CD4"] = "AB2CD4";
  Mask["A1B2C3D4"] = "A1B2C3D4";
})(Mask || (Mask = {}));

export const IdTable = {
  0: Mask.X,
  1: Mask.A,
  2: Mask.B,
  4: Mask.C,
  8: Mask.D,
  3: Mask.AB,
  5: Mask.AC,
  9: Mask.AD,
  6: Mask.BC,
  10: Mask.BD,
  12: Mask.CD,
  7: Mask.ABC,
  11: Mask.ABD,
  13: Mask.ACD,
  14: Mask.BCD,
  15: Mask.ABCD,
  19: Mask.A1B,
  38: Mask.B2C,
  76: Mask.C3D,
  137: Mask.AD4,
  23: Mask.A1BC,
  39: Mask.AB2C,
  46: Mask.B2CD,
  78: Mask.BC3D,
  77: Mask.AC3D,
  141: Mask.ACD4,
  27: Mask.A1BD,
  139: Mask.ABD4,
  55: Mask.A1B2C,
  110: Mask.B2C3D,
  205: Mask.AC3D4,
  155: Mask.A1BD4,
  31: Mask.A1BCD,
  47: Mask.AB2CD,
  79: Mask.ABC3D,
  143: Mask.ABCD4,
  63: Mask.A1B2CD,
  111: Mask.AB2C3D,
  207: Mask.ABC3D4,
  159: Mask.A1BCD4,
  127: Mask.A1B2C3D,
  239: Mask.AB2C3D4,
  223: Mask.A1BC3D4,
  191: Mask.A1B2CD4,
  95: Mask.A1BC3D,
  175: Mask.AB2CD4,
  255: Mask.A1B2C3D4,
};

export class Masker {
  mask8bits(matrix, row, col) {
    let m = 0;
    const v = matrix[row][col];
    m |= this.eq(matrix, row - 1, col, v) << 0;
    m |= this.eq(matrix, row, col + 1, v) << 1;
    m |= this.eq(matrix, row + 1, col, v) << 2;
    m |= this.eq(matrix, row, col - 1, v) << 3;
    m |= (m & 0b0011) == 0b0011 ? this.eq(matrix, row - 1, col + 1, v) << 4 : 0;
    m |= (m & 0b0110) == 0b0110 ? this.eq(matrix, row + 1, col + 1, v) << 5 : 0;
    m |= (m & 0b1100) == 0b1100 ? this.eq(matrix, row + 1, col - 1, v) << 6 : 0;
    m |= (m & 0b1001) == 0b1001 ? this.eq(matrix, row - 1, col - 1, v) << 7 : 0;
    return IdTable[m];
  }

  eq(m, r, c, v) {
    return r >= 0 && r < m.length && c >= 0 && c < m[r].length && m[r][c] == v
      ? 1
      : 0;
  }
}
