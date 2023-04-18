import { getHashType } from "@/alchemy-core/get-hash-type";
import { SvgSearchIcon } from "@/icons";
import { ethers } from "ethers";
import { useRouter } from "next/router";

export default function Search() {
  const router = useRouter();

  const queryInput = async (event) => {
    event.preventDefault();

    try {
      const data = new FormData(event.target);
      const query = data.get("query");

      if (ethers.utils.isAddress(query))
        return router.push(`/account/${query}`);

      if (ethers.utils.isHexString(query, 32)) {
        const type = await getHashType(query);

        if (type === "transaction") return router.push(`/tx/${query}`);
        if (type === "block") return router.push(`/block/${query}`);
      }

      if (!query.startsWith("0x") && Number(query))
        return router.push(`/block/${query}`);
    } catch (err) {}

    router.push("/error");
  };
  return (
    <section
      style={{
        backgroundImage: "url('/images/search-bg.svg')",
      }}
      className="min-h-[300px] bg-cblue-100"
    >
      <div className="max-w-7xl m-auto pt-16 px-5">
        <h1 className="text-white text-[1.5rem] mb-1">
          The Ethereum Blockchain Explorer
        </h1>

        <form
          className="bg-white md:max-w-[50%] py-1 px-3 pl-2 mt-1 rounded-md"
          onSubmit={queryInput}
        >
          <span className="flex gap-2">
            <input
              autoComplete="off"
              name="query"
              placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
              className="pl-1 md:pl-3 py-2 rounded-md outline-0 w-full focus:outline-2 outline-slate-100 text-slate-600 placeholder:text-slate-600"
            />
            <button className="flex items-center" type="submit">
              <SvgSearchIcon />
            </button>
          </span>
        </form>
      </div>
    </section>
  );
}
