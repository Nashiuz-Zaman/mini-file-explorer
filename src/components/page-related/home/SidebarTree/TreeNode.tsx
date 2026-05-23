import { OuterContainer } from "@/components/shared/containers/OuterContainer";
import { TNode } from "@/types";
import { Icon } from "@iconify/react";
import { useState } from "react";

interface ITreeNodeProps {
  nodeId: string;
  nodes: Record<string, TNode>;
  depth: number;
  currentFolderId: string;
  activeFileId: string | null;
  selectedNodeId: string | null;
  setSelectedNodeId: (id: string) => void;
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
  selectedNodeId,
  setSelectedNodeId,
}: ITreeNodeProps) => {
  const node = nodes[nodeId];
  // Keeping track of whether this folder is open or closed
  const [isOpen, setIsOpen] = useState<boolean>(node?.id === "root");

  if (!node) return null;

  const isFolder = node.type === "folder";

  // Check if the folder or file is selected
  const isSelected = selectedNodeId === node.id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();

    setSelectedNodeId(node.id);

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
        className={`cursor-pointer hover:bg-white/30 transition-colors  ${isSelected ? "bg-white/20" : ""}`}
        style={{ paddingLeft: `${depth * 10}px` }}
      >
        <OuterContainer as="div" className="flex items-center gap-1 py-1.5">
          {/* Show caret icons to indicate open or closed */}
          {isFolder && (
            <Icon icon={isOpen ? "mdi:chevron-down" : "mdi:chevron-right"} />
          )}

          {/* Pick the icon based on the type */}
          {isFolder ? (
            <Icon
              icon={isOpen ? "mdi:folder-open" : "mdi:folder"}
              className="text-primary ml-px"
            />
          ) : (
            <Icon icon="mdi:file-document-outline" className="ml-5" />
          )}

          {/* Show the name of the file or folder */}
          <span
            className={`text-xs ${node.type === "folder" ? "font-medium" : ""} truncate`}
          >
            {node.name}
          </span>
        </OuterContainer>
      </div>

      {/* If this is a folder, render the children below it */}
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
              selectedNodeId={selectedNodeId}
              setSelectedNodeId={setSelectedNodeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};
