import clsx from 'clsx';
import Link from 'next/link';
import { ROUTES } from '../../../../utils/routes';

export function HomeResultComponent({ url, count, label }) {
  return (
    <Link href={ROUTES.element(url)}>
      <a
        className={clsx({
          'cursor-not-allowed opacity-80 pointer-events-none': count === 0,
          'cursor-pointer': count > 0,
        })}
      >
        <div className="bg-blue-500 overflow-hidden text-white relative rounded h-60 flex justify-center items-center">
          <span className="text-xl font-bold">{label}</span>
          <div className="absolute bg-gray-800 bottom-0 right-0 left-0 h-10 flex justify-center items-center">
            <span>Components: {count}</span>
          </div>
        </div>
      </a>
    </Link>
  );
}
