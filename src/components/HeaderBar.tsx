import { useRouter } from 'next/router';

interface HeaderBarProps {
  backBtn?: boolean;
  title?: string;
  children: React.ReactNode;
}

const HeaderBar = ({ backBtn, title, children }: HeaderBarProps) => {
  const router = useRouter();
  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-20 flex items-center justify-center w-full h-16 max-w-xl mx-auto text-2xl font-bold text-gray-800 bg-blue-600 border-b-2 border-gray-300 shadow-md">
        {children}
        {backBtn ? (
          <button
            className="absolute z-30 left-4"
            onClick={() => router.back()}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        ) : null}
      </div>
    </>
  );
};

export default HeaderBar;
