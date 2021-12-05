import { format } from 'date-fns';
import Image from 'next/image';
import { Label } from './label';
import { isEmpty } from 'ramda';
import { ThumbUpIcon, ChatAltIcon, CalendarIcon } from '@heroicons/react/solid';

export const KanbanItemComponent = ({ item }) => {
  return (
    <a href={item.html_url} target="_blank" rel="noreferrer">
      <div className="relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100 border-2">
        <div className="flex">
          {item.labels.map((label) => (
            <Label label={label} key={label.id} />
          ))}
        </div>
        <h4 className="mt-3 text-sm font-bold">{item.title}</h4>
        <div className="flex items-center w-full mt-3 text-xs font-medium text-gray-400">
          <div className="relative flex items-end">
            <CalendarIcon className="h-4 w-4 text-gray-300" aria-hidden="true" />
            <span className="ml-1 leading-none">{format(new Date(item.created_at), 'dd.MM.yy')}</span>
          </div>
          <div className="relative flex items-end ml-4">
            <ChatAltIcon className="h-4 w-4 text-gray-300" aria-hidden="true" />
            <span className="ml-1 leading-none">{item.comments}</span>
          </div>
          <div className="relative flex items-end ml-4 fill-current">
            <ThumbUpIcon className="h-4 w-4 text-gray-300" aria-hidden="true" />
            <span className="ml-1 leading-none">{item.reactions.total_count}</span>
          </div>

          <div className="ml-auto flex">
            {isEmpty(item.assignees) ? (
              <a href={item.user.html_url} target="_blank" rel="noreferrer">
                <Image width={24} height={24} alt="User's avatar" className="rounded-full" src={item.user.avatar_url} />
              </a>
            ) : (
              item.assignees.map((assignee) => (
                <a href={assignee.html_url} target="_blank" rel="noreferrer" key={assignee.id} className="ml-1">
                  <Image
                    width={24}
                    height={24}
                    alt="User's avatar"
                    className="rounded-full"
                    src={assignee.avatar_url}
                  />
                </a>
              ))
            )}
          </div>
        </div>
      </div>
    </a>
  );
};
