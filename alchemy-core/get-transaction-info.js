import { alchemy } from "@/configs/alchemy.config";

export const getTransactionInfo = async (query) => {
  const transactionReceipt_ = alchemy.core.getTransactionReceipt(query);
  const transaction_ = alchemy.core.getTransaction(query);

  const [transactionReceipt, transaction] = await Promise.all([
    transactionReceipt_,
    transaction_,
  ]);

  if (!transactionReceipt || !transaction) return null;

  return {
    to: transaction.to,
    from: transaction.from,
    gasPrice: transaction.gasPrice?.toString() || 0,
    gasLimit: transaction.gasLimit?.toString() || 0,
    maxFeePerGas: transaction.maxFeePerGas?.toString() || 0,
    maxPriorityFeePerGas: transaction.maxPriorityFeePerGas?.toString() || 0,
    value: transaction.value.toString(),
    hash: transaction.hash,
    blockNumber: transaction.blockNumber,
    nonce: transaction.nonce,
    data: transaction.data,
    gasUsed: transactionReceipt.gasUsed.toString(),
    logs: transactionReceipt.logs,
    logsBloom: transactionReceipt.logsBloom,
    status: transactionReceipt.status,
    cumulativeGasUsed: transactionReceipt.cumulativeGasUsed.toString(),
    effectiveGasPrice: transactionReceipt.effectiveGasPrice.toString(),
    confirmations: transactionReceipt.confirmations.toString(),
  };
};
