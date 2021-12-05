import { useElement } from '../../../modules/element';
import { ElementBox } from '../elementBox';

export function ElementListComponent() {
  const { elements } = useElement();

  return (
    <div className="mt-10 max-w-7xl mx-auto min-h-full">
      {elements.map((data) => (
        <ElementBox key={data.id} {...data} />
      ))}
    </div>
  );
}
