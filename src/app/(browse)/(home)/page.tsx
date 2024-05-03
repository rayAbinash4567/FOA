import Image from 'next/image';
import '../../../css/output.css';
export default function Home() {
  return (
    <main>
      {/* <!-- One h1 is important in every website but here we dont need so opacity-0 class is assign for that--> */}

      <section className="  ">
        <div className="grid md:grid-cols-4">
          <div className="sedans-card p-12 text-yellow bg-orange text-white md:rounded-l-lg max-sm:rounded-t-lg">
            <Image
              height={50}
              width={500}
              src="/images/cards/cards-01.png"
              alt=""
            />
            <h2 className="  text-xl mt-9 mb-6">About Pinnacle Partnerships</h2>
            <p className="text-base leading-6 font-lexend opacity-75">
              Choose a sedan for its affordability and excellent fuel economy.
              Ideal for cruising in the city or on your next road trip.
            </p>
            <button className="bg-btn-bg text-orange  py-3 px-8 rounded-full transition ease-in-out duration-300 mt-20 border-2 border-white hover:text-white hover:bg-opacity-0">
              Learn more
            </button>
          </div>

          <div className="suvs-card p-12 text-yellow bg-light-green text-white">
            <Image
              height={50}
              width={500}
              src="/images/cards/cards-02.png"
              alt=""
            />
            <h2 className="uppercase font-bold text-4xl mt-9 mb-6 font-shoulders">
              suvs
            </h2>
            <p className="text-base leading-6 font-lexend opacity-75">
              Take an SUV for its spacious interior, power, and versatility.
              Perfect for your next family vacation and off-road adventures.
            </p>
            <button className="bg-btn-bg text-light-green  py-3 px-8 rounded-full transition ease-in-out duration-300 mt-20 border-2 border-white hover:text-white hover:bg-opacity-0">
              Learn more
            </button>
          </div>
          <div className="sedans-card p-12 text-yellow bg-orange text-white md:rounded-l-lg max-sm:rounded-t-lg">
            <Image
              height={50}
              width={500}
              src="/images/cards/cards-04.png"
              alt=""
            />
            <h2 className="font-bold font-shoulders text-3xl mt-9 mb-6">
              About Pinnacle Partnerships
            </h2>
            <p className="text-base leading-6 font-lexend opacity-75">
              Choose a sedan for its affordability and excellent fuel economy.
              Ideal for cruising in the city or on your next road trip.
            </p>
            <button className="bg-btn-bg text-orange  py-3 px-8 rounded-full transition ease-in-out duration-300 mt-20 border-2 border-white hover:text-white hover:bg-opacity-0">
              Learn more
            </button>
          </div>
          <div className="luxury-card p-12 text-yellow bg-dark-green text-white md:rounded-r-lg max-sm:rounded-b-lg">
            <Image
              height={50}
              width={500}
              src="/images/cards/cards-03.png"
              alt=""
            />
            <h2 className=" text-4xl mt-9 mb-6 font-shoulders">Luxury</h2>
            <p className="text-base leading-6 font-lexend opacity-75">
              Take an SUV for its spacious interior, power, and versatility.
              Perfect for your next family vacation and off-road adventures.
            </p>
            <button className="bg-btn-bg text-dark-green font-lexend py-3 px-8 rounded-full transition ease-in-out duration-300 mt-20 border-2 border-white hover:text-white hover:bg-opacity-0">
              Learn more
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
