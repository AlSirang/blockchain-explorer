import Head from "next/head";
import Header from "@/components/header";

export default function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>Block Explorer</title>
        <meta name="description" content="AU Module 3 project" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <main className="max-w-[1700px] w-full m-auto">{children}</main>
    </>
  );
}
