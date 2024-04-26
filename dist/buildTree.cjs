"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * CommonJS does not have top-level `await`, so we can wrap
 * everything in an `async` IIFE to make our lives a little easier.
 */
(async function () {
    const { SaplingParser } = await import("./tree/SaplingParser.mjs");
    const parser = require("@babel/parser");
    const traverse = require("@babel/traverse").default;
    const { glob } = require("glob");
    const path = require("path");
    const fs = require("fs");
    const buildTree = async () => {
        const tsfiles = await glob(["**/[A-Z]*.stories.*"], {
            ignore: "node_modules/**",
            windowsPathsNoEscape: true,
        });
        const tspaths = tsfiles.map((relativePath) => path.resolve(relativePath));
        let storiesComponents = {};
        const getComponentPathExtension = (componentPath) => {
            const dir = path.dirname(componentPath);
            const basename = path.basename(componentPath);
            for (const file of fs.readdirSync(dir)) {
                const regex = new RegExp("^" + basename + "\\.[a-zA-Z0-9,]*$");
                if (regex.test(file)) {
                    return path.join(dir, file);
                }
            }
        };
        for (const storyPath of tspaths) {
            const fileContent = fs.readFileSync(storyPath, "utf-8");
            const { title, relativeComponentPath } = getStoryMetadata(fileContent);
            let componentPath = path.join(path.dirname(storyPath), relativeComponentPath);
            const extension = path.extname(componentPath);
            if (!extension) {
                componentPath = getComponentPathExtension(componentPath);
            }
            storiesComponents[componentPath] = title;
        }
        const searchStory = (filePath) => {
            return storiesComponents[filePath];
        };
        const dependenciesRecursive = (node) => {
            const children = node.children;
            if (children.length === 0)
                return [];
            const dependencies = children.map((child) => {
                const title = searchStory(child.filePath);
                if (!!title) {
                    dependentsRecursive(title, child);
                    return title;
                }
                return dependenciesRecursive(child);
            });
            return dependencies.flat();
        };
        const dependentsRecursive = (nodeTitle, node) => {
            if (!node.parent)
                return;
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
        // console.log(tree);
        // const jsonString = JSON.stringify(tree, null, 2);
        // fs.writeFileSync("tree.json", jsonString, "utf8");
        return tree;
    };
    const getStoryMetadata = (storyString) => {
        // Parse the file content
        const ast = parser.parse(storyString, {
            sourceType: "module",
            plugins: ["jsx", "typescript"],
        });
        let identifierMap = {};
        let title = "";
        let component = "";
        // Traverse the AST to find import declarations and local identifiers
        traverse(ast, {
            ImportDeclaration(path) {
                const source = path.node.source.value;
                path.node.specifiers.forEach((specifier) => {
                    if (specifier.type === "ImportSpecifier") {
                        identifierMap[specifier.local.name] = source;
                    }
                    else if (specifier.type === "ImportDefaultSpecifier" ||
                        specifier.type === "ImportNamespaceSpecifier") {
                        identifierMap[specifier.local.name] = source;
                    }
                });
            },
            ExportDefaultDeclaration(path) {
                const declaration = path.get("declaration");
                if (declaration.isIdentifier()) {
                    // Find the variable declaration for the default export
                    const binding = path.scope.getBinding(declaration.node.name);
                    if (binding && binding.path.isVariableDeclarator()) {
                        // Extract properties from the object assigned to the default export
                        const init = binding.path.get("init");
                        if (init.isObjectExpression()) {
                            init.get("properties").forEach((property) => {
                                if (property.node.key.name === "title") {
                                    title = property.node.value.value;
                                }
                                if (property.node.key.name === "component") {
                                    component = property.node.value.name;
                                }
                                if (title && component)
                                    path.stop();
                            });
                        }
                    }
                }
            },
        });
        return {
            title,
            relativeComponentPath: identifierMap[component],
        };
    };
    const editGetDependenciesTree = (tree) => {
        const getDependenciesPath = path.resolve("./dist/utils/getTree.js");
        const data = fs.readFileSync(getDependenciesPath, "utf-8");
        const regex = /\/\* BUILD_TREE_SCRIPT_START \*\/([\s\S]*?)\/\* BUILD_TREE_SCRIPT_END \*\//g;
        const newTreeValue = `/* BUILD_TREE_SCRIPT_START */ ${JSON.stringify(tree)}; /* BUILD_TREE_SCRIPT_END */ `;
        const newData = data.replace(regex, newTreeValue);
        fs.writeFileSync(getDependenciesPath, newData, "utf-8");
    };
    const tree = await buildTree();
    editGetDependenciesTree(tree);
})();
// const searchStory = (filePath) => {
//   return storiesComponents[filePath] ?? null;
// };
// const filterDependencies = (obj) => {
//   const dependencies = obj.children.map((child) => {
//     const title = searchStory(child.filePath);
//     return title
//       ? {
//           title,
//           dependencies: cleanUpTreeRecursive(child),
//         }
//       : cleanUpTreeRecursive(child);
//   });
//   return dependencies.flat();
// };
// const dependentsRecursive = (obj) => {
//   const dependents = obj.parentList.map((parentPath) => {
//     const title = searchStory(parentPath);
//     return title
//       ? {
//           title,
//           dependents: cleanUpTreeRecursive(parentPath),
//         }
//       : cleanUpTreeRecursive(parentPath);
//   });
//   return dependents.flat();
// };
// const cleanUpTreeRecursive = (obj) => {
//   // const { filePath, parentList } = obj;
//   // console.log({ filePath, parentList });
//   const dependencies = obj.children.length === 0 ? [] : filterDependencies(obj);
//   const dependents = obj.parentList.length === 0 ? [] : dependentsRecursive(obj);
//   return { ...dependencies, ...dependents };
// };
// let tree = {};
// for (const componentPath in storiesComponents) {
//   const title = storiesComponents[componentPath];
//   const treeObj = SaplingParser.parse(componentPath);
//   tree[title] = cleanUpTreeRecursive(treeObj);
// }
// const jsonString = JSON.stringify(tree, null, 2);
// fs.writeFileSync("tree.json", jsonString, "utf8");
// return tree;
