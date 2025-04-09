import { ethers } from "ethers";
import { Pool } from "./types";

const PROVIDER_URL = "https://base-mainnet.g.alchemy.com/v2/kgA7mmMAkpUMXxWS5bMDy7YdnUI2-IB_"; // Replace with your provider URL
const UNI_V3_FACTORY_ADDRESS = "0x8909Dc15e40173Ff4699343b6eB8132c65e18eC6"; // Uniswap V3 Factory
const NATIVE_TOKEN_ADDRESS = "0x4200000000000000000000000000000000000006"; // Native token for chain
const abi = [{ "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": true, "internalType": "address", "name": "token0", "type": "address" }, { "indexed": true, "internalType": "address", "name": "token1", "type": "address" }, { "indexed": false, "internalType": "address", "name": "pair", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "", "type": "uint256" }], "name": "PairCreated", "type": "event" }, { "constant": true, "inputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "name": "allPairs", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "allPairsLength", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "tokenA", "type": "address" }, { "internalType": "address", "name": "tokenB", "type": "address" }], "name": "createPair", "outputs": [{ "internalType": "address", "name": "pair", "type": "address" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": true, "inputs": [], "name": "feeTo", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [], "name": "feeToSetter", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": true, "inputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }], "name": "getPair", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeTo", "type": "address" }], "name": "setFeeTo", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "constant": false, "inputs": [{ "internalType": "address", "name": "_feeToSetter", "type": "address" }], "name": "setFeeToSetter", "outputs": [], "payable": false, "stateMutability": "nonpayable", "type": "function" }]

// Get createPool events for last n blocks
export async function getPools(n: number): Promise<Pool[]> {
  const provider = new ethers.JsonRpcProvider(PROVIDER_URL);
  const blockNumber = await provider.getBlockNumber();
  const contract = new ethers.Contract(UNI_V3_FACTORY_ADDRESS, abi, provider);
  const filter = contract.filters.PairCreated();

  const events: any = await contract.queryFilter(filter, 22560428 - 10000, 22560428);
  const pools: Pool[] = events.map((event: any) => {
    return {
      token0: event.args.token0,
      token1: event.args.token1,
      pool: event.args.pair,
      blockNumber: event.blockNumber
    }
    // Filter out pools that don't have NATIVE_TOKEN_ADDRESS as one of the tokens
  }).filter((pool: Pool) => pool.token0 === NATIVE_TOKEN_ADDRESS || pool.token1 === NATIVE_TOKEN_ADDRESS);

  return pools;
}