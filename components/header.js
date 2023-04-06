import NextLink from "next/link";
import { EtherscanIcon } from "@/icons";

export default function Header() {
  return (
    <header className="py-2 px-3 bg-white shadow">
      <div className="max-w-[1700px] flex justify-between items-center m-auto w-full ">
        <div className="max-w-7xl">
          <NextLink href="/">
            <EtherscanIcon className="max-w-[150px] max-h-[40px]" />
          </NextLink>
        </div>

        <div> Home</div>
      </div>
    </header>
  );
}