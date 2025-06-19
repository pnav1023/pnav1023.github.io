import Head from 'next/head';
import dynamic from 'next/dynamic';

const Chatbot = dynamic(() => import('../components/Chatbot'), { ssr: false });

export default function Home() {
  return (
    <div>
      <Head>
        <title>Portfolio</title>
      </Head>
      <main style={{ padding: '2rem', fontFamily: 'sans-serif' }}>
        <h1>Welcome.</h1>
        <p>Add a short description about yourself here.</p>
        <Chatbot />
      </main>
    </div>
  );
}
