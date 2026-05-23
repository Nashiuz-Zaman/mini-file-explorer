import { useState } from "react";
import { Icon } from "@iconify/react";
import { ButtonBtn } from "@/components/shared/buttons/ButtonBtn";
import { TNode } from "@/types";

interface ITopbarProps {
  currentFolderId: string;
  activeNode: TNode | undefined;
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onCreateNode: (
    parentId: string,
    name: string,
    type: "folder" | "text-file",
  ) => void;
}

export const Topbar = ({
  currentFolderId,
  onCreateNode,
  activeNode,
  onDelete,
  onRename,
}: ITopbarProps) => {
  const [newItemName, setNewItemName] = useState("");
  const [editName, setEditName] = useState(activeNode?.name || "");
  const [prevNodeId, setPrevNodeId] = useState<string | null>(
    activeNode?.id || null,
  );

  if (activeNode && activeNode.id !== prevNodeId) {
    setPrevNodeId(activeNode.id);
    setEditName(activeNode.name);
  }

  const handleDelete = () => {
    if (!activeNode) return;

    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${activeNode.name}"?`,
    );
    if (confirmDelete) {
      onDelete(activeNode.id);
    }
  };

  const handleCreate = (type: "folder" | "text-file") => {
    if (!newItemName.trim()) return;

    onCreateNode(currentFolderId, newItemName.trim(), type);
    setNewItemName("");
  };

  const handleRename = () => {
    if (!activeNode) return;

    if (editName.trim() && editName !== activeNode.name) {
      onRename(activeNode.id, editName.trim());
    }

    setPrevNodeId(null);
    setEditName("");
  };

  const commonBtnClasses = "text-sm! rounded-sm! py-1.5! px-3!";

  return (
    <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-dark-bg-light border-b border-neutral-800 gap-2">
      {/* New folder/file creation block */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Name..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="px-3 py-1.5 text-sm rounded-md outline-none focus:ring focus:ring-neutral-300 border border-neutral-700 max-w-[15rem]"
        />

        {/* Button to create a folder */}
        <ButtonBtn
          onClick={() => handleCreate("folder")}
          className={`primary-classes ${commonBtnClasses}`}
          title="Create new folder"
        >
          <Icon icon="mdi:folder-plus-outline" />
          <span className="hidden sm:inline">New Folder</span>
        </ButtonBtn>

        {/* Button to create a text file */}
        <ButtonBtn
          onClick={() => handleCreate("text-file")}
          className={`primary-outlined-classes ${commonBtnClasses}`}
          title="Create new folder"
        >
          <Icon icon="mdi:file-document-plus-outline" />
          <span className="hidden sm:inline">New File</span>
        </ButtonBtn>
      </div>

      {/* Renaming and delete block */}
      {activeNode && (
        <div className="flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Rename..."
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="flex-1 px-3 py-1.5 text-sm rounded-md outline-none focus:ring focus:ring-neutral-300 border border-neutral-700 bg-transparent text-neutral-200 max-w-[15rem]!"
          />
          <ButtonBtn
            onClick={handleRename}
            className={`primary-classes ${commonBtnClasses}`}
            title="Rename folder/file name"
          >
            <Icon icon={"mdi:rename"} />
            <span className="hidden sm:inline">Rename</span>
          </ButtonBtn>

          <ButtonBtn
            onClick={handleDelete}
            className={`danger-classes ${commonBtnClasses}`}
            title="Delete this item"
          >
            <Icon icon="mdi:trash-can-outline" />
            <span className="hidden sm:inline">Delete</span>
          </ButtonBtn>
        </div>
      )}
    </div>
  );
};
