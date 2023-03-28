import { alchemy } from "@/configs/alchemy.config";
import { useEffect, useState } from "react";

export default function Home() {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }

    getBlockNumber();
  });
  return (
    <>
      <div className="App">Block Number: {blockNumber}</div>;
    </>
  );
}
