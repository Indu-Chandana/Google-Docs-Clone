import Head from 'next/head'
import Header from '../components/Header'

export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Google Docs Clone</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>

      <section className="px-10 pb-10 bg-[#F8F9FA]" >
        <div className="max-w-3xl mx-auto">
          <div>
            <h2>Start a new document</h2>
          </div>
        </div>
      </section>
      
    </div>
  )
}
