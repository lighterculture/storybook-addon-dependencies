const tree = /* BUILD_TREE_SCRIPT_START */ {}; /* BUILD_TREE_SCRIPT_END */
export const getDependenciesTree = (storyTitle) => {
    try {
        return tree[storyTitle].dependencies;
    }
    catch {
        return [];
    }
};
export const getDependentsTree = (storyTitle) => {
    try {
        return tree[storyTitle].dependents;
    }
    catch {
        return [];
    }
};
export const getTree = () => {
    return tree;
};
