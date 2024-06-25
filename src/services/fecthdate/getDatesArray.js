export function getDatesArray(startDate, endDate) {
    const dates = []
    while (startDate <= endDate) {
        dates.push(startDate.toISOString().split('T')[0]);
        startDate.setDate(startDate.getDate() + 1);
    }
    return dates
}