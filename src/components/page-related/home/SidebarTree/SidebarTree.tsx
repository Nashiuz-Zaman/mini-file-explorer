import { IFileSystemState } from "@/types";
import { TreeNode } from "@/components/page-related/home/SidebarTree/TreeNode";

interface ISidebarTreeProps {
  fileSystem: IFileSystemState;
  currentFolderId: string;
  activeFileId: string | null;
  onFolderClick: (id: string) => void;
  onFileClick: (id: string) => void;
  className?: string;
}

export function SidebarTree({
  fileSystem,
  currentFolderId,
  activeFileId,
  onFolderClick,
  onFileClick,
  className = "",
}: ISidebarTreeProps) {
  return (
    <div className={`overflow-y-auto h-full select-none ${className}`}>
      <TreeNode
        nodeId={fileSystem.rootId}
        nodes={fileSystem.nodes}
        depth={0}
        currentFolderId={currentFolderId}
        activeFileId={activeFileId}
        onFolderClick={onFolderClick}
        onFileClick={onFileClick}
      />
    </div>
  );
}
