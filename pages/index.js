import Overview from "@/components/home/overview";
import Search from "@/components/home/search";
import LatestBlocks from "@/components/home/latest-blocks";
import { LatestTxns } from "@/components/home/latest-txns";
import { getLatestBlocks } from "@/alchemy-core/get-latest-blocks";
import { getLatestTransactions } from "@/alchemy-core/get-latest-transactions";
import { getETHPrice } from "@/alchemy-core/get-eth-price";
import { getMarketCap } from "@/alchemy-core/get-market-cap";

export default function Home({
  blocksInfo,
  latestTransactions,
  ethPrice,
  marketCap,
}) {
  return (
    <>
      <Search />
      <Overview ethPrice={ethPrice} marketCap={marketCap} />
      <section className="max-w-7xl m-auto px-5">
        <div className="grid gap-3 md:grid-cols-12">
          <div className="col-span-6">
            <LatestBlocks blocksInfo={blocksInfo} />
          </div>

          <div className="col-span-6">
            {<LatestTxns latestTransactions={latestTransactions} />}
          </div>
        </div>
      </section>
    </>
  );
}

export const getServerSideProps = async () => {
  let blocksInfo = [];
  let latestTransactions = [];
  let ethPrice = 0;
  let marketCap = 0;

  try {
    [blocksInfo, latestTransactions, ethPrice, marketCap] = await Promise.all([
      getLatestBlocks(),
      getLatestTransactions(),
      getETHPrice(),
      getMarketCap(),
    ]);
  } catch (err) {
    console.log({ err });
  }

  return {
    props: {
      blocksInfo,
      latestTransactions,
      ethPrice,
      marketCap,
    },
  };
};
