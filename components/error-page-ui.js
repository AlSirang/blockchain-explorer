import Link from "next/link";

export default function ErrorUI() {
  return (
    <section
      style={{
        backgroundImage: "url('/images/error.svg')",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center center",
      }}
      className="min-h-[60vh] w-full"
    >
      <div className="max-w-7xl m-auto px-5">
        <div className="pt-[10%]">
          <h2 className="text-4xl text-cgray-100 mb-4">
            Sorry! We encountered an unexpected error.
          </h2>
          <p className="text-cgray-100 text-sm leading-6">
            An unexpected error occurred.
            <br />
            Please check back later
          </p>
          <div className="mt-10">
            <Link
              href="/"
              className="py-[9px] px-4 text-sm text-white bg-[#0784c3] rounded-md"
            >
              Back Home
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
