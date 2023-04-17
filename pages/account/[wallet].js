import { Account } from "@/components/account";
import { alchemy } from "@/configs/alchemy.config";

export default function Index({ wallet, transactions, balance }) {
  return (
    <Account wallet={wallet} transactions={transactions} balance={balance} />
  );
}

export const getServerSideProps = async (context) => {
  const { wallet } = context.query;

  const toTransactionsPromise = alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    toAddress: wallet,
    category: ["external"],
  });
  const fromTransactionsPromise = alchemy.core.getAssetTransfers({
    fromBlock: "0x0",
    fromAddress: wallet,
    category: ["external"],
  });
  const balancePromise = alchemy.core.getBalance(wallet);
  const [toTransactions, fromTransactions, balance] = await Promise.all([
    toTransactionsPromise,
    fromTransactionsPromise,
    balancePromise,
  ]);

  const transactions = [
    ...toTransactions.transfers,
    ...fromTransactions.transfers,
  ];
  return {
    props: {
      wallet,
      transactions:
        transactions.sort(
          (a, b) => parseInt(b.blockNum) - parseInt(a.blockNum)
        ) || [],
      balance: balance?.toString() || 0,
    },
  };
};
