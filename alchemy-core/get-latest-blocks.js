import { alchemy } from "@/configs/alchemy.config";
import { timeAgo } from "@/utils/time";

export const getLatestBlocks = async (maxBlocks = 6) => {
  const latestBlock = await alchemy.core.getBlockNumber();
  const blockPromises = [];
  for (let i = 0; i < maxBlocks; i++) {
    blockPromises.push(alchemy.core.getBlock(latestBlock - i));
  }

  const latestBlocksRaw = await Promise.all(blockPromises);

  return latestBlocksRaw.map(({ miner, number, timestamp, transactions }) => ({
    miner,
    number,
    timestamp,
    transactions,
    agoTimestamp: timeAgo(timestamp),
  }));
};
