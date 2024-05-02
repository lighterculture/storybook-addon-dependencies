# Storybook Addon Dependencies

This addon adds interactive dependencies trees to the autodocs page.

![Demo](https://raw.githubusercontent.com/aandrader/media/main/storybook-addon-dependencies-demo.gif)

![Dependents](https://miro.medium.com/v2/resize:fit:640/format:webp/1*GGIKyaIrao0a5Z-ymhQNlg.png)
![Dependencies](https://miro.medium.com/v2/resize:fit:640/format:webp/1*ZGdYxaaL7BiekSLTAvjykg.png)

### Getting started

This addon supports v7 and v8.
To use it with storybook 7 install `npm i -D storybook-addon-dependencies@7.0.0`

1. Install

```bash
npm i -D storybook-addon-dependencies
yarn add -D storybook-addon-dependencies
```

2. Register the addon in main.js

```js
export default {
  addons: ["storybook-addon-dependencies"],
};
```

3. Build the dependency tree

4. Run storybook

### Development scripts

To build the dependency tree of storied components run:

```bash
npx storybook-addon-dependencies
```

### Blocks

This addon overrides the default docs page, if there is a custom docs page use this custom doc blocks in your template.

```js
import { Dependencies, Dependents } from "storybook-addon-dependencies/blocks";
```

### Hooks

To create your own tree design with custom doc blocks, get the current story title with the hook and the titles tree with the api.

```js
import { useCurrentStoryTitle } from "storybook-addon-dependencies/hooks";
```

### API

```js
import { getTree, getDependenciesTree, getDependentsTree } from "storybook-addon-dependencies/api";
```

## Warnings

- Don't write storied components in the same file. This may cause conflicts with the tree builder.
