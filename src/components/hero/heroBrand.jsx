const HeroBrand = () => {
  return (
    <div className="max-w-[660px] flex flex-col gap-[25px]">
      <h1 className="fs-1 font-semibold">Karadutlu Dondurma</h1>

      <p className="text-white/75 font-medium fs-5">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Id nobis
        provident consequuntur doloribus quia maxime porro ut culpa ipsam.
      </p>

      <div className="flex gap-[40px]">
        <button className="hero-btn">Sipariş Et</button>
        <button className="hero-btn bg-white/20 border-0">Rezervasyon</button>
      </div>
    </div>
  );
};

export default HeroBrand;
