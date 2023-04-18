import { alchemy } from "@/configs/alchemy.config";

export const getFinalizedAndSafeBlock = async () => {
  const finalized = await alchemy.core.getBlock("finalized");
  const safe = await alchemy.core.getBlock("safe");

  return {
    finalized: {
      blockNumber: finalized.number,
      timestamp: finalized.timestamp,
      transactions: finalized.transactions,
    },
    safe: {
      blockNumber: safe.number,
      timestamp: safe.timestamp,
      transactions: safe.transactions,
    },
  };
};
