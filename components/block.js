import { PageLink } from "./page-link";

export const Block = ({
  baseFeePerGas,
  difficulty,
  gasUsed,
  gasLimit,
  hash,
  miner,
  nonce,
  number,
  parentHash,
  transactions,
  timestamp,
}) => {
  const gasUsedPercent = ((gasUsed / gasLimit) * 100).toFixed(2);

  let gasTarget = (100 - (gasUsed / 15000000) * 100).toFixed(2);
  gasTarget = gasTarget <= 0 ? 100 : -gasTarget;
  return (
    <section className="max-w-7xl m-auto px-5">
      <div className="border-b py-5 pt-4">
        <h2 className="flex gap-2 items-center">
          <span className="font-medium text-xl">Block</span>{" "}
          <span className="text-cgray-100 font-normal text-base">
            #{number}
          </span>
        </h2>
      </div>
      <div>
        <div className="mt-6">
          <div className="mb-4">
            <span className="bg-[#0784c3] text-sm text-white px-2 py-[6px] rounded-md">
              Overview
            </span>
          </div>
          <div className="bg-white rounded-lg drop-shadow overflow-hidden">
            <div className="py-8 px-6 grid gap-3">
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Block Height:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px]">
                  {number}
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Status:
                </p>
                <p className="col-span-12 md:col-span-10">
                  <span className="border border-green-700 bg-green-50 text-green-700 py-[2px] px-2 text-[15px] rounded-md">
                    Finalized
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Timestamp:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px]">
                  {timestamp}
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Transactions:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px]">
                  <PageLink href={`/tx?block=${number}`}>
                    {transactions?.length} transactions
                  </PageLink>
                  &nbsp;in this block
                </p>
              </div>

              <hr />
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Fee Recipient:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px] break-words">
                  <PageLink href={`/account/${miner}`}>{miner}</PageLink>{" "}
                  <span className="text-sm">in 12 secs</span>
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Hash:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px] break-words">
                  {hash}
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Parent Hash:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px] break-words">
                  <PageLink href={`/block/${parentHash}`}>
                    {parentHash}
                  </PageLink>
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Nonce:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px]">
                  {nonce}
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Total Difficulty:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px]">
                  {difficulty}
                </p>
              </div>

              <hr />

              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Gas Used:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px]">
                  {gasUsed}&nbsp;
                  <span className="text-cgray-100">({gasUsedPercent})%</span>
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Gas Target:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px]">
                  <span className="text-cgray-100">{gasTarget}%</span>
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  {" "}
                  Gas Limit:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px]">
                  {gasLimit}
                </p>
              </div>

              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-2">
                  Base Fee Per Gas:
                </p>
                <p className="col-span-12 md:col-span-10 text-[15px]">
                  {baseFeePerGas}
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm mt-4 text-cgray-100">
          Blocks are batches of transactions linked via cryptographic hashes.
          Any tampering of a block would invalidate all following blocks as all
          subsequent hashes would change.
        </p>
      </div>
    </section>
  );
};
