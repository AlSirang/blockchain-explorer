import { alchemy } from "@/configs/alchemy.config";
import { timeAgo } from "@/utils/time";

export const getLatestTransactions = async (maxTxns = 6) => {
  const latestBlock = await alchemy.core.getBlockNumber();
  const { transactions, timestamp } = await alchemy.core.getBlock(latestBlock);
  const transactionsPromises = [];
  for (let i = 0; i < maxTxns; i++) {
    transactionsPromises.push(
      alchemy.core.getTransactionReceipt(transactions[i])
    );
  }

  const latestTransactions = await Promise.all(transactionsPromises);

  return latestTransactions.map(
    ({ blockNumber, from, to, transactionHash }) => ({
      blockNumber,
      to,
      from,
      transactionHash,
      agoTimestamp: timeAgo(timestamp),
    })
  );
};
