import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen ">
      <Link href={'/reservation'}>
        <button className="bg-blue-500 w-24 py-3 border border-black">예약하기</button>
      </Link>
    </div>
  );
}
