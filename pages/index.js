import Overview from "@/components/home/overview";
import Search from "@/components/home/search";
import LatestBlocks from "@/components/home/latest-blocks";
import { LatestTxns } from "@/components/home/latest-txns";
import { getLatestBlocks } from "@/alchemy-core/get-latest-blocks";
import { getLatestTransactions } from "@/alchemy-core/get-latest-transactions";

export default function Home({ blocksInfo, latestTransactions }) {
  return (
    <>
      <Search />
      <Overview />
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

  try {
    [blocksInfo, latestTransactions] = await Promise.all([
      getLatestBlocks(),
      getLatestTransactions(),
    ]);
  } catch (err) {
    console.log({ err });
  }

  return {
    props: {
      blocksInfo,
      latestTransactions,
    },
  };
};
