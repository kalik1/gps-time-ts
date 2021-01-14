import {toGPSMS, toUnixMS} from "../src";

describe('Gps time', () => {

    it('should convert zero Time', () => {
        const nowDateZero = new Date("Sun Jan 06 1980 UTC");
        const nowDateZeroGps: number = toGPSMS(nowDateZero.getTime());
        expect(nowDateZeroGps).toBe(0);
    })

    it('should Convert From Unix To GPS', () => {
        const testDate = new Date(1610636399054);
        const gpsDate: number = toGPSMS(testDate.getTime());
        expect(gpsDate).toEqual(1294671617054);
    })

    it('should Convert From GPS To Unix', () => {
        const unixDate: number = toUnixMS(1294671617123);
        expect(unixDate).toEqual(1610636399123);
    })

    it('should convert in a symmetric way ', () => {
        const nowDate = new Date();
        const gpsNowDate: number = toGPSMS(nowDate.getTime());
        const reverseUnixDate: number = toUnixMS(gpsNowDate);
        const reverseGPSDate: number = toGPSMS(reverseUnixDate);
        expect(reverseGPSDate).toBe(gpsNowDate);
    })

});

