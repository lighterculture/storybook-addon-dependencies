import { type INode } from "./index.js";
export interface RootState {
    search: string;
    rows: INode[];
    activeNode: string | null;
    focusedNode: string | null;
}
