"use client";

import { useEffect, useReducer, useState } from "react";

import { IFileSystemState, TNode } from "@/types";
import { ACTION_TYPES, fileSystemReducer } from "@/reducers/fileSystemReducer";
import { generateInitialFileSystem } from "@/utils/init-file-system";

// Lazy Initializer
const initializeFileSystem = (): IFileSystemState => {
  // SSR Safety
  if (typeof window === "undefined") {
    return generateInitialFileSystem();
  }

  try {
    const storedData = localStorage.getItem("file_explorer_data");
    if (storedData) {
      return JSON.parse(storedData);
    }

    return generateInitialFileSystem();
  } catch (error) {
    console.log("Failed to parse localStorage file system:", error);

    return generateInitialFileSystem();
  }
};

export function useFileSystem() {
  const [fileSystem, dispatch] = useReducer(
    fileSystemReducer,
    undefined,
    initializeFileSystem,
  );

  // Navigation State
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  // Selection State
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);

  // Persist State
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("file_explorer_data", JSON.stringify(fileSystem));
    }
  }, [fileSystem]);

  // Create Node
  const createNode = (
    parentId: string,
    name: string,
    type: "folder" | "text-file",
  ) => {
    const newId = crypto.randomUUID();

    const newNode: TNode =
      type === "folder"
        ? {
            id: newId,
            name,
            type: "folder",
            parentId,
            childrenIds: [],
          }
        : {
            id: newId,
            name: name.endsWith(".txt") ? name : name + ".txt",
            type: "text-file",
            parentId,
            content: "",
          };

    dispatch({
      type: ACTION_TYPES.create,
      payload: {
        parentId,
        newNode,
      },
    });
  };

  // Rename Node
  const renameNode = (id: string, newName: string) => {
    const node = fileSystem.nodes[id];
    if (!node) return;

    dispatch({
      type: ACTION_TYPES.rename,
      payload: {
        id,
        newName:
          node.type === "text-file"
            ? newName.endsWith(".txt")
              ? newName
              : newName + ".txt"
            : newName,
      },
    });

    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  // Delete Node
  const deleteNode = (id: string) => {
    dispatch({
      type: ACTION_TYPES.delete,
      payload: {
        id,
      },
    });

    // Reset invalid selections
    if (activeFileId === id) setActiveFileId(null);
    if (currentFolderId === id) setCurrentFolderId("root");
    if (selectedNodeId === id) setSelectedNodeId(null);
  };

  // Update File Content
  const updateFileContent = (id: string, content: string) => {
    dispatch({
      type: ACTION_TYPES.updateContent,
      payload: {
        id,
        content,
      },
    });
  };

  return {
    fileSystem,
    currentFolderId,
    setCurrentFolderId,
    activeFileId,
    setActiveFileId,
    createNode,
    renameNode,
    deleteNode,
    updateFileContent,
    selectedNodeId,
    setSelectedNodeId,
  };
}

export type TUseFileSystemReturn = ReturnType<typeof useFileSystem>;
