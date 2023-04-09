import NextLink from "next/link";
import { EtherscanIcon } from "@/icons";

export default function Header() {
  return (
    <header className="py-2 bg-white shadow border-b">
      <div className="max-w-7xl px-5 flex justify-between items-center m-auto w-full ">
        <span>
          <NextLink href="/">
            <EtherscanIcon className="max-w-[150px] max-h-[40px]" />
          </NextLink>
        </span>

        <div>Home</div>
      </div>
    </header>
  );
}
