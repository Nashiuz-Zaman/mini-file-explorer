import { IFileSystemState, TNode } from "@/types";

// Constant object of all the types for string name accuracy
export const ACTION_TYPES = Object.freeze({
  init: "INITIALIZE",
  create: "CREATE_NODE",
  rename: "RENAME_NODE",
  delete: "DELETE_NODE",
  updateContent: "UPDATE_CONTENT",
});

// Action types and their payload types
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

export const fileSystemReducer = (
  state: IFileSystemState,
  action: FileSystemAction,
): IFileSystemState => {
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
          [id]: { ...state.nodes[id], name: newName.trim() },
        },
      };
    }

    case ACTION_TYPES.delete: {
      const { id } = action.payload;
      if (id === state.rootId) return state;

      const targetNode = state.nodes[id];
      if (!targetNode) return state;

      const parentId = targetNode.parentId;
      const allNodes = structuredClone(state.nodes);

      // Recursively collect all the children
      const collectDescendantIds = (nodeId: string): string[] => {
        const nodeToDelete = allNodes[nodeId];
        if (!nodeToDelete) return [];

        return nodeToDelete.type === "folder"
          ? [
              nodeToDelete.id,
              ...nodeToDelete.childrenIds.flatMap((childrenNodeId) =>
                collectDescendantIds(childrenNodeId),
              ),
            ]
          : [nodeId];
      };

      const idsToRemove = collectDescendantIds(id);
      idsToRemove.forEach((removeId) => delete allNodes[removeId]);

      // Remove the id of the deleted node from its parent's childrenIds array
      const parentFolder = parentId ? allNodes[parentId] : null;
      if (parentFolder && parentFolder.type === "folder") {
        allNodes[parentFolder.id] = {
          ...parentFolder,
          childrenIds: parentFolder.childrenIds.filter(
            (childrenId) => childrenId !== id,
          ),
        };
      }

      return { ...state, nodes: allNodes };
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
};
