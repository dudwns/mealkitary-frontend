import { useRouter } from "next/router";

interface NavProps {
  backBtn?: boolean;
  title?: string;
  children: React.ReactNode;
}

export default function Nav({ backBtn, title, children }: NavProps) {
  const router = useRouter();
  return (
    <>
      <div className="font-bold text-2xl bg-white w-full h-14 max-w-xl fixed left-0 right-0 mx-auto top-0 text-gray-800 flex justify-center items-center z-20 border-b-2 border-gray-300 shadow-md">
        {children}
        {backBtn ? (
          <button className="absolute left-4" onClick={() => router.back()}>
            <svg
              className="w-6 h-6 text-blue-500"
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
        ) : null}
      </div>
    </>
  );
}
