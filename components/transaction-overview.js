import { PageLink } from "./page-link";

export default function TransactionOverview(props) {
  const {
    to,
    from,
    gasPrice,
    confirmations,
    gasLimit,
    maxFeePerGas,
    maxPriorityFeePerGas,
    value,
    hash,
    blockNumber,
    nonce,
    data,
    gasUsed,
    logs,
    logsBloom,
    status,
    cumulativeGasUsed,
    effectiveGasPrice,
  } = props;
  return (
    <section className="max-w-7xl m-auto px-5">
      <div className="border-b py-5 pt-4">
        <h2 className="flex gap-2 items-center">
          <span className="font-medium text-xl">Transaction Details</span>
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
              <div className="grid grid-cols-12 md:gap-y-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Transaction Hash:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">{hash}</p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Status:
                </p>
                <p className="col-span-12 md:col-span-9">
                  {Boolean(status) && (
                    <span className="border border-green-700 bg-green-50 text-green-700 py-[2px] px-2 text-[15px] rounded-md">
                      Success
                    </span>
                  )}
                  {!Boolean(status) && (
                    <span className="border border-red-500 bg-red-50 text-red-500 py-[2px] px-2 text-[15px] rounded-md">
                      Failed
                    </span>
                  )}
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Block:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">
                  {blockNumber}
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Confirmation:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">
                  <span className="border border-cgray-100-500 bg-gray-50  py-[2px] px-2 text-[15px] rounded-md">
                    {confirmations}&nbsp; Block Confirmations
                  </span>
                </p>
              </div>

              <hr />

              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  From:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px] break-words">
                  <PageLink href={`/account/${from}`}>{from}</PageLink>
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">To:</p>
                <p className="col-span-12 md:col-span-9 text-[15px] break-words">
                  <PageLink href={`/account/${to}`}>{to}</PageLink>
                </p>
              </div>
              <hr />

              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Value:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px] break-words">
                  {value}
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Transaction Fee:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px] break-words">
                  {"fee"}
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Gas Price:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">
                  {gasPrice}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg drop-shadow overflow-hidden mt-5">
            <div className="py-8 px-6 grid gap-3">
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Gas Limit & Usage by Txn:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">
                  <span className="inline-flex gap-2">
                    <span className="md:pr-3 md:border-r-2">{gasLimit}</span>
                    <span className="">{gasUsed}</span>
                    <span>({((gasUsed / gasLimit) * 100).toFixed(2)}%)</span>
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Gas Fees:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">
                  <span className="inline-flex gap-2">
                    <span className="md:pr-3 md:border-r-2">
                      Max: {maxFeePerGas}
                    </span>
                    <span>Max Priority: {maxPriorityFeePerGas}</span>
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Burnt & Txn Savings Fees:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">
                  {"gasLimit"}
                </p>
              </div>

              <hr />

              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Other Attributes:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">
                  {"baseFeePerGas"}
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Input Data:
                </p>
                <div className="col-span-12 md:col-span-9 text-[15px]">
                  <textarea
                    value={data}
                    readOnly
                    className="w-full border rounded-md p-2 focus:outline-0"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-sm mt-4 text-cgray-100">
          A transaction is a cryptographically signed instruction that changes
          the blockchain state. Block explorers track the details of all
          transactions in the network.
        </p>
      </div>
    </section>
  );
}
