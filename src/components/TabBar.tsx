interface TabBarProps {
  text?: string;
  contain?: boolean;
  [key: string]: any;
}

export default function TabBar({ text, contain, onClick, price, count, disable = false }: TabBarProps) {
  return (
    <div className="bg-white max-w-xl text-white border-t-4 border-gray-200  fixed bottom-0 w-full px-10 py-3 flex justify-between items-center">
      <button
        className="bg-blue-600 w-full py-2 rounded-lg flex items-center justify-around hover:bg-blue-700 "
        onClick={onClick}
        disabled={disable}
      >
        {contain ? (
          <>
            <div className="bg-white text-black w-6 h-6 rounded-full text-sm flex justify-center items-center">
              {count}
            </div>
            <div className="text-xl flex items-center">{text}</div>
            <div className="text-md flex items-center">총 {price.toLocaleString()}원</div>
          </>
        ) : (
          <div className="text-xl flex items-center">{text}</div>
        )}
      </button>
    </div>
  );
}
