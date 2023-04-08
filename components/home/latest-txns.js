import { useEffect, useState } from "react";
import { timeAgo } from "@/utils/time";
import {
  getShortenAddress,
  getShortenAddressEnd,
} from "@/utils/get-shorten-address";
import { SvgPaperIcon } from "@/icons";
import { alchemy } from "@/configs/alchemy.config";

export const LatestTxns = ({ latestTxns = [] }) => {
  const [firstSixTxns, setFirstSixTxns] = useState([]);

  useEffect(() => {
    const txnsCount = latestTxns.length;
    const endIndex = txnsCount > 6 ? 6 : txnsCount;
    const txns = [];
    for (let i = 0; i < endIndex; i++) {
      txns.push(latestTxns[i]);
    }

    setFirstSixTxns(txns);
  }, [latestTxns]);

  console.log({ firstSixTxns });
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
            <TxnInfo key={txn} txn={txn} />
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

const TxnInfo = ({ txn }) => {
  const [txInfo, setTxInfo] = useState({});

  useEffect(() => {
    const getTxInfo = async () => {
      try {
        const txInfo = await alchemy.core.getTransactionReceipt(txn);
        console.log(txInfo);

        setTxInfo(txInfo);
      } catch (err) {}
    };

    txn && getTxInfo();
  }, [txn]);
  return (
    <div className="py-5 border-b min-h-[100px]">
      <div className="flex flex-wrap md:flex-nowrap items-center">
        <div className="w-full md:w-[40%] pl-10">
          <div className="flex items-center gap-1">
            <span className="bg-gray-100 p-2 rounded-md">
              <SvgPaperIcon />
            </span>
            <h4>{getShortenAddressEnd(txn)}</h4>
          </div>

          <p>{timeAgo(txInfo.timestamp)} ago</p>
        </div>
        <div className="w-full md:w-[60%]">
          <h4>From {getShortenAddress(txInfo.from)}</h4>
          <h4>To {getShortenAddress(txInfo.to)}</h4>
        </div>
      </div>
    </div>
  );
};
