import { ethers } from "ethers";
import { PageLink } from "./page-link";
import {
  getShortenAddress,
  getShortenAddressEnd,
} from "@/utils/get-shorten-address";

export const Account = ({ wallet, transactions, balance }) => {
  return (
    <section className="max-w-7xl m-auto px-5">
      <div className="border-b py-5 pt-4">
        <h2 className="flex gap-2 items-center">
          <span className="font-medium text-xl">
            Address&nbsp;
            <span className="text-[0.95rem] font-normal">{wallet}</span>
          </span>
        </h2>
      </div>
      <div className="mt-[4rem] mb-10">
        <div className="grid grid-cols-12 gap-3">
          <div className="col-span-12 md:col-span-5">
            <div className="bg-white rounded-lg drop-shadow py-3 px-6">
              <BalanceOverview balance={balance} />
            </div>
          </div>
          <div className="col-span-12 md:col-span-7"></div>
        </div>
      </div>
      <div className="mb-4">
        <span className="bg-[#0784c3] text-sm text-white px-2 py-[6px] rounded-md">
          Transactions
        </span>
      </div>

      <TransactionsOverview transactions={transactions} />
    </section>
  );
};

export const BalanceOverview = ({ balance }) => {
  const balanceETH = ethers.utils.formatEther(balance);
  return (
    <div className="grid gap-5">
      <h3>Overview</h3>

      <div>
        <h4 className="text-cgray-100 ">ETH Balance</h4>
        <p>{balanceETH} ETH</p>
      </div>
      <div>
        <h4 className="text-cgray-100 ">ETH Value</h4>
        <p>0.0003 ETH</p>
      </div>
    </div>
  );
};

const TransactionsOverview = ({ transactions = [] }) => {
  console.log(transactions);
  const toDisplay = transactions.slice(0, 25);

  return (
    <div className="bg-white rounded-lg drop-shadow py-3 px-6 overflow-x-scroll md:overflow-hidden">
      <table class="items-center bg-transparent w-full">
        <thead className="border-b">
          <tr>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle py-3 whitespace-nowrap font-semibold text-left">
              Transaction Hash
            </th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle py-3 whitespace-nowrap font-semibold text-left">
              Block
            </th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle py-3 whitespace-nowrap font-semibold text-left">
              From
            </th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle py-3 whitespace-nowrap font-semibold text-left">
              To
            </th>
            <th class="px-6 bg-blueGray-50 text-blueGray-500 align-middle py-3 whitespace-nowrap font-semibold text-left">
              Value
            </th>
          </tr>
        </thead>

        <tbody>
          {toDisplay.map((transaction) => (
            <tr className="border-b last:border-b-0" key={transaction.hash}>
              <td class="border-t-0 px-6 align-middle whitespace-nowrap p-4 text-left text-blueGray-700 ">
                <PageLink href={`/tx/${transaction.hash}`}>
                  {getShortenAddressEnd(transaction.hash, 15)}
                </PageLink>
              </td>
              <td class="border-t-0 px-6 align-middle whitespace-nowrap p-4 ">
                <PageLink href={`/block/${parseInt(transaction.blockNum)}`}>
                  {parseInt(transaction.blockNum)}
                </PageLink>
              </td>
              <td class="border-t-0 px-6 align-center whitespace-nowrap p-4">
                <PageLink href={`/account/${transaction.from}`}>
                  {getShortenAddress(transaction.from, 8)}
                </PageLink>
              </td>
              <td class="border-t-0 px-6 align-middle whitespace-nowrap p-4">
                <PageLink href={`/account/${transaction.to}`}>
                  {getShortenAddress(transaction.to, 8)}
                </PageLink>
              </td>
              <td class="border-t-0 px-6 align-middle whitespace-nowrap p-4">
                {transaction.value.toFixed(8)} ETH
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
