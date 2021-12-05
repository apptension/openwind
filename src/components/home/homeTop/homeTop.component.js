import { useHome } from '../../../modules/home/home.hook';
import { ElementBox } from '../../element/elementBox';

export function HomeTopComponent() {
  const { topElement } = useHome();
  if (!topElement) {
    return null;
  }
  return (
    <div className="mt-10 max-w-7xl mx-auto">
      <h2 className="text-3xl mb-4">Users pick 🦄</h2>
      <ElementBox {...topElement} showReactions={false} />
    </div>
  );
}
