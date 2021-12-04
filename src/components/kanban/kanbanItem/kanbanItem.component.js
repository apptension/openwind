import { format } from 'date-fns';
import { Label } from './label';

export const KanbanItemComponent = ({ item }) => {
  return (
    <a href={item.url}>
      <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 border-2">
        <div className="flex">
          {item.labels.map((label) => (
            <Label label={label} key={label.id} />
          ))}
        </div>
        <h4 className="mt-3 text-sm font-bold">{item.title}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">{format(new Date(item.created_at), 'dd.MM.yy')}</span>
          </div>
          <div className="relative flex items-center ml-4">
            <svg
              className="relative w-4 h-4 text-gray-300 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                clipRule="evenodd"
              />
            </svg>
            <span className="ml-1 leading-none">{item.comments}</span>
          </div>
          <img className="w-6 h-6 ml-auto rounded-full" src={item.user.avatar_url} />
        </div>
      </div>
    </a>
  );
};
