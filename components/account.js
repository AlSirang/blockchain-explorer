import { useEffect, useReducer } from "react";
import { ethers } from "ethers";
import { PageLink } from "./page-link";
import {
  getShortenAddress,
  getShortenAddressEnd,
} from "@/utils/get-shorten-address";

const PAGE_SIZE = 25;

export const Account = ({ wallet, transactions, balance }) => {
  const [{ page, currentPage, totalPages }, dispatch] = useReducer(
    (state, payload) => ({ ...state, ...payload }),
    { page: [], currentPage: 0, totalPages: 0 }
  );

  // pagination previous
  const onPrevious = () => {
    const newPage = currentPage - 1;

    if (newPage < 0) return;

    const page = transactions.slice(
      newPage * PAGE_SIZE,
      newPage * PAGE_SIZE + PAGE_SIZE
    );

    dispatch({
      page,
      currentPage: newPage,
    });
  };

  // pagination next
  const onNext = () => {
    const newPage = currentPage + 1;

    if (newPage > totalPages) return;

    const page = transactions.slice(
      newPage * PAGE_SIZE,
      newPage * PAGE_SIZE + PAGE_SIZE
    );

    dispatch({
      page,
      currentPage: newPage,
    });
  };

  useEffect(() => {
    if (transactions.length) {
      const totalPages = Math.floor(transactions.length / PAGE_SIZE);
      const page = transactions.slice(
        currentPage,
        (currentPage + 1) * PAGE_SIZE
      );

      dispatch({
        totalPages,
        page,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      <div className="bg-white rounded-lg drop-shadow py-3 px-6 overflow-x-scroll md:overflow-hidden">
        <div className="pb-3 pt-2 flex justify-between md:flex-nowrap flex-wrap gap-2">
          <p>A total of {transactions.length} transactions found</p>

          <div className="border inline-block rounded-md overflow-hidden">
            <button onClick={onPrevious} className=" p-2 py-1 hover:bg-gray-50">
              &lt;
            </button>
            <span className="border-x p-2 py-1 h-[10px] cursor-default text-[0.95rem]">
              {currentPage + 1} of {totalPages + 1}
            </span>
            <button onClick={onNext} className="p-2 py-1 hover:bg-gray-50">
              &gt;
            </button>
          </div>
        </div>
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
            {page.map((transaction) => (
              <tr className="border-b" key={transaction.hash}>
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

        <div className="flex justify-end mt-5">
          <div className="border inline-block rounded-md overflow-hidden">
            <button onClick={onPrevious} className=" p-2 py-1 hover:bg-gray-50">
              &lt;
            </button>
            <span className="border-x p-2 py-1 h-[10px] cursor-default text-[0.95rem]">
              {currentPage + 1} of {totalPages}
            </span>
            <button onClick={onNext} className="p-2 py-1 hover:bg-gray-50">
              &gt;
            </button>
          </div>
        </div>
      </div>
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
