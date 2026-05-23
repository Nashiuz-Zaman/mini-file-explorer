import { TNode } from "@/types";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface ITreeNodeProps {
  nodeId: string;
  nodes: Record<string, TNode>;
  depth: number;
  currentFolderId: string;
  activeFileId: string | null;
  onFolderClick: (id: string) => void;
  onFileClick: (id: string) => void;
}

export const TreeNode = ({
  nodeId,
  nodes,
  depth,
  currentFolderId,
  activeFileId,
  onFolderClick,
  onFileClick,
}: ITreeNodeProps) => {
  const node = nodes[nodeId];
  // Keeping track of whether this folder is open or closed
  const [isOpen, setIsOpen] = useState<boolean>(node?.id === "root");

  if (!node) return null;

  const isFolder = node.type === "folder";

  // Check if the folder or file is selected
  const isSelected = isFolder
    ? currentFolderId === node.id
    : activeFileId === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (isFolder) {
      setIsOpen((prev) => !prev);
      // Set the current folder in the hook state
      onFolderClick(node.id);
    } else {
      // Set the active file in the hook state
      onFileClick(node.id);
    }
  };

  return (
    <div>
      {/* The actual row for the file or folder */}
      <div
        onClick={handleClick}
        className={`flex items-center gap-1 py-1.5 cursor-pointer hover:bg-white/30 transition-colors ${isSelected ? "bg-primary/20" : ""}`}
        style={{ paddingLeft: `${depth * 4}px` }}
      >
        {/* Show caret icons to indicate open or closed */}
        {isFolder && (
          <Icon
            icon={isOpen ? "mdi:chevron-down" : "mdi:chevron-right"}
            className="text-lg"
          />
        )}

        {/* Pick the right icon based on what kind of item this is */}
        {isFolder ? (
          <Icon
            icon={isOpen ? "mdi:folder-open" : "mdi:folder"}
            className="text-primary"
          />
        ) : (
          <Icon icon="mdi:file-document-outline" />
        )}

        {/* Finally, show the name of the file or folder */}
        <span className="text-xs font-medium truncate">{node.name}</span>
      </div>

      {/* If this is a folder and it's open, render all of its children right below it */}
      {isFolder && isOpen && (
        <div>
          {node.childrenIds.map((childId) => (
            <TreeNode
              key={childId}
              nodeId={childId}
              nodes={nodes}
              depth={depth + 1}
              currentFolderId={currentFolderId}
              activeFileId={activeFileId}
              onFolderClick={onFolderClick}
              onFileClick={onFileClick}
            />
          ))}
        </div>
      )}
    </div>
  );
};
