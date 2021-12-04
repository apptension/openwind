import { HomeResult } from '../homeResult';

export function HomeCategoryComponent({ category, items }) {
  const renderItem = ({ type, count }) => <HomeResult type={type} count={count} />;
  return (
    <div className="mt-8">
      <h3 className="text-xl uppercase  mb-2">{category}</h3>
      <div className="grid gap-8 grid-cols-4">{items.map(renderItem)}</div>
    </div>
  );
}
