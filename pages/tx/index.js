import { getBlockTransactions } from "@/alchemy-core/get-block-transactions";
import { PageLink } from "@/components/page-link";
import {
  getShortenAddress,
  getShortenAddressEnd,
} from "@/utils/get-shorten-address";
import { useEffect, useReducer } from "react";

const PAGE_SIZE = 25;

export default function Index({ block, transactions = [] }) {
  transactions = JSON.parse(transactions);

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
            Transactions
            <br />
            <span className="text-[0.95rem] font-normal">
              For Block&nbsp;{block}
            </span>
          </span>
        </h2>
      </div>
      <div className="mt-[4rem] mb-10">
        <div className="bg-white rounded-lg drop-shadow py-3 px-6 overflow-x-scroll md:overflow-hidden">
          <div className="pb-3 pt-2 flex justify-between md:flex-nowrap flex-wrap gap-2">
            <p>A total of {transactions.length} transactions found</p>

            <div className="border inline-block rounded-md overflow-hidden">
              <button
                onClick={onPrevious}
                className=" p-2 py-1 hover:bg-gray-50"
              >
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
                    <PageLink
                      href={`/block/${parseInt(transaction.blockNumber)}`}
                    >
                      {parseInt(transaction.blockNumber)}
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
                </tr>
              ))}
            </tbody>
          </table>

          <div className="flex justify-end mt-5">
            <div className="border inline-block rounded-md overflow-hidden">
              <button
                onClick={onPrevious}
                className=" p-2 py-1 hover:bg-gray-50"
              >
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
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps = async (context) => {
  const { block } = context.query;

  const { transactions } = await getBlockTransactions(block);

  return {
    props: {
      block,

      transactions: JSON.stringify(transactions),
    },
  };
};
