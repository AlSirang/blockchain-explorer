import { useEffect } from "react";
import { useRouter } from "next/router";
import TransactionOverview from "@/components/transaction-overview";
import { getTransactionInfo } from "@/alchemy-core/get-transaction-info";

export default function Index({ transactionInfo, error }) {
  const router = useRouter();

  useEffect(() => {
    if (error) router.push("/error");
  }, [error, router]);

  return (
    <>
      <TransactionOverview {...transactionInfo} />
    </>
  );
}

export const getServerSideProps = async (context) => {
  const { txnHash } = context.query;
  let data = {};
  try {
    data = await getTransactionInfo(txnHash);
  } catch (err) {
    console.log({ err });
  }

  return {
    props: {
      transactionInfo: data,
    },
  };
};
