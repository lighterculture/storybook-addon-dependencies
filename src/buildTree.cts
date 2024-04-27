#! /usr/bin/env node
/**
 * CommonJS does not have top-level `await`, so we can wrap
 * everything in an `async` IIFE to make our lives a little easier.
 */
(async function () {
  const { SaplingParser } = await import("./tree/SaplingParser.mjs");
  const { glob } = require("glob");
  const path = require("path");
  const fs = require("fs");
  const {
    transpileTypescript,
    getComponentPathExtension,
    getStoryMetadata,
    getBarrelFileComponentPath,
    editGetDependenciesTree,
  } = require("./utils/buildTreeUtils.cjs");

  const tsfiles = await glob(["**/[A-Z]*.stories.*"], {
    ignore: "node_modules/**",
    windowsPathsNoEscape: true,
  });

  const tspaths = tsfiles.map((relativePath) => path.resolve(relativePath));

  let storiesComponents = {};

  const searchStory = (filePath) => {
    return storiesComponents[filePath];
  };

  for (const storyPath of tspaths) {
    const fileContent = fs.readFileSync(storyPath, "utf-8");
    const fileString = transpileTypescript(fileContent);
    const { title, relativeComponentPath } = getStoryMetadata(fileString);
    const componentPath = path.join(path.dirname(storyPath), relativeComponentPath);
    storiesComponents[getComponentPathExtension(componentPath)] = title;
  }

  const dependenciesRecursive = (node) => {
    const children = node.children;
    if (children.length === 0) return [];
    const dependencies = children.map((child) => {
      const title = child.error
        ? searchStory(getBarrelFileComponentPath(child.name, child.filePath))
        : searchStory(child.filePath);

      if (!!title) {
        dependentsRecursive(title, child);
        return title;
      }

      return dependenciesRecursive(child);
    });

    return dependencies.flat();
  };

  const dependentsRecursive = (nodeTitle, node) => {
    if (!node.parent) return;
    const parentTitle = searchStory(node.parent.filePath);
    if (!parentTitle) {
      return dependentsRecursive(nodeTitle, node.parent);
    }
    const rootNode = getRootNode(nodeTitle);
    rootNode.dependents.push(parentTitle);
  };

  let tree = {};

  const getRootNode = (title) => {
    if (!tree[title]) {
      tree[title] = { dependencies: [], dependents: [] };
    }
    return tree[title];
  };

  for (const componentPath in storiesComponents) {
    const title = storiesComponents[componentPath];
    const rootNode = getRootNode(title);
    rootNode.dependencies = dependenciesRecursive(SaplingParser.parse(componentPath));
  }

  // console.log(storiesComponents, tree);

  // const jsonString = JSON.stringify(tree, null, 2);
  // fs.writeFileSync("tree.json", jsonString, "utf8");

  editGetDependenciesTree(tree);
})();
