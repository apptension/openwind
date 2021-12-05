import { useEffect } from 'react';
import { totalReactions } from '../../../modules/element/element.api';

export function HomeTopComponent() {
  useEffect(() => {
    const func = async () => totalReactions();
    func();
  }, []);
  return (
    <div className="mt-10 max-w-7xl mx-auto">
      <h2 className="text-3xl">Users pick</h2>
    </div>
  );
}
