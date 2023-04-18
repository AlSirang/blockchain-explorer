import { alchemy } from "@/configs/alchemy.config";

export const getBlockInfo = async (query) => {
  let blockHashOrBlockTag = query;
  if (!/0x/.test(query)) blockHashOrBlockTag = Number(query);

  const blockInfo = await alchemy.core.getBlock(blockHashOrBlockTag);
  return {
    ...blockInfo,
    baseFeePerGas: blockInfo.baseFeePerGas?.toString() || 0,
    gasLimit: blockInfo.gasLimit?.toString() || 0,
    gasUsed: blockInfo.gasUsed?.toString() || 0,
    _difficulty: blockInfo._difficulty?.toString() || 0,
  };
};
