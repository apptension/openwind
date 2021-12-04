import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { NAV_ROUTES } from './navbar.const';

export function NavbarComponent() {
  const router = useRouter();
  return (
    <nav className="bg-white shadow">
      <div className="flex-1 max-w-7xl mx-auto py-4 flex items-center justify-center sm:items-stretch sm:justify-start">
        <div className="flex-shrink-0 flex items-center">
          <span className="text-black text-3xl">openwind</span>
        </div>
        <div className="ml-6 flex space-x-8">
          {NAV_ROUTES.map(({ route, label }) => (
            <Link key={route} href={route}>
              <a
                className={clsx(
                  {
                    'border-blue-500 text-gray-900': router.pathname === route,
                    'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700':
                      router.pathname !== route,
                  },
                  'inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium'
                )}
              >
                {label}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
