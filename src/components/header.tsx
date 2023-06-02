import { useRouter } from "next/router";

interface HeaderProps {
  title: string;
}
export default function Header({ title }: HeaderProps) {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex relative justify-center items-center">
        <h3 className="font-bold text-2xl">{title}</h3>
      </div>
      <button
        className="absolute top-2 left-2 z-10"
        onClick={() => router.back()}
      >
        <svg
          className="w-6 h-6 text-blue-700 fixed z-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>
    </>
  );
}
