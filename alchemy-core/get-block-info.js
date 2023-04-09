import { alchemy } from "@/configs/alchemy.config";

export const getBlockInfo = async (query) => {
  let blockHashOrBlockTag = query;
  if (!/0x/.test(query)) blockHashOrBlockTag = Number(query);

  const blockInfo = await alchemy.core.getBlock(blockHashOrBlockTag);
  return {
    ...blockInfo,
    baseFeePerGas: blockInfo.baseFeePerGas?.toString(),
    gasLimit: blockInfo.gasLimit?.toString(),
    gasUsed: blockInfo.gasUsed?.toString(),
    _difficulty: blockInfo._difficulty?.toString(),
  };
};
