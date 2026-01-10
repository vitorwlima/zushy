import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return (
    <main className="h-screen p-4 md:p-12 md:pb-6 lg:pb-12 lg:p-24">
      <div className="flex-col flex justify-between h-full max-w-52 mx-auto">
        <div className="flex flex-col">
          <div className="flex flex-col items-center gap-2">
            <h1 className="text-2xl font-semibold flex items-end gap-1 leading-7">
              <Image src="/zushy.png" alt="Zushy" width={40} height={40} />
              Zushy
            </h1>
            <p className="text-xs">Goated chess app and bot.</p>
          </div>

          <div className="flex flex-col gap-4 mt-12">
            <Link
              href="/analysis"
              className="text-sm py-3 px-4 bg-[#6C91AC] rounded-md text-center font-semibold hover:bg-[#587082] transition-colors duration-150"
            >
              Analysis
            </Link>
            <Link
              href="/play"
              className="text-sm py-3 px-4 bg-[#6C91AC] text-center rounded-md font-semibold hover:bg-[#587082] transition-colors duration-150"
            >
              Play vs Zushy
            </Link>
          </div>
        </div>

        <footer className="text-xs text-center">
          Check source code here:{" "}
          <Link
            href="https://github.com/vitorwlima/zushy"
            className="hover:underline text-[#6C91AC]"
            target="_blank"
          >
            GitHub
          </Link>
        </footer>
      </div>
    </main>
  );
};

export default Home;
