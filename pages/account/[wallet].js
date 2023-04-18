import { Account } from "@/components/account";
import { alchemy } from "@/configs/alchemy.config";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Index({ wallet, transactions, balance, error }) {
  const router = useRouter();

  useEffect(() => {
    if (error) router.push("/error");
  }, [error, router]);

  return (
    <Account wallet={wallet} transactions={transactions} balance={balance} />
  );
}

export const getServerSideProps = async (context) => {
  const { wallet } = context.query;
  let transactions = [];
  let balance = 0;
  let error = false;

  try {
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
    const [toTransactions, fromTransactions, balance_] = await Promise.all([
      toTransactionsPromise,
      fromTransactionsPromise,
      balancePromise,
    ]);

    transactions = [...toTransactions.transfers, ...fromTransactions.transfers];
    balance = balance_;
  } catch (err) {
    error = true;
  }

  return {
    props: {
      error,
      wallet,
      transactions:
        transactions.sort(
          (a, b) => parseInt(b.blockNum) - parseInt(a.blockNum)
        ) || [],
      balance: balance?.toString() || 0,
    },
  };
};
