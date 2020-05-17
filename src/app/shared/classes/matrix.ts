/* Used to hold seat coordinates and the transformation matrix for rotations.
Matrix of seat coordinates is 2 rows, N columns. Rotation matrix is 2x2.
Matrix.rows returns 2 arrays, array 1 has all X coords, array 2 has all Y coords
Matrix.columns() returns N arrays, where each one has two elements, and represents one seat. */

export class Matrix {
  rows: any[]
  constructor(...rows) {
    this.rows = rows
  }
  columns() {
    return this.rows[0].map((_: any, i: number) => this.rows.map((r: any[]) => r[i]))
  }
}
