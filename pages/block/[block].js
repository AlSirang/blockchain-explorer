import { useEffect } from "react";
import { useRouter } from "next/router";
import { Block } from "@/components/block";
import { getBlockInfo } from "@/alchemy-core/get-block-info";

export default function Index({ blockInfo, error }) {
  const router = useRouter();

  useEffect(() => {
    if (error) router.push("/error");
  }, [error, router]);

  return <Block {...blockInfo} />;
}

export const getServerSideProps = async (context) => {
  const { block } = context.query;
  let blockInfo = {};
  let error = null;

  try {
    blockInfo = await getBlockInfo(block);
  } catch (err) {
    error = err.body || err.message || err;
  }

  return {
    props: {
      blockInfo,
      error,
    },
  };
};
