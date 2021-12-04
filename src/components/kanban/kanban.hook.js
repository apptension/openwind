import { includes, both } from 'ramda';

export const useIssueType = (issues) => {
  const backlogIssues = issues?.filter((item) =>
    both(includes('todo'), includes('element'))(item.labels.map((e) => e.name))
  );
  const inProgressIssues = issues?.filter((item) =>
    both(includes('in progress'), includes('element'))(item.labels.map((e) => e.name))
  );
  const reviewIssues = issues?.filter((item) =>
    both(includes('review'), includes('element'))(item.labels.map((e) => e.name))
  );
  const doneIssues = issues?.filter((item) =>
    both(includes('done'), includes('element'))(item.labels.map((e) => e.name))
  );

  return [backlogIssues, inProgressIssues, reviewIssues, doneIssues];
};
