import { alchemy } from "@/configs/alchemy.config";
import Overview from "@/components/home/overview";
import Search from "@/components/home/search";
import LatestBlocks from "@/components/home/latest-blocks";
import { LatestTxns } from "@/components/home/latest-txns";

export default function Home({ blocks, latestTxns }) {
  return (
    <>
      <Search />
      <Overview />
      <section className="max-w-7xl m-auto px-5 md:px-0">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="col-span-6">
            <LatestBlocks blocks={blocks} />
          </div>

          <div className="col-span-6">
            {<LatestTxns latestTxns={latestTxns} />}
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async () => {
  const blocks = [];
  let latestTxns = [];

  try {
    const latestBlock = await alchemy.core.getBlockNumber();
    const latestBlockInfo = await alchemy.core.getBlock(latestBlock);
    latestTxns = latestBlockInfo.transactions;

    for (let i = 0; i < 6; i++) {
      blocks.push(latestBlock - i);
    }
    blocks;
  } catch (err) {}

  return {
    props: {
      blocks,
      latestTxns,
    },
  };
};
