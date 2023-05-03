import {
  SvgEthereumIcon,
  SvgGlobeIcon,
  SvgMeterIcon,
  SvgServerIcon,
} from "@/icons";
import { PageLink } from "../page-link";
import { useEffect, useState } from "react";
import { getFinalizedAndSafeBlock } from "@/alchemy-core/get-finalized-and-safe-block";

export default function Overview({ ethPrice, marketCap }) {
  const [finalizedAndsafeBlocks, setBlocksInfo] = useState({
    finalized: {
      blockNumber: "0000000",
    },
    safe: {
      blockNumber: "0000000",
    },
  });

  useEffect(() => {
    getFinalizedAndSafeBlock()
      .then((res) => {
        setBlocksInfo(res);
      })
      .catch((err) => {});
  }, []);
  return (
    <section className="relative -top-7">
      <div className="max-w-7xl px-5 m-auto">
        <div className="bg-white rounded-lg drop-shadow-sm border border-stone-300">
          <div className="py-3 px-5">
            <div className="grid md:grid-cols-12">
              <div className="col-span-6 md:px-3 md:border-r">
                <div className="border-b py-3 flex gap-3 items-center">
                  <SvgEthereumIcon />

                  <div>
                    <h3 className="text-cgray-100 text-[0.85rem]">
                      ETHER PRICE
                    </h3>
                    <p>${ethPrice?.toLocaleString("en-us")}</p>
                  </div>
                </div>
                <div className="py-3 flex gap-3 items-center">
                  <SvgGlobeIcon />
                  <div>
                    <h3 className="text-cgray-100 text-[0.85rem]">
                      MARKET CAP
                    </h3>
                    <p>${marketCap?.toLocaleString("en-us")}</p>
                  </div>
                </div>
              </div>

              <div className="col-span-6 md:px-3">
                <div className="border-b py-3 flex gap-3 items-center">
                  <SvgServerIcon />
                  <div>
                    <h3 className="text-cgray-100 text-[0.85rem]">
                      LAST SAFE BLOCK
                    </h3>
                    <p>
                      <PageLink
                        href={`/block/${finalizedAndsafeBlocks?.safe?.blockNumber}`}
                      >
                        {finalizedAndsafeBlocks?.safe?.blockNumber}
                      </PageLink>
                    </p>
                  </div>
                </div>
                <div className="py-3 flex gap-3 items-center">
                  <SvgMeterIcon />
                  <div>
                    <h3 className="text-cgray-100 text-[0.85rem]">
                      LAST FINALIZED BLOCK
                    </h3>
                    <p>
                      <PageLink
                        href={`/block/${finalizedAndsafeBlocks?.finalized?.blockNumber}`}
                      >
                        {finalizedAndsafeBlocks?.finalized?.blockNumber}
                      </PageLink>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
