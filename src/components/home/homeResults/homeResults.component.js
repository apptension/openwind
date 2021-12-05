import { useHome } from '../../../modules/home';
import { HomeCategory } from './homeCategory';

export function HomeResultsComponent() {
  const { groupedElements } = useHome();

  const renderCategory = (key) => <HomeCategory key={key} category={key} items={groupedElements[key]} />;

  return Object.keys(groupedElements).map(renderCategory);
}
