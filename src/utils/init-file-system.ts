import { IFileSystemState, IFolderNode, ITextFileNode } from "@/types";

export const generateInitialFileSystem = (): IFileSystemState => {
  const documentsId = crypto.randomUUID();
  const readmeId = crypto.randomUUID();
  const notesId = crypto.randomUUID();

  const root: IFolderNode = {
    id: "root",
    name: "Desktop",
    type: "folder",
    parentId: null,
    childrenIds: [documentsId, readmeId],
  };

  const documents: IFolderNode = {
    id: documentsId,
    name: "Documents",
    type: "folder",
    parentId: "root",
    childrenIds: [notesId],
  };

  const readme: ITextFileNode = {
    id: readmeId,
    name: "readme.txt",
    type: "text-file",
    parentId: "root",
    content:
      "Welcome to the Explora built with TypeScript, Next.js & Tailwind V4.",
  };

  const notes: ITextFileNode = {
    id: notesId,
    name: "Project Notes.txt",
    type: "text-file",
    parentId: documentsId,
    content: "Just some project notes.",
  };

  return {
    rootId: "root",
    nodes: {
      root,
      [documentsId]: documents,
      [readmeId]: readme,
      [notesId]: notes,
    },
  };
};
