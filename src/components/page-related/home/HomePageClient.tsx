"use client";

import dynamic from "next/dynamic";

import { FileEditorView } from "@/components/page-related/home/FileEditorView";
import { Topbar } from "@/components/page-related/home/Topbar";
import { useFileSystem } from "@/hooks/useFileSystem";

const SidebarTree = dynamic(
  () =>
    import("@/components/page-related/home/SidebarTree/SidebarTree").then(
      (mod) => mod.SidebarTree,
    ),
  { ssr: false },
);
const FolderGridView = dynamic(
  () =>
    import("@/components/page-related/home/FolderGridView").then(
      (mod) => mod.FolderGridView,
    ),
  { ssr: false },
);

export const HomePageClient = () => {
  const {
    fileSystem,
    currentFolderId,
    setCurrentFolderId,
    activeFileId,
    setActiveFileId,
    createNode,
    selectedNodeId,
    setSelectedNodeId,
    renameNode,
    updateFileContent,
    deleteNode,
  } = useFileSystem();

  const currentFolderNode = fileSystem.nodes[currentFolderId];

  const currentFolderChildren = currentFolderId
    ? currentFolderNode && currentFolderNode.type === "folder"
      ? currentFolderNode?.childrenIds
          ?.map((id) => fileSystem.nodes[id])
          .filter(Boolean)
      : []
    : [];

  const activeFileNode = activeFileId ? fileSystem.nodes[activeFileId] : null;

  return (
    <div className="grid grid-cols-[20rem_auto] h-full">
      {/* Sidebar tree */}
      <section onClick={() => setSelectedNodeId(null)}>
        <SidebarTree
          fileSystem={fileSystem}
          currentFolderId={currentFolderId}
          activeFileId={activeFileId}
          onFolderClick={(id) => {
            setCurrentFolderId(id);
            setActiveFileId(null);
          }}
          onFileClick={(id) => {
            setSelectedNodeId(id);
            setActiveFileId(id);
          }}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
        />
      </section>

      {/* Main panel */}
      <section className="border-x border-neutral-800 h-full flex flex-col overflow-hidden">
        <Topbar
          onDelete={deleteNode}
          onRename={renameNode}
          activeNode={
            selectedNodeId ? fileSystem.nodes[selectedNodeId] : undefined
          }
          currentFolderId={currentFolderId}
          onCreateNode={createNode}
        />

        <div
          className="grow overflow-y-auto bg-dark-bg flex flex-col"
          onClick={() => setSelectedNodeId(null)}
        >
          {activeFileNode && activeFileNode.type === "text-file" ? (
            <FileEditorView
              activeFileNode={activeFileNode}
              onClose={() => {
                setCurrentFolderId(activeFileNode.parentId!);
                setActiveFileId(null);
              }}
              onUpdateContent={updateFileContent}
            />
          ) : (
            <FolderGridView
              currentFolderChildren={currentFolderChildren}
              selectedNodeId={selectedNodeId}
              onSelect={setSelectedNodeId}
              onOpenFolder={setCurrentFolderId}
              onOpenFile={(id) => {
                setSelectedNodeId(id);
                setActiveFileId(id);
              }}
            />
          )}
        </div>
      </section>
    </div>
  );
};
