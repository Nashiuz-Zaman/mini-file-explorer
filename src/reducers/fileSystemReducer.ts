import { IFileSystemState, TNode, IFolderNode } from "@/types";

export const ACTION_TYPES = Object.freeze({
  init: "INITIALIZE",
  create: "CREATE_NODE",
  rename: "RENAME_NODE",
  delete: "DELETE_NODE",
  updateContent: "UPDATE_CONTENT",
});

export type FileSystemAction =
  | { type: (typeof ACTION_TYPES)["init"]; payload: IFileSystemState }
  | {
      type: (typeof ACTION_TYPES)["create"];
      payload: { parentId: string; newNode: TNode };
    }
  | {
      type: (typeof ACTION_TYPES)["rename"];
      payload: { id: string; newName: string };
    }
  | { type: (typeof ACTION_TYPES)["delete"]; payload: { id: string } }
  | {
      type: (typeof ACTION_TYPES)["updateContent"];
      payload: { id: string; content: string };
    };

export function fileSystemReducer(
  state: IFileSystemState,
  action: FileSystemAction,
): IFileSystemState {
  switch (action.type) {
    case ACTION_TYPES.init:
      return action.payload;

    case ACTION_TYPES.create: {
      const { parentId, newNode } = action.payload;
      const parentFolder = state.nodes[parentId];

      if (!parentFolder || parentFolder.type !== "folder") return state;

      return {
        ...state,
        nodes: {
          ...state.nodes,
          [newNode.id]: newNode,
          [parentId]: {
            ...parentFolder,
            childrenIds: [...parentFolder.childrenIds, newNode.id],
          },
        },
      };
    }

    case ACTION_TYPES.rename: {
      const { id, newName } = action.payload;
      if (!state.nodes[id] || !newName.trim()) return state;

      return {
        ...state,
        nodes: {
          ...state.nodes,
          [id]: { ...state.nodes[id], name: newName },
        },
      };
    }

    case ACTION_TYPES.delete: {
      const { id } = action.payload;
      if (id === state.rootId) return state;

      const targetNode = state.nodes[id];
      if (!targetNode) return state;

      const parentId = targetNode.parentId;
      const updatedNodes = { ...state.nodes };

      // Recursively collect all internal children maps to purge completely
      const collectDescendantIds = (nodeId: string): string[] => {
        const node = updatedNodes[nodeId];
        if (!node) return [];
        return node.type === "folder"
          ? [nodeId, ...node.childrenIds.flatMap(collectDescendantIds)]
          : [nodeId];
      };

      const idsToRemove = collectDescendantIds(id);
      idsToRemove.forEach((removeId) => delete updatedNodes[removeId]);

      // Remove the direct pointer tracking trace from parent folder
      if (parentId && updatedNodes[parentId]?.type === "folder") {
        const parentFolder = updatedNodes[parentId] as IFolderNode;
        updatedNodes[parentId] = {
          ...parentFolder,
          childrenIds: parentFolder.childrenIds.filter((cId) => cId !== id),
        };
      }

      return { ...state, nodes: updatedNodes };
    }

    case ACTION_TYPES.updateContent: {
      const { id, content } = action.payload;
      const targetNode = state.nodes[id];
      if (!targetNode || targetNode.type !== "text-file") return state;

      return {
        ...state,
        nodes: {
          ...state.nodes,
          [id]: { ...targetNode, content },
        },
      };
    }

    default:
      return state;
  }
}
