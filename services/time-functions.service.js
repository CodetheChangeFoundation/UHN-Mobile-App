const convertSeconds = (seconds) => {
    let second = Math.floor(seconds % 3600 % 60);
    if (second <= 9) {
        second = "0" + second;
    }
    return second;
};

const convertSecondsToMinutes = (seconds) => {
    let minute = Math.floor(seconds % 3600 / 60);
    return minute;
};

module.exports = {
    convertSeconds,
    convertSecondsToMinutes
}