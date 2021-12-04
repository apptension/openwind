import { useBoard } from '../../modules/board';
import { useIssueType } from './kanban.hook';
import { KanbanColumn } from './kanbanColumn';
import { KanbanItem } from './kanbanItem';

export const KanbanComponent = () => {
  const { issues, isLoading } = useBoard();
  const [backlogIssues] = useIssueType(issues);

  return (
    <div className="flex flex-col w-screen h-screen overflow-auto text-gray-700">
      <div className="px-10 mt-6">
        <h1 className="text-2xl font-bold">Components Board</h1>
      </div>
      {!isLoading ? (
        <div className="flex flex-grow px-10 mt-4 space-x-6 overflow-auto">
          <KanbanColumn title={'Backlog'} count={backlogIssues ? backlogIssues.length : 0}>
            {backlogIssues && backlogIssues.map((item) => <KanbanItem item={item} key={item.key} />)}
          </KanbanColumn>
          <KanbanColumn title={'In Progress'} count={4}>
            <p>test</p>
          </KanbanColumn>
          <KanbanColumn title={'Review'} count={4}>
            <p>test</p>
          </KanbanColumn>
          <KanbanColumn title={'Done'} count={4}>
            <p>test</p>
          </KanbanColumn>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};
