import { useSession } from "next-auth/client";
import { useCollection } from "react-firebase-hooks/firestore"
import { db } from "../firebase"
import DocumentRow from "./DocumentRow"
function DocumentRows() {
    const [session] = useSession();

    const[realtimePosts] = useCollection(
        db.collection('userDocs').doc(session.user.email).collection('docs').orderBy('timestamp', 'desc')
    );

    return (
        <div>
            {realtimePosts?.docs.map(doc => (
                <DocumentRow
                key={doc.id}
                id={doc.id}
                fileName={doc.data().fileName}
                date={doc.data().timestamp}
                />
            ))}
        </div>
    )
}

export default DocumentRows
