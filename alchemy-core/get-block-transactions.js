import { alchemy } from "@/configs/alchemy.config";

export const getBlockTransactions = async (query) => {
  let blockHashOrBlockTag = query;
  if (!/0x/.test(query)) blockHashOrBlockTag = Number(query);

  const blockInfo = await alchemy.core.getBlockWithTransactions(
    blockHashOrBlockTag
  );
  return {
    transactions: blockInfo.transactions || [],
  };
};
