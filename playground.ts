import { getLiqudity } from "./getLiqudity";


(async function () {
    const liqudity0 = await getLiqudity('0x552757Ad6d1Efcbe296dC85D7331ad89AA55b0bD', '0x31Db2b02D1a1eC2C1bf3631C1417bc28193DF125');
    const liqudity1 = await getLiqudity('0x552757Ad6d1Efcbe296dC85D7331ad89AA55b0bD', '0x4200000000000000000000000000000000000006');
    console.log({
        liqudity0,
        liqudity1
    });
})();