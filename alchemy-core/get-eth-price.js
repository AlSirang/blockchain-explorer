import { ethers } from "ethers";

const provider = new ethers.providers.AlchemyProvider(
  "mainnet",
  process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
);

const contractAddress = "0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419"; // Chainlink oracle address
const abi = [
  {
    inputs: [],
    name: "latestRoundData",
    outputs: [
      { internalType: "uint80", name: "roundId", type: "uint80" },
      { internalType: "int256", name: "answer", type: "int256" },
      { internalType: "uint256", name: "startedAt", type: "uint256" },
      { internalType: "uint256", name: "updatedAt", type: "uint256" },
      { internalType: "uint80", name: "answeredInRound", type: "uint80" },
    ],
    stateMutability: "view",
    type: "function",
  },
]; // Chainlink oracle ABI

export const getETHPrice = async () => {
  const priceFeed = new ethers.Contract(contractAddress, abi, provider);

  const { answer } = await priceFeed.latestRoundData();

  const priceInUSD = ethers.utils.formatEther(
    (answer * 1e10).toLocaleString("fullwide", { useGrouping: false })
  );

  return Number(priceInUSD).toFixed(2);
};
