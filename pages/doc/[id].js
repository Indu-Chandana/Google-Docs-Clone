import Icon from "@material-tailwind/react/Icon";
import { getSession, useSession } from "next-auth/client"
import { useRouter } from "next/dist/client/router";
import Login from "../../components/Login";
import {db} from "../../firebase"
import {useDocumentOnce} from "react-firebase-hooks/firestore"
import Button from "@material-tailwind/react/Button";
import Image from "next/image";
import TextEditor from "../../components/TextEditor";
function Doc() {
    const [session] = useSession();
    if(!session) return <Login/>;

    const router = useRouter();
    const { id } = router.query;

    const [snapshot, loadingSnapshot] = useDocumentOnce(
        db.collection('userDocs').doc(session.user.email).collection
        ('docs').doc(id));

    // redirect if anther user tries to access a URL they do not have aceess to..
    if(!loadingSnapshot && !snapshot?.data()?.fileName){
        router.replace("/");
    }


    

    return (
        <div>
            <header className="flex items-center p-3 border-b-2 pb-1">
                <span onClick={() => router.push('/')} className="cursor-pointer">
                    <Icon name='description' size='5xl' color='blue'/>  
                </span>

                <div className=" flex-grow px-2">
                    <h2>{loadingSnapshot? "loarding..." : snapshot?.data()?.fileName}</h2>
                    <div className="flex items-center text-sm space-x-2 -ml-1
                    text-gray-600 h-8">
                        <p className="option">File</p>
                        <p className="option">Edit</p>
                        <p className="option">View</p>
                        <p className="option">Insert</p>
                        <p className="option">Format</p>
                        <p className="option">Tools</p>
                    </div>
                </div>
                
                
                <Button
                color="lightBlue"
                buttonType="filled"
                size="regular"
                className="hidden md:inline-flex h-10 mr-5"
                rounded={false}
                block={false}
                IconOnly={false}
                ripple="light"
                >
                    <Icon name="people" size="md"/> share
                </Button>

                <Image 
                className="rounded-full cursor-pointer"
                src={session.user.image} 
                alt="" 
                height="30"
                width=" 30"
                />
                
            </header>

            <TextEditor/>
        </div>
    )
}

export default Doc

//we use secondly this code this is a page folder file first we use only components forder now we wont to use in [id].js 
export async function getServerSideProps(context) {
    const session = await getSession(context)

    return {
        props: {
            session
        }
    }
}

