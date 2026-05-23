"use client";

import { SidebarTree } from "@/components/page-related/home/SidebarTree/SidebarTree";
import { useFileSystem } from "@/hooks/useFileSystem";

export const HomePageClient = () => {
  const {
    fileSystem,
    currentFolderId,
    setCurrentFolderId,
    activeFileId,
    setActiveFileId,
  } = useFileSystem();

  console.log(fileSystem);

  return (
    <div className="grid grid-cols-[1fr_4fr_1.5fr] h-full">
      {/* Sidebar tree */}
      <section>
        <SidebarTree
          fileSystem={fileSystem}
          currentFolderId={currentFolderId}
          activeFileId={activeFileId}
          onFolderClick={setCurrentFolderId}
          onFileClick={setActiveFileId}
        />
      </section>

      {/* Main panel */}
      <section className="border-x border-neutral-800"></section>

      {/* Text file content viewer */}
      <section></section>
    </div>
  );
};
