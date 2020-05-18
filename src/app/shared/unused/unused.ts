// DROPPABLE DIRECTIVE

// private updateCurrentConfiguration = (grouping) => {
//     const seats = Array.from(document.getElementsByClassName('circle'))
//     const sorted = this.sortSeats(seats)
//     const keeper: {}[] = []

//     for (const seat of sorted) {
//       const id = seat.getAttribute('id')
//       const data = id?.split('-')
//       if (data) {
//         const [ sector, row, col ] = data
//         keeper.push({ sector, row, col })
//       }
//     }
//     grouping.updateOccupancy(keeper)
//   }

//   private sortSeats = (seats) => {
//     // todo: fix this any shit
//     const sorted: any[] = seats.sort((n1, n2) => {
//       const id1 = n1.getAttribute('id')
//       const data1 = id1?.split('-')
//       const id2 = n2.getAttribute('id')
//       const data2 = id2?.split('-')

//       if (data1 && data2) {
//         const [ sector1, row1, col1 ] = data1
//         const [ sector2, row2, col2 ] = data2
//         if (sector1 > sector2) {
//           return 1
//         }
//         if (sector1 < sector2) {
//           return -1
//         }
//         if (row1 > row2) {
//           return 1
//         }
//         if (row1 < row2) {
//           return -1
//         }
//         if (col1 > col2) {
//           return 1
//         }
//         if (col1 < col2) {
//           return -1
//         }
//         return 0
//       }
//       return 1
//     })

//     return sorted
//   }

// GROUPING SERVICE

// sectorOccupancy: {[k: string]: any} = {}
// rowOccupany: {[k: string]: any} = {}

// getOccupancy = () => (this.sectorOccupancy)

//   /* Occupancy keeps information about how many
//   seats are already on area, for each sector/row. */
//   updateOccupancy = (rawData) => {
//     let i
//     const len = rawData.length
//     const { sector: firstSector, row: firstRow } = rawData[0]
//     this.rowOccupany[firstRow] = 0
//     this.sectorOccupancy[firstSector] = this.rowOccupany
//     for (i = 0; i < len; i ++) {
//       const seat = rawData[i]
//       const { sector, row, col } = seat
//       console.log(sector, row, col)
//       if (this.sectorOccupancy[sector][row] || this.sectorOccupancy[sector][row] === 0) {
//         this.sectorOccupancy[sector][row] ++
//       } else {
//         this.sectorOccupancy[sector][row] = 0
//       }
//     }
//     console.log(this.sectorOccupancy)
//   }
