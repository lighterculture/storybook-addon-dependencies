import { Tree } from "./types/index.js";
export declare class SaplingParser {
    /** Public method to generate component tree based on entry file or input node.
     * @param filePath
     * @returns Fully parsed component tree
     * @param root node
     * @returns Parses input root node in-place into component tree and returns undefined.
     */
    static parse(filePath: string): Tree;
    static parse(root: Tree): void;
}
