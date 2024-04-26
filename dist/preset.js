export function previewAnnotations(entry) {
    return [...entry, require.resolve("./preview.js")];
}
export function managerEntries(entry) {
    return [...entry, require.resolve("./manager.js"), require.resolve("@storybook/addon-links")];
}
