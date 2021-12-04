export function HomeResultComponent({ type, count }) {
  return (
    <div className="bg-blue-500 text-white relative rounded h-60 flex justify-center items-center">
      {type}
      <div className="absolute bottom-2 right-2">{count}</div>
    </div>
  );
}
