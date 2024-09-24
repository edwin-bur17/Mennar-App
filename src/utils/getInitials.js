export function getInitials(fullname = null) {
    if (fullname) {
        const names = fullname.split(" ")
        if (names.length >= 2) {
            return (names[0][0] + names[1][0]).toUpperCase()
        } else if (names.length === 1) {
            return (names[0][0]+ names[0][1]).toUpperCase()
        }
    } 
    return ""
}