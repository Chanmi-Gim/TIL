export default function HiTime({ params }: { params: { time: string } }) {
  console.log('params', params);
  return <h2>HiTime : {params.time}</h2>;
}
