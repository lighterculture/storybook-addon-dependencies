const tree = /* BUILD_TREE_SCRIPT_START */ []; /* BUILD_TREE_SCRIPT_END */

export const getDependenciesTree = (storyTitle) => {
  return tree[storyTitle].dependencies;
};

export const getDependentsTree = (storyTitle) => {
  return tree[storyTitle].dependents;
};
