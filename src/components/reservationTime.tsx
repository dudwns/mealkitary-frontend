interface times {
  time: string;
}

export default function RerservationTime({ time }: times) {
  return (
    <span className="bg-slate-400 rounded-md p-2 text-center">{time}</span>
  );
}
