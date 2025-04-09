import { checkHoneypot } from "./checkHoneyPot";
import { getLiqudity } from "./getLiqudity";
import { getPools } from "./getPools";
const NATIVE_TOKEN_ADDRESS = "0x4200000000000000000000000000000000000006"; // Native token for chain

(async function () {
  // get BASE pools for last n blocks
  const pools = await getPools(400);
  // const pools = [{
  //   token0: '0x4200000000000000000000000000000000000006',
  //   token1: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
  //   pool: '0xd0b53D9277642d899DF5C87A3966A349A798F224'
  // }]

  for (const pool of pools) {
    // delay needed to avoid rate limiting from RPC URL
    if (pool.token0 === NATIVE_TOKEN_ADDRESS) {
      const liqudity0 = await getLiqudity(pool.pool, pool.token0);
      if (liqudity0.amount > 10) {
        console.log('pool with some liqudity', { ...liqudity0, token1: pool.token1, ethAmount: liqudity0.amount });
      }
    }

    if (pool.token1 === NATIVE_TOKEN_ADDRESS) {
      const liqudity1 = await getLiqudity(pool.pool, pool.token1);
      if (liqudity1.amount > 10) {
        console.log('pool with some liqudity', { ...liqudity1, token0: pool.token0, ethAmount: liqudity1.amount });
      }
    }
  }

  // const result = await checkHoneypot('0x275f3B8c485991ACda15849AF18c7860aF6845e3', '8453')
})();

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}