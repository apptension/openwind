import { flatten } from 'ramda';

export const useIssueType = (issues) => {
  console.log('issues', issues);
  const resultBacklogIssues = issues?.filter((item) => item.labels.some((element) => element.name === 'element'));
  const backlogIssues = resultBacklogIssues && flatten(resultBacklogIssues);
  return [backlogIssues];
};
