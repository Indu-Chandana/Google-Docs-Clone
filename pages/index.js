import Button from '@material-tailwind/react/Button'
import Icon from '@material-tailwind/react/Icon'
import Head from 'next/head'
import Header from '../components/Header'
import Image from 'next/image';
import {getSession, useSession} from 'next-auth/client';
import Login from '../components/Login';
import { useState } from 'react';
import Modal from '@material-tailwind/react/Modal';
import ModalBody from '@material-tailwind/react/ModalBody';
import ModalFooter from '@material-tailwind/react/ModalFooter';
import {db} from '../firebase'
import firebase from 'firebase';
import {
  useCollectionOnce
} from 'react-firebase-hooks/firestore';
import DocumentRow from '../components/DocumentRow';

export default function Home() {
  const [session] = useSession();
  if(!session) return <Login/>

  const [showModal, setShowModal] = useState(false);
  const [input, setInput] = useState("");
  const [snapshot] = useCollectionOnce(
    db
    .collection('userDocs')
    .doc(session.user.email)
    .collection('docs')
    .orderBy('timestamp', 'desc'))


  const createDocument = () => {
    if (!input) return; 

    //this is a collection doc collection doc structcure
    db.collection('userDocs')  // creating userDocs collection
    .doc(session.user.email)   // creating different users differnt docs
    .collection('docs')        // go to that user docs
    .add({
      fileName: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    setInput("");
    setShowModal(false);
  };

  // modal is basically popup 
  const modal = (
    <Modal
    size="sm"
    active={showModal}
    // when i click another place popup msg disappear 
    toggler={() => setShowModal(false)}
    >
      <ModalBody>
        <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        type="text"
        className=" outline-none w-full"
        placeholder="Enter name of document... "
        //user click enter key, it will submit
        onKeyDown={(e) => e.key === "Enter" && createDocument()}
        />
      </ModalBody>
      <ModalFooter>
        <Button
        color= "blue"
        buttonType="link"
        onClick={(e) => setShowModal(false)}
        ripple="dark"
        >
          Cancel
        </Button>

        <Button
        color="blue"
        buttonType="link"
        onClick={createDocument}
        ripple="light"
        >
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )

  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      {/* modal use to what place popup comming from */}
      {modal}

      <section className="px-10 pb-10 bg-[#F8F9FA]" >
        <div className="max-w-3xl mx-auto">
          <div className=" flex py-6 items-center justify-between ">
            <h2 className="text-gray-700 text-lg">Start a new document</h2>
            
            <Button
              color="gray"
              buttonType="outline"
              iconOnly={true}
              ripple="dark"
              className="border-none"
            >
              <Icon name="more_vert" size="3xl"/>
            </Button>

          </div>

          <div>
            <div onClick={(e) => setShowModal(true)} className="relative h-52 w-40 border-2 cursor-pointer hover:border-blue-700">
              <Image src="https://links.papareact.com/pju" 
              alt="" 
              layout="fill"
              />
            </div>

            <p className="mt-2 ml-2 font-semibold  text-sm text-gray-700">Blank</p>
          </div>
        </div>
      </section>

      <section className="bg-white px-10 md:px-0">
        <div className="max-w-3xl mx-auto py-8 text-sm text-gray-700">
          <div className="pb-5 flex items-center justify-between">
            <h2 className="font-medium flex-grow">My Documents</h2>
            <p className="mr-12">Date Created</p>
            <Icon name="folder" size="3xl" color="gray"/>
          </div>
        

        {snapshot?.docs.map(doc => (
          <DocumentRow 
          key={doc.id}
          id={doc.id}
          fileName={doc.data().fileName}
          date={doc.data().timestamp}
          />
        ))}
        </div>
      </section>
      
    </div>
  )
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

  return{
    props: {
      session,
    },
  };
}
