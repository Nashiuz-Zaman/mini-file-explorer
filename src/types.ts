export interface IBaseNode {
  id: string;
  name: string;
  parentId: string | null;
}

export interface IFolderNode extends IBaseNode {
  type: "folder";
  childrenIds: string[];
}

export interface ITextFileNode extends IBaseNode {
  type: "text-file";
  content: string;
}

export type TNode = IFolderNode | ITextFileNode;

export interface IFileSystemState {
  nodes: Record<string, TNode>;
  rootIds: string[];
}
