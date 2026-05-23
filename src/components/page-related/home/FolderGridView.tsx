import { Icon } from "@iconify/react";
import { TNode } from "@/types";
import { useDoubleClick } from "@/hooks/useDoubleClick";

interface IFolderGridViewProps {
  currentFolderChildren: TNode[];
  selectedNodeId: string | null;
  onSelect: (id: string) => void;
  onOpenFolder: (id: string) => void;
  onOpenFile: (id: string) => void;
}

export const FolderGridView = ({
  currentFolderChildren,
  selectedNodeId,
  onSelect,
  onOpenFolder,
  onOpenFile,
}: IFolderGridViewProps) => {
  const handleItemInteraction = useDoubleClick({
    onSingleClick: (id) => onSelect(id),
    onDoubleClick: (id) => {
      const node = currentFolderChildren.find((n) => n.id === id);
      if (!node) return;

      if (node.type === "folder") {
        onOpenFolder(id);
      } else {
        onOpenFile(id);
      }
    },
    delay: 300,
  });

  if (currentFolderChildren.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-52 text-neutral-500">
        <Icon icon="mdi:folder-open-outline" className="text-4xl mb-2" />
        <p className="text-sm">This folder is empty</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 p-4 select-none">
      {currentFolderChildren.map((node) => {
        const isFolder = node.type === "folder";
        const isSelected = selectedNodeId === node.id;

        return (
          <div
            key={node.id}
            onClick={(e) => handleItemInteraction(e, node.id)}
            className={`flex flex-col items-center p-3 rounded-md cursor-pointer transition-all border max-w-25 text-center ${
              isSelected
                ? "bg-white/10 border-white/40 text-neutral-200 shadow-sm"
                : "bg-transparent border-transparent hover:bg-neutral-600/40 text-neutral-300"
            }`}
          >
            <Icon
              icon={isFolder ? "mdi:folder" : "mdi:file-document-outline"}
              className={`text-4xl mb-1.5 ${isSelected ? "text-neutral-200" : "text-neutral-400"}`}
            />
            <span className="text-xs w-full truncate px-1" title={node.name}>
              {node.name}
            </span>
          </div>
        );
      })}
    </div>
  );
};
