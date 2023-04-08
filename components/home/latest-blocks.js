import { useEffect, useState } from "react";
import { alchemy } from "@/configs/alchemy.config";
import { timeAgo } from "@/utils/time";
import { getShortenAddress } from "@/utils/get-shorten-address";
import { SvgBlockIcon } from "@/icons";
import { PageLink } from "../page-link";

export default function LatestBlocks({ blocks = [] }) {
  return (
    <section className="bg-white rounded-md drop-shadow-sm border border-stone-300 overflow-hidden">
      <div className="pt-3">
        <div className="border-b">
          <div className="px-5 mb-2">
            <h2 className="font-medium">Latest Blocks</h2>
          </div>
        </div>

        <div>
          {blocks.map((block) => (
            <BlockInfo key={block} block={block} />
          ))}
        </div>

        <div className="bg-slate-50">
          <div className="px-5">
            <div className="flex justify-center py-2">
              <button className="uppercase">View all blocks</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const BlockInfo = ({ block }) => {
  const [blockInfo, setBlockInfo] = useState({});
  useEffect(() => {
    const getBlockInfo = async () => {
      try {
        const blockInfo = await alchemy.core.getBlock(block);
        setBlockInfo(blockInfo);
      } catch (err) {}
    };

    block && getBlockInfo();
  }, [block]);
  return (
    <div className="py-5 border-b min-h-[100px]">
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2">
        <div className="flex items-center gap-2 md:inline-block w-full md:w-[40%] pl-10">
          <div className="flex items-center gap-2">
            <span className="bg-gray-100 p-3 rounded-md">
              <SvgBlockIcon />
            </span>
            <div>
              <PageLink href={`block/${blockInfo.number}`}>
                <h4>{blockInfo.number}</h4>
              </PageLink>

              <p className="text-sm text-slate-500">
                {timeAgo(blockInfo.timestamp)} ago
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-[60%] pl-10 md:pl-0">
          <h4>
            Fee Recipient&nbsp;
            <PageLink href={`account/${blockInfo.miner}`}>
              {getShortenAddress(blockInfo.miner)}
            </PageLink>
          </h4>
          <p>
            <PageLink href={`tx?block=${blockInfo.number}`}>
              {blockInfo.transactions && blockInfo.transactions.length}
              &nbsp;txns&nbsp;
            </PageLink>
            <span>in 12 secs</span>
          </p>
        </div>
      </div>
    </div>
  );
};
