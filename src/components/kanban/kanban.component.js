import { useBoard } from '../../modules/board';
import { useIssueType } from './kanban.hook';
import { KanbanColumn } from './kanbanColumn';
import { KanbanItem } from './kanbanItem';

export const KanbanComponent = () => {
  const { issues, isLoading } = useBoard();
  const [backlogIssues, inProgressIssues, reviewIssues, doneIssues] = useIssueType(issues);

  return (
    <div
      style={{ maxHeight: 'calc(100vh - 128px)' }}
      className="flex flex-col max-w-7xl mx-auto flex-1 overflow-auto text-gray-700 pb-8"
    >
      <div className=" mt-6">
        <h1 className="text-2xl font-bold">Components Board</h1>
      </div>
      {!isLoading ? (
        <div className="flex flex-grow  mt-4 space-x-6 overflow-auto">
          <KanbanColumn title={'Backlog'} count={backlogIssues ? backlogIssues.length : 0}>
            {backlogIssues && backlogIssues.map((item) => <KanbanItem item={item} key={item.key} />)}
          </KanbanColumn>
          <KanbanColumn title={'In Progress'} count={inProgressIssues ? inProgressIssues.length : 0}>
            {inProgressIssues && inProgressIssues.map((item) => <KanbanItem item={item} key={item.key} />)}
          </KanbanColumn>
          <KanbanColumn title={'Review'} count={reviewIssues ? reviewIssues.length : 0}>
            {reviewIssues && reviewIssues.map((item) => <KanbanItem item={item} key={item.key} />)}
          </KanbanColumn>
          <KanbanColumn title={'Done'} count={doneIssues ? doneIssues.length : 0}>
            {doneIssues && doneIssues.map((item) => <KanbanItem item={item} key={item.key} />)}
          </KanbanColumn>
        </div>
      ) : (
        <p>loading</p>
      )}
    </div>
  );
};
