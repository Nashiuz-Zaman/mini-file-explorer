import { IFileSystemState } from "@/types";

export const generateInitialFileSystem = (): IFileSystemState => {
  const documentsId = crypto.randomUUID();
  const readmeId = crypto.randomUUID();
  const notesId = crypto.randomUUID();

  return {
    nodes: {
      root: {
        id: "root",
        name: "Desktop",
        type: "folder",
        parentId: null,
        childrenIds: [documentsId, readmeId],
      },
      [documentsId]: {
        id: documentsId,
        name: "Documents",
        type: "folder",
        parentId: "root",
        childrenIds: [notesId],
      },
      [readmeId]: {
        id: readmeId,
        name: "readme.txt",
        type: "text-file",
        parentId: "root",
        content:
          "Welcome to the Explora! Built with TypeScript, Next.js & Tailwind V4.",
      },
      [notesId]: {
        id: notesId,
        name: "Project Notes.txt",
        type: "text-file",
        parentId: documentsId,
        content:
          "Webbly Media React/Next.js submission build requirements checklist.",
      },
    },
    rootIds: ["root"],
  };
};
