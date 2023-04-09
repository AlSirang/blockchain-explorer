export default function Search() {
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

        <form className="bg-white md:max-w-[50%] py-1 px-3 pl-2 mt-1 rounded-md">
          <span className="flex gap-2">
            <select
              name="filter"
              className="bg-transparent outline-0 active:shadow-inner p-1 py-2 rounded-md hidden md:inline-block"
            >
              <option value="0">All Filters</option>
              <option value="1">Addresses</option>
              <option value="2">Tokens</option>
              <option value="3">Name Tags</option>
              <option value="4">Labels</option>
              <option value="5">Websites</option>
            </select>

            <input
              placeholder="Search by Address / Txn Hash / Block / Token / Domain Name"
              className="pl-1 md:pl-3 py-2 rounded-md outline-0 w-full focus:outline-2 outline-slate-100 text-slate-600 placeholder:text-slate-600"
            />
          </span>
        </form>
      </div>
    </section>
  );
}
