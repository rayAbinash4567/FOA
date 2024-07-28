import Head from 'next/head';
import RaceTrack from '../UserPortal/RaceTrack/RaceTrack';

export default function Home() {
  return (
    <div className="container mx-auto px-4">
      <Head>
        <title>Real Estate Race Track</title>
      </Head>
      <main className="main">
        <h1 className="text-2xl font-bold text-center my-5">
          Real Estate Transaction Tracker
        </h1>
        <RaceTrack />
      </main>
    </div>
  );
}
