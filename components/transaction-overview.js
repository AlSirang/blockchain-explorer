import { ethers } from "ethers";
import { PageLink } from "./page-link";

export default function TransactionOverview(props) {
  const {
    to = "",
    from = "",
    gasPrice = 0,
    confirmations = 0,
    gasLimit = 0,
    maxFeePerGas = 0,
    maxPriorityFeePerGas = 0,
    value = 0,
    hash = "",
    blockNumber = 0,
    nonce = 0,
    data = "0x",
    gasUsed = 0,
    status = null,
    transactionIndex = 0,
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
                    <span className="border border-green-700 bg-green-50 text-green-700 py-[2px] px-2 text-[0.75rem] rounded-md">
                      Success
                    </span>
                  )}
                  {!Boolean(status) && (
                    <span className="border border-red-500 bg-red-50 text-red-500 py-[2px] px-2 text-[0.75rem] rounded-md">
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
                  <PageLink href={`/block/${blockNumber}`}>
                    {blockNumber}
                  </PageLink>
                </p>
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Confirmation:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">
                  <span className="border border-cgray-100-500 bg-gray-50  py-[2px] px-2 text-[0.75rem] rounded-md">
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
                <Value value={value} />
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Transaction Fee:
                </p>
                <TransactionFee gasPrice={gasPrice} gasUsed={gasUsed} />
              </div>
              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <GasPrice gasPrice={gasPrice} />
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
                  <GasFees
                    maxFeePerGas={maxFeePerGas}
                    maxPriorityFeePerGas={maxPriorityFeePerGas}
                  />
                </p>
              </div>

              <hr />

              <div className="grid grid-cols-12 md:gap-3 gap-1">
                <p className="text-cgray-100 col-span-12 md:col-span-3">
                  Other Attributes:
                </p>
                <p className="col-span-12 md:col-span-9 text-[15px]">
                  <span className="inline-flex gap-2">
                    <span className="border border-cgray-100-500 bg-gray-50  py-[2px] px-2 text-[0.75rem] rounded-md">
                      Nonce: {nonce}
                    </span>
                    <span className="border border-cgray-100-500 bg-gray-50  py-[2px] px-2 text-[0.75rem] rounded-md">
                      Position In Block: {transactionIndex}
                    </span>
                  </span>
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
                    rows="4"
                    className="w-full border rounded-md p-2 focus:outline-0 bg-cwhite-100"
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

const TransactionFee = ({ gasPrice, gasUsed }) => {
  const transactionFeeWei = (gasPrice * gasUsed).toString();
  const transactionFeeETH = ethers.utils.formatEther(transactionFeeWei);
  return (
    <p className="col-span-12 md:col-span-9 text-[15px] break-words">
      {transactionFeeETH} ETH
    </p>
  );
};

const Value = ({ value }) => {
  const valueInETH = ethers.utils.formatEther(value.toString());
  return (
    <p className="col-span-12 md:col-span-9 text-[15px] break-words">
      {valueInETH} ETH
    </p>
  );
};

const GasPrice = ({ gasPrice }) => {
  const gasPriceInGwei = ethers.utils.formatUnits(gasPrice, "gwei");
  const gasPriceInETH = ethers.utils.formatUnits(gasPrice);
  return (
    <>
      <p className="text-cgray-100 col-span-12 md:col-span-3">Gas Price:</p>
      <p className="col-span-12 md:col-span-9 text-[15px] inline-flex gap-2">
        <span>{gasPriceInGwei} Gwei</span>
        <span className="text-cgray-100">({gasPriceInETH} ETH)</span>
      </p>
    </>
  );
};

const GasFees = ({ maxFeePerGas, maxPriorityFeePerGas }) => {
  const maxFeePerGasGwei = ethers.utils.formatUnits(maxFeePerGas, "gwei");
  const maxPriorityFeePerGasGwei = ethers.utils.formatUnits(
    maxPriorityFeePerGas,
    "gwei"
  );
  return (
    <>
      <span className="inline-flex gap-2">
        <span className="md:pr-3 md:border-r-2">
          Max: {maxFeePerGasGwei} Gwei
        </span>
        <span>Max Priority: {maxPriorityFeePerGasGwei} Gwei</span>
      </span>
    </>
  );
};
