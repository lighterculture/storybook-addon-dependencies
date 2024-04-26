const tree = /* BUILD_TREE_SCRIPT_START */ {"Parent Component":{"dependencies":["Component 1","Component 2","Component 3"],"dependents":[]},"Component 1":{"dependencies":[],"dependents":["Parent Component"]},"Component 2":{"dependencies":["Component 3"],"dependents":["Parent Component"]},"Component 3":{"dependencies":["Component 7"],"dependents":["Parent Component","Component 2"]},"Component 7":{"dependencies":[],"dependents":["Component 3"]}}; /* BUILD_TREE_SCRIPT_END */                              
export const getDependenciesTree = (storyTitle) => {
    return tree[storyTitle].dependencies;
};
export const getDependentsTree = (storyTitle) => {
    return tree[storyTitle].dependents;
};
