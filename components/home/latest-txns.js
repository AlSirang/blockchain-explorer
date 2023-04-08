import { useEffect, useState } from "react";
import { timeAgo } from "@/utils/time";
import {
  getShortenAddress,
  getShortenAddressEnd,
} from "@/utils/get-shorten-address";
import { SvgPaperIcon } from "@/icons";
import { alchemy } from "@/configs/alchemy.config";
import { PageLink } from "../page-link";

export const LatestTxns = ({ latestBlockInfo = {} }) => {
  const [firstSixTxns, setFirstSixTxns] = useState([]);

  const { transactions, timestamp } = latestBlockInfo;

  useEffect(() => {
    if (transactions?.length) {
      const txnsCount = transactions.length;
      const endIndex = txnsCount > 6 ? 6 : txnsCount;
      const txns = [];
      for (let i = 0; i < endIndex; i++) {
        txns.push(transactions[i]);
      }
      setFirstSixTxns(txns);
    }
  }, [transactions]);

  return (
    <section className="bg-white rounded-md drop-shadow-sm border border-stone-300 overflow-hidden">
      <div className="pt-3">
        <div className="border-b">
          <div className="px-5 mb-2">
            <h2 className="font-medium">Latest Transactions</h2>
          </div>
        </div>

        <div>
          {firstSixTxns.map((txn) => (
            <TxnInfo key={txn} txn={txn} timestamp={timestamp} />
          ))}
        </div>

        <div className="bg-slate-50">
          <div className="px-5">
            <div className="flex justify-center py-2">
              <button className="uppercase">View all transactions </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TxnInfo = ({ txn, timestamp }) => {
  const [txInfo, setTxInfo] = useState({});

  useEffect(() => {
    const getTxInfo = async () => {
      try {
        const txInfo = await alchemy.core.getTransactionReceipt(txn);
        setTxInfo(txInfo);
      } catch (err) {}
    };

    txn && getTxInfo();
  }, [txn]);
  return (
    <div className="py-5 border-b min-h-[100px]">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-10">
        <div className="flex items-center gap-2 md:inline-block w-full md:w-[40%] pl-10">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 p-3 rounded-md">
              <SvgPaperIcon />
            </span>
            <div>
              <PageLink href={`tx/${txn}`}>
                <h4>{getShortenAddressEnd(txn)}</h4>
              </PageLink>
              <p className="text-sm text-[#6c757d]">{timeAgo(timestamp)} ago</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] pl-10 md:pl-0">
          <h4>
            From&nbsp;
            <PageLink href={`account/${txInfo.from}`}>
              {getShortenAddress(txInfo.from)}
            </PageLink>
          </h4>
          <h4>
            To&nbsp;
            <PageLink href={`account/${txInfo.to}`}>
              {getShortenAddress(txInfo.to)}
            </PageLink>
          </h4>
        </div>
      </div>
    </div>
  );
};
