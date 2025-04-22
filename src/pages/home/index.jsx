import CardButton from "../../components/buttons/cardButton";
import TrendButton from "../../components/buttons/trendButton";
import Hero from "../../components/hero";
import List from "../../components/list";

const Home = () => {
  return (
    <div className="relative">
      <Hero />

      <CardButton />

      <TrendButton />

      <List />
    </div>
  );
};

export default Home;
