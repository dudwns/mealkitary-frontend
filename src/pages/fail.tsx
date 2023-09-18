import { messageState } from '@/libs/recoilState';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';

export default function FailPage() {
  const { query } = useRouter();
  const [message, setMessage] = useRecoilState(messageState);

  return (
    <main style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h1>결제 실패</h1>
      <p>이유: {query.message ?? message.title}</p>
    </main>
  );
}
