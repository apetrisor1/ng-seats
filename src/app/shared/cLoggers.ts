/* Various console loggers used in development only. */

export const cLogSeatsCoords = (seats) => {
    let minX: number = seats[0].cx.baseVal.value
    let maxX: number = minX
    let minY: number = seats[0].cy.baseVal.value
    let maxY: number = minY
    console.log('SEAT COORDS RELATIVE TO PARENT')
    console.log({ x: minX, y: minY })
    for (let i = 1; i < seats.length; i++) {
        const { cx, cy } = seats[i]
        const x = cx.baseVal.value
        const y = cy.baseVal.value
        console.log({ x, y })
        if (x < minX) { minX = x }
        if (x > maxX) { maxX = x }
        if (y < minY) { minY = y }
        if (x > maxY) { maxY = y }
    }
    const pivotX = (minX + maxX) / 2
    const pivotY = (minY + maxY) / 2
    console.log('PIVOT POINT OF SEATS SELECTION')
    console.log({ pivotX, pivotY })
    console.log('SEAT COORDS RELATIVE TO PIVOT')
    seats.forEach(seat => {
        const { cx, cy } = seat
        console.log({ x: cx.baseVal.value - pivotX })
        console.log({ y: pivotY - cy.baseVal.value })
    })
}
