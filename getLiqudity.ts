import { ethers } from "ethers";
import { erc20Abi } from "viem";

const PROVIDER_URL = "https://base-mainnet.g.alchemy.com/v2/kgA7mmMAkpUMXxWS5bMDy7YdnUI2-IB_"; // Replace with your provider URL

export const getLiqudity = async (pool: string, token: string): Promise<{
  pool: string;
  token: string;
  amount: number;
}> => {
  const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
  const contract = new ethers.Contract(token, erc20Abi, provider);
  const decimals = await contract.decimals();
  const rawBalance = await contract.balanceOf(pool);
  const balance = Number(await ethers.formatUnits(rawBalance, decimals));

  return {
    pool,
    token,
    amount: balance
  };
};

