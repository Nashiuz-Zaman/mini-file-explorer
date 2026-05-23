import { useState } from "react";
import { Icon } from "@iconify/react";
import { ButtonBtn } from "@/components/shared/buttons/ButtonBtn";

interface ITopbarProps {
  currentFolderId: string;
  onCreateNode: (
    parentId: string,
    name: string,
    type: "folder" | "text-file",
  ) => void;
}

export const Topbar = ({ currentFolderId, onCreateNode }: ITopbarProps) => {
  const [newItemName, setNewItemName] = useState("");

  const handleCreate = (type: "folder" | "text-file") => {
    if (!newItemName.trim()) return;

    // Create the new item in the currently active folder
    onCreateNode(currentFolderId, newItemName.trim(), type);

    // Clear the input field after creating
    setNewItemName("");
  };

  const commonBtnClasses = "text-sm! rounded-sm! py-1.5! px-3!";

  return (
    <div className="flex flex-wrap items-center gap-3 px-4 py-2 bg-dark-bg-light border-b border-neutral-800">
      {/* Input field for the new file or folder name */}
      <input
        type="text"
        placeholder="Name..."
        value={newItemName}
        onChange={(e) => setNewItemName(e.target.value)}
        className="px-3 py-1.5 text-sm rounded-md outline-none focus:ring focus:ring-neutral-300 border border-neutral-700"
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
  );
};
