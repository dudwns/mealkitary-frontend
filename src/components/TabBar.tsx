interface TabBarProps {
  text?: string;
  contain?: boolean;
  [key: string]: any;
}

const TabBar = ({
  text,
  contain,
  onClick,
  price,
  count,
  disable = false,
}: TabBarProps) => {
  return (
    <div className="fixed bottom-0 flex items-center justify-between w-full max-w-xl px-10 py-3 text-white bg-white border-t-4 border-gray-200">
      <button
        className="flex items-center justify-around w-full py-2 bg-blue-600 rounded-lg hover:bg-blue-700 "
        onClick={onClick}
        disabled={disable}>
        {contain ? (
          <>
            <div className="flex items-center justify-center w-6 h-6 text-sm text-black bg-white rounded-full">
              {count}
            </div>
            <div className="flex items-center text-xl">{text}</div>
            <div className="flex items-center text-md">
              총 {price.toLocaleString()}원
            </div>
          </>
        ) : (
          <div className="flex items-center text-xl">{text}</div>
        )}
      </button>
    </div>
  );
};

export default TabBar;
