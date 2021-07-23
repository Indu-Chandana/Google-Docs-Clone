import dynamic from "next/dynamic";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from "draft-js"
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import {convertToRaw, convertFromRaw} from "draft-js"
import { useDocumentOnce } from "react-firebase-hooks/firestore";




//this time do not do normal import we do dynamic import, why we use normal import we can get error "window ....", client can  access to the window object but server can't access to the window object. that's why we can get error. more details watch 07/21 date.
const Editor = dynamic(() => import("react-draft-wysiwyg").then((module) => module.Editor), 
    {
        ssr: false, //server side render false
    }
);

function TextEditor() {
   
    const router =useRouter();
    // id comming from url
    const {id} = router.query;

    const [session] = useSession();
                                                    // this text editor requires serturn structure thats why we add EditorState.createEmty()
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    
    const [snapshot] = useDocumentOnce(
        db.collection("userDocs").doc(session.user.email).collection("docs").doc(id)
      );
    
      useEffect(() => {
        if (snapshot?.data()?.editorState) {
          setEditorState(
            EditorState.createWithContent(
              convertFromRaw(snapshot?.data()?.editorState)
            )
          );
        }
      }, [snapshot]);
    
    //every time start typing in the keyboard, it dipatch editorState
    const onEditorStateChange = (editorState) => {
        setEditorState(editorState); // now we  can type, beacause in useState we do 'createEmpty' in that time we cannot typing
    
        db.collection('userDocs')
        .doc(session.user.email)
        .collection("docs")
        .doc(id)
        .set({
            // we can not upload state, we convert it. JSON storalble formate
            editorState: convertToRaw(editorState.getCurrentContent())
        }, {
            merge: true // this is important this is not upload only new edite things only
        })
    }
 
    return (
        <div className=" bg-[#F8F9FA] min-h-screen pb-16"> 
            <Editor
            //anytime we keep track of something we need state
            editorState={editorState}
            //stateChange call function
            onEditorStateChange={onEditorStateChange}

            //use toolbar ro css
             toolbarClassName="flex sticky top-0 z-50 !justify-center
              mx-auto" // ! this use to externaly import my special
            //use editor to css
              editorClassName="bg-white p-10 mt-6 shadow-lg max-w-5xl !justify-center mx-auto
               mb-12 border "
              />
             

        </div>
    )
}

export default TextEditor
