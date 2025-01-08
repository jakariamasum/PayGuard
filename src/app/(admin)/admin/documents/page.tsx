import { getAllDocuments } from "@/services/documentServices";
import DocumentList from "./DocumentList";
export const dynamic = "force-dynamic";

const DocumentPage = async () => {
  const documents = await getAllDocuments();
  console.log(documents);
  return (
    <div>
      <DocumentList />
    </div>
  );
};

export default DocumentPage;
