const path = require("path");
const fs = require("fs");
const ts = require("typescript");
const parser = require("@babel/parser");
const traverse = require("@babel/traverse").default;

const transpileTypescript = (fileString) => {
  if (path.extname(fileString).includes(".js")) return fileString;
  const compilerOptions = {
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleKind.ESNext,
    target: ts.ModuleKind.ESNext,
    jsx: "react",
    lib: ["es2020", "dom"],
  };
  return ts.transpileModule(fileString, { compilerOptions: compilerOptions }).outputText;
};

const getComponentPathExtension = (componentPath) => {
  if (path.extname(componentPath)) return componentPath;
  const dir = path.dirname(componentPath);
  const basename = path.basename(componentPath);
  for (const file of fs.readdirSync(dir)) {
    const regex = new RegExp("^" + basename + "\\.[a-zA-Z0-9,]*$");
    if (regex.test(file)) {
      return path.join(dir, file);
    }
  }
};

const getStoryMetadata = (storyString) => {
  // Parse the file content
  const ast = parser.parse(storyString, {
    sourceType: "module",
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
        } else if (
          specifier.type === "ImportDefaultSpecifier" ||
          specifier.type === "ImportNamespaceSpecifier"
        ) {
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
              if (title && component) path.stop();
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

const getBarrelFileComponentPath = (name, filePath) => {
  const indexFilePath = getComponentPathExtension(path.join(filePath, "index"));

  const fileContent = fs.readFileSync(indexFilePath, "utf-8");
  const fileString = transpileTypescript(fileContent);
  // Parse the file content
  const ast = parser.parse(fileString, {
    sourceType: "module",
  });

  let componentPath = "";

  // Traverse the AST to find import declarations
  traverse(ast, {
    ExportDeclaration(pathAST) {
      const source = pathAST.node.source.value;
      const specifiers = pathAST.node.specifiers;
      for (const specifier of specifiers) {
        const exportedName = specifier.exported.name; // Exported identifier name
        const localName = specifier.local.name; // Local identifier name

        if (exportedName == name) {
          componentPath = path.join(filePath, source);
          pathAST.stop();
        }
      }
    },
  });
  return getComponentPathExtension(componentPath);
};

const editGetDependenciesTree = (tree) => {
  const getDependenciesPath = path.join(__dirname, "./getTree.js");
  const data = fs.readFileSync(getDependenciesPath, "utf-8");
  const regex = /\/\*\s*BUILD_TREE_SCRIPT_START\s*\*\/([\s\S]*?)\/\*\s*BUILD_TREE_SCRIPT_END\s*\*\//g;
  const newTreeValue = `/* BUILD_TREE_SCRIPT_START */ ${JSON.stringify(tree)}; /* BUILD_TREE_SCRIPT_END */ `;
  const newData = data.replace(regex, newTreeValue);
  fs.writeFileSync(getDependenciesPath, newData, "utf-8");
};

module.exports = {
  transpileTypescript,
  getComponentPathExtension,
  getStoryMetadata,
  getBarrelFileComponentPath,
  editGetDependenciesTree,
};
