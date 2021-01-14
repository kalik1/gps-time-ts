// List of GPS leaps in milliseconds.  This will need to stay updated as new leap seconds are announced in
// the future.

const gpsLeapMS = [
    46828800000, 78364801000, 109900802000, 173059203000, 252028804000, 315187205000, 346723206000,
    393984007000, 425520008000, 457056009000, 504489610000, 551750411000, 599184012000, 820108813000,
    914803214000, 1025136015000, 1119744016000, 1167264017000
];

// Difference in time between Jan 1, 1970 (Unix epoch) and Jan 6, 1980 (GPS epoch).
const gpsUnixEpochDiffMS = 315964800000;


// Number of milliseconds in one second.
const msInSecond = 1000;

/**
 * Determines whether a leap second should be added.  Logic works slightly differently
 * for unix->gps and gps->unix.
 * @param {number} gpsMS GPS time in milliseconds.
 * @param {number} curGPSLeapMS Currenly leap represented in milliseconds.
 * @param {number} totalLeapsMS Total accumulated leaps in milliseconds.
 * @param {boolean} isUnixToGPS True if this operation is for unix->gps, falsy if gps->unix.
 * @return {boolean} Whether a leap second should be added.
 */

function shouldAddLeap(gpsMS: number, curGPSLeapMS: number, totalLeapsMS: number, isUnixToGPS: boolean): boolean {

    return isUnixToGPS ? gpsMS >= curGPSLeapMS - totalLeapsMS : gpsMS >= curGPSLeapMS

}

/**
 * Counts the leaps from the GPS epoch to the inputted GPS time.
 * @param {number} gpsMS GPS time in milliseconds.
 * @param {boolean} isUnixToGPS
 * @return {number}
 */
function countLeaps(gpsMS: number, isUnixToGPS: boolean): number {
    let numLeaps: number = 0;
    for (let i = 0; i < gpsLeapMS.length; i++) {
        if (shouldAddLeap(gpsMS, gpsLeapMS[i], i * msInSecond, isUnixToGPS)) {
            numLeaps++;
        } else {
            break
        }
    }
    return numLeaps;
}

/**
 * Converts GPS milliseconds to Unix milliseconds.
 * @param {number} gpsMS GPS milliseconds (1980 epoch).
 * @return {number} Unix milliseconds (1970 epoch).
 */
export function toUnixMS(gpsMS: number): number {
    // Epoch diff adjustment.
    let unixMS: number = gpsMS + gpsUnixEpochDiffMS;

    // Account for leap seconds between 1980 epoch and gpsMS.
    unixMS -= (countLeaps(gpsMS, false) * msInSecond);

    return unixMS;
}

/**
 * Converts Unix milliseconds to GPS milliseconds.
 * @param {number} unixMS Unix milliseconds (1970 epoch).
 * @return {number} GPS milliseconds (1980 epoch).
 */
export function toGPSMS(unixMS: number): number {
    // Fractional seconds indicate this is a leap second, which needs special handling.

    // Epoch diff adjustment.
    let gpsMS = unixMS - gpsUnixEpochDiffMS;
    // Account for leap seconds between 1980 epoch and gpsMS.
    gpsMS += (countLeaps(gpsMS, true) * msInSecond);
    // If the passed in time falls exactly on a leap second, we have to tweak it.

    return gpsMS;
}
