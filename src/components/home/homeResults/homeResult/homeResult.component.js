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
        <div className="bg-blue-500 text-white relative rounded h-60 flex justify-center items-center">
          {label}
          <div className="absolute bottom-2 right-2">{count}</div>
        </div>
      </a>
    </Link>
  );
}
