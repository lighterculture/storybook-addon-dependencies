import { type INode, type IRawNode } from "./types/index.js";
export declare class Tree implements IRawNode, INode {
    index: number;
    id: string;
    name: string;
    fileName: string;
    filePath: string;
    importPath: string;
    expanded: boolean;
    depth: number;
    count: number;
    thirdParty: boolean;
    reactRouter: boolean;
    redux: boolean;
    children: Tree[];
    parent: Tree;
    parentList: string[];
    props: Record<string, boolean>;
    error: "" | "File not found." | "Error while processing this file/node." | string;
    constructor(node?: Partial<Tree>);
    /**
     * Sets or modifies value of class fields and performs input validation.
     * @param key The class field to be modified.
     * @param value The value to be assigned.
     * Use for complete replacement of 'children', 'props' elements (for mutation, use array/object methods).
     */
    set(key: keyof Tree, value: Tree[keyof Tree]): void;
    /**
     * Finds tree node(s) and returns reference pointer.
     * @param id
     * @returns Tree node with matching id, or undefined if not found.
     * @param filePath
     * @returns Array of matching Tree nodes, or empty array if none are found.
     */
    get(...input: string[]): Tree | Tree[] | undefined;
    /**
     * Get by following traversal path from root to target node
     * @param path: path expressed by sequence of each intermediate vertex's index in its parent's children array property.
     * e.g. (0) is the first child of root
     * e.g. (0, 2, 1) would be the second child of the third child of the first child of root
     * i.e. this.children[0].children[2].children[1]
     * @returns Tree node found at the destination of input traversal path.
     */
    get(...path: number[]): Tree;
    /**
     * @returns Normalized array containing current node and all of its descendants.
     */
    subtree(): Tree[];
    /**
     * Recursively applies callback on current node and all of its descendants.
     */
    traverse(callback: (node: Tree) => void): void;
    isFile(): boolean;
    /** Switches expanded property state. */
    toggleExpanded(): void;
    /**
     * Finds subtree node and changes expanded property state.
     * @param expandedState if not undefined, defines value of expanded property for target node.
     * If expandedState is undefined, expanded property is negated.
     */
    findAndToggleExpanded(id: string, expandedState?: boolean): void;
    /**
     * Triggers on file save event.
     * Finds node(s) that match saved document's file path,
     * reparses their subtrees to reflect updated document content,
     * and restores previous isExpanded state for descendants.
     */
    updateOnSave(savedFilePath: string): void;
    /**
     * Recursively captures and exports internal state for all nested nodes.
     * Required for lossless conversion to/from workspaceState memento object (webview persistence).
     * @returns JSON-stringifyable Tree object
     */
    serialize(): INode;
    /**
     * Recursively converts all nested node data in Tree object into Tree class objects.
     * @param data: Tree object containing state data for all nodes in component tree to be restored into webview.
     * @returns Tree class object with all nested descendant nodes also of Tree class.
     */
    static deserialize(data: Tree): Tree;
}
