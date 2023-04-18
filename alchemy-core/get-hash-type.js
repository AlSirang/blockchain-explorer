import { alchemy } from "@/configs/alchemy.config";

export const getHashType = async (query) => {
  try {
    const transaction = await alchemy.core.getTransaction(query);
    const block = await alchemy.core.getBlock(query);

    if (transaction) return "transaction";
    if (block) return "block";
  } catch (err) {}

  return null;
};
