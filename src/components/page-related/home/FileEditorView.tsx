import { useState } from "react";
import { Icon } from "@iconify/react";
import { ITextFileNode } from "@/types";
import { ButtonBtn } from "@/components/shared/buttons/ButtonBtn";

interface IFileEditorViewProps {
  activeFileNode: ITextFileNode;
  onClose: () => void;
  onUpdateContent: (id: string, content: string) => void;
}

export const FileEditorView = ({
  activeFileNode,
  onClose,
  onUpdateContent,
}: IFileEditorViewProps) => {
  const [localContent, setLocalContent] = useState(
    activeFileNode.content || "",
  );
  const [prevNodeId, setPrevNodeId] = useState<string | null>(
    activeFileNode?.id || null,
  );
  if (activeFileNode && activeFileNode.id !== prevNodeId) {
    setPrevNodeId(activeFileNode.id);
    setLocalContent(activeFileNode.content);
  }

  const handleSave = () => {
    onUpdateContent(activeFileNode.id, localContent);
  };

  const isUnsaved = localContent !== (activeFileNode.content || "");

  return (
    <div className="flex flex-col h-full">
      {/* Editor Top Bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-neutral-800 select-none">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="py-1 px-2 rounded hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 transition-colors flex items-center gap-2 text-xs"
            title="Go back"
          >
            <Icon icon="mdi:arrow-left" className="text-lg" />
            Back
          </button>

          <div className="flex items-center gap-2">
            <Icon
              icon="mdi:file-document-outline"
              className="text-neutral-400 text-lg"
            />
            <span className="text-sm font-medium text-neutral-200">
              {activeFileNode.name}
            </span>
            {isUnsaved && (
              <span className="text-2xs bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-medium">
                Unsaved Changes
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-3">
          <ButtonBtn
            onClick={handleSave}
            disabled={!isUnsaved}
            className={`py-0.75! px-1.5! gap-1! rounded-sm! text-xs! ${
              isUnsaved
                ? "primary-classes"
                : "bg-neutral-800 text-neutral-500 cursor-not-allowed"
            }`}
          >
            <Icon icon="mdi:content-save-outline" className="text-sm" />
            Save
          </ButtonBtn>
          <span className="text-xs text-neutral-500 font-mono hidden sm:inline">
            Editing Mode
          </span>
        </div>
      </div>

      {/* Textarea */}
      <div className="flex-1 p-4 overflow-hidden">
        <textarea
          value={localContent}
          onChange={(e) => setLocalContent(e.target.value)}
          placeholder="Type your file content here..."
          className="w-full h-full p-4 text-sm font-mono rounded-md bg-neutral-950/50 text-neutral-300 border border-neutral-800 outline-none focus:border-neutral-700/70 resize-none overflow-y-auto leading-relaxed"
        />
      </div>
    </div>
  );
};
