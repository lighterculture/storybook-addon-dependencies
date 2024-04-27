const tree = /* BUILD_TREE_SCRIPT_START */ {"Badge":{"dependencies":[],"dependents":["Sidebar"]},"Document Preview":{"dependencies":[],"dependents":[]},"Button Icon":{"dependencies":["Button"],"dependents":["Accordion"]},"Button":{"dependencies":[],"dependents":["Button Icon"]},"Header":{"dependencies":[],"dependents":[]},"Column Bar Chart":{"dependencies":[],"dependents":[]},"Search Input":{"dependencies":[],"dependents":["Table Search"]},"Divider":{"dependencies":[],"dependents":["Sidebar"]},"Table Search":{"dependencies":["Search Input"],"dependents":[]},"Accordion":{"dependencies":["Button Icon"],"dependents":["Sidebar"]},"Icon Card":{"dependencies":[],"dependents":[]},"Sidebar":{"dependencies":["Divider","Badge","Accordion"],"dependents":[]}}; /* BUILD_TREE_SCRIPT_END */ 
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
