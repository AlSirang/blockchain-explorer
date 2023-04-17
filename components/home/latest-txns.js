import { timeAgo } from "@/utils/time";
import {
  getShortenAddress,
  getShortenAddressEnd,
} from "@/utils/get-shorten-address";
import { SvgPaperIcon } from "@/icons";
import { PageLink } from "../page-link";

export const LatestTxns = ({ latestTransactions = [] }) => {
  return (
    <section className="bg-white rounded-lg drop-shadow-sm border border-stone-300 overflow-hidden">
      <div className="pt-3">
        <div className="border-b">
          <div className="px-5 mb-2">
            <h2 className="font-medium">Latest Transactions</h2>
          </div>
        </div>

        <div>
          {latestTransactions.map((transaction) => (
            <TxnInfo key={transaction.transactionHash} {...transaction} />
          ))}
        </div>

        <div className="bg-slate-50">
          <div className="px-5">
            <div className="flex justify-center py-2">
              <button className="uppercase text-[0.95rem] text-cgray-100">
                View all transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const TxnInfo = ({ to, from, transactionHash, agoTimestamp }) => {
  return (
    <div className="py-5 border-b min-h-[100px]">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-3 md:gap-10">
        <div className="flex items-center gap-2 md:inline-block w-full md:w-[40%] pl-10">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 p-3 rounded-md">
              <SvgPaperIcon />
            </span>
            <div>
              <PageLink href={`/tx/${transactionHash}`}>
                <h4>{getShortenAddressEnd(transactionHash)}</h4>
              </PageLink>
              <p className="text-sm text-[#6c757d]">{agoTimestamp} ago</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] pl-10 md:pl-0">
          <h4>
            From&nbsp;
            <PageLink href={`/account/${from}`}>
              {getShortenAddress(from)}
            </PageLink>
          </h4>
          <h4>
            To&nbsp;
            <PageLink href={`/account/${to}`}>{getShortenAddress(to)}</PageLink>
          </h4>
        </div>
      </div>
    </div>
  );
};
