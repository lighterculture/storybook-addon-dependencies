export function previewAnnotations(entry: any) {
  return [...entry, require.resolve("./preview.js")];
}

export function managerEntries(entry: any) {
  return [...entry, require.resolve("./manager.js"), require.resolve("@storybook/addon-links")];
}
