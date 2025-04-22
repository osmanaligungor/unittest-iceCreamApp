import HeroBrand from "./heroBrand";
import HeroCard from "./heroCard";

const Hero = () => {
  return (
    <div className="mt-[30px] 2xl:mt-[110px] grid lg:grid-cols-2 gap-[50px] lg:mb-[70px]">
      <div>
        <HeroBrand />
      </div>

      <div className="flex items-center lg:justify-end">
        <HeroCard />
      </div>
    </div>
  );
};

export default Hero;
