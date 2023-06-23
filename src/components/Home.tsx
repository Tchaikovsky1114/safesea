import Banner from './UI/Banner';
import KakaoMap from './KakaoMap';

const Home = () => {
    return (
    <div className="container mx-auto  pb-20">
      <Banner />
      <main className="grid grid-cols-2 h-[700px]">
        <section className="col-span-2 text-center ">
          <KakaoMap />
        </section>
      </main>
    </div>
  );
};

export default Home;
