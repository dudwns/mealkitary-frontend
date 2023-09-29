import Link from 'next/link';

const Home = () => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <Link href={'/reservation'}>
        <button className="w-24 py-3 bg-blue-500 border border-black">
          예약하기
        </button>
      </Link>
    </div>
  );
};

export default Home;
