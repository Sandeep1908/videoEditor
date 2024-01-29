import { StoreProvider } from "@/store";
import { Editor } from "../../components/Editor";

function EditorPage() {
  return (
    <StoreProvider>
      <Editor></Editor>
    </StoreProvider>
  );
}

 

export default EditorPage;
