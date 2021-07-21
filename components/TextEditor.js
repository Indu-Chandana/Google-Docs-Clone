import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js"
import { useState } from "react";

//this time do not do normal import we do dynamic import, why we use normal import we can get error "window ....", client can  access to the window object but server can't access to the window object. that's why we can get error. more details watch 07/21 date.
const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor), 
    {
        ssr: false,
    }
);

function TextEditor() {
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    return (
        <div className=" bg-[#F8F9FA] min-h-screen pb-16"> 
            <Editor
            editorState={editorState}
             toolbarClassName="flex sticky top-0 z-50 !justify-center
              mx-auto"
              editorClassName="bg-white p-10 mt-6 shadow-lg max-w-5xl !justify-center mx-auto
               mb-12 border "
              />
             

        </div>
    )
}

export default TextEditor
