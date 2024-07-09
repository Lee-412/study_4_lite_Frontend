export const get_minute_from_seconds = (second:string) => {
    let seconds = parseInt(second)
    let minute = Math.floor(seconds / 60);
    return minute
}