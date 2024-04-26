import { getNonce } from "./getNonce.js";
import {} from "./types/index.js";
import { SaplingParser } from "./SaplingParser.mjs";
export class Tree {
    index;
    id;
    name;
    fileName;
    filePath;
    importPath;
    expanded;
    depth;
    count;
    thirdParty;
    reactRouter;
    redux;
    children;
    parent;
    parentList;
    props;
    error;
    constructor(node) {
        this.id = getNonce(); // shallow copies made from constructor do not share identifiers
        this.name = node?.name ?? "";
        this.fileName = node?.fileName ?? "";
        this.filePath = node?.filePath ?? "";
        this.importPath = node?.importPath ?? "";
        this.depth = node?.depth ?? 0;
        this.count = node?.count ?? 1;
        this.expanded = node?.expanded ?? false;
        this.thirdParty = node?.thirdParty ?? false;
        this.reactRouter = node?.reactRouter ?? false;
        this.redux = node?.redux ?? false;
        this.children = node?.children ?? [];
        this.parent = node?.parent;
        this.parentList = node?.parentList ?? [];
        this.props = node?.props ?? {};
        this.error = node?.error ?? "";
    }
    /**
     * Sets or modifies value of class fields and performs input validation.
     * @param key The class field to be modified.
     * @param value The value to be assigned.
     * Use for complete replacement of 'children', 'props' elements (for mutation, use array/object methods).
     */
    set(key, value) {
        if (["count", "thirdParty", "reactRouter", "redux", "error"].includes(key)) {
            this[String(key)] = value;
        }
        else if (key === "children") {
            if (value && Array.isArray(value) && (!value.length || value[0] instanceof Tree)) {
                this.children.splice(0, this.children.length);
                this.children.push(...value);
                return;
            }
            throw new Error("Invalid input children array.");
        }
        else if (key === "props") {
            if (value &&
                typeof value === "object" &&
                Object.entries(value).every(([k, v]) => typeof k === "string" && typeof v === "boolean")) {
                Object.keys(this.props).forEach((k) => delete this.props[k]);
                Object.entries(value).forEach(([k, v]) => (this.props[k] = v));
                return;
            }
            throw new Error("Invalid input props object.");
        }
        else {
            throw new Error(`Altering property ${key} is not allowed. Create new tree instance instead.`);
        }
    }
    get(...input) {
        if (!input ||
            !Array.isArray(input) ||
            !input.length ||
            (typeof input[0] === "string" && input.length > 1) ||
            (typeof input[0] !== "string" && typeof input[0] !== "number")) {
            throw new Error("Invalid input type.");
        }
        else if (typeof input[0] === "string") {
            const getById = this.subtree()
                .filter(({ id }) => input[0] === id)
                .pop();
            const getByFilePath = this.subtree().filter(({ filePath }) => input[0] === filePath);
            if (!getById && !getByFilePath.length) {
                throw new Error("Node not found with input: " + input[0]);
            }
            return getById || getByFilePath;
        }
        return input.reduce((acc, curr, i) => {
            if (!acc || !acc.children[curr]) {
                throw new Error(`Invalid entry at index ${i} of input path array.`);
            }
            if (curr < 0 || curr >= acc.children.length) {
                throw new Error(`Entry out of bounds at index ${i} of input path array.`);
            }
            return acc.children[curr];
        }, this);
    }
    /**
     * @returns Normalized array containing current node and all of its descendants.
     */
    subtree() {
        const descendants = [];
        const callback = (node) => {
            descendants.push(...node.children);
        };
        this.traverse(callback);
        return [this, ...descendants];
    }
    /**
     * Recursively applies callback on current node and all of its descendants.
     */
    traverse(callback) {
        callback(this);
        if (!this.children || !this.children.length) {
            return;
        }
        this.children.forEach((child) => {
            child.traverse(callback);
        });
    }
    isFile() {
        return !this.thirdParty && !this.reactRouter;
    }
    /** Switches expanded property state. */
    toggleExpanded() {
        this.expanded = !this.expanded;
    }
    /**
     * Finds subtree node and changes expanded property state.
     * @param expandedState if not undefined, defines value of expanded property for target node.
     * If expandedState is undefined, expanded property is negated.
     */
    findAndToggleExpanded(id, expandedState) {
        const target = this.get(id);
        if (target === undefined) {
            throw new Error("Invalid input id.");
        }
        if (target.expanded !== expandedState) {
            target.toggleExpanded();
        }
    }
    /**
     * Triggers on file save event.
     * Finds node(s) that match saved document's file path,
     * reparses their subtrees to reflect updated document content,
     * and restores previous isExpanded state for descendants.
     */
    updateOnSave(savedFilePath) {
        const targetNodes = this.get(savedFilePath);
        if (!targetNodes.length) {
            throw new Error("No nodes were found with file path: " + savedFilePath);
        }
        targetNodes.forEach((target) => {
            const prevState = target.subtree().map((node) => {
                return { expanded: node.expanded, depth: node.depth, filePath: node.filePath };
            });
            // Subtree of target is newly parsed in-place.
            SaplingParser.parse(target);
            const restoreExpanded = (node) => {
                if (node.expanded !==
                    prevState.some(({ expanded, depth, filePath }) => expanded && node.depth === depth && node.filePath === filePath)) {
                    node.toggleExpanded();
                }
            };
            target.traverse(restoreExpanded);
        });
    }
    /**
     * Recursively captures and exports internal state for all nested nodes.
     * Required for lossless conversion to/from workspaceState memento object (webview persistence).
     * @returns JSON-stringifyable Tree object
     */
    serialize() {
        const recurse = (node) => {
            const obj = {
                ...node,
                children: node.children?.map((child) => recurse(child)) ?? [],
            };
            delete obj.parent;
            return Object.entries(obj).reduce((acc, [k, v]) => {
                acc[k] = v;
                return acc;
            }, {});
        };
        return recurse(this);
    }
    /**
     * Recursively converts all nested node data in Tree object into Tree class objects.
     * @param data: Tree object containing state data for all nodes in component tree to be restored into webview.
     * @returns Tree class object with all nested descendant nodes also of Tree class.
     */
    static deserialize(data) {
        const recurse = (node) => new Tree({
            ...node,
            children: node.children?.map((child) => recurse(child)),
        });
        return recurse(data);
    }
}
