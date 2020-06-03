/* Used to hold seat coordinates and the transformation matrix for rotations.
Matrix of seat coordinates is 2 rows, N columns. Rotation matrix is 2x2.
Matrix.rows returns 2 arrays, rows[0] has X coords of all seats, rows[1] has Y coords of all seats.
Matrix.columns() returns N arrays, where each array represents one seat through two coords [x, y]*/

export class Matrix {
  public rows: any[]
  constructor(...rows) {
    this.rows = rows
  }
  columns() {
    return this.rows[0].map((_: any, i: number) => this.rows.map((r: any[]) => r[i]))
  }
}
