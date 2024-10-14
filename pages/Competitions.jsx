const Competitions = () => {
  return (
    <div
      className="hero min-h-[calc(100vh-4.3rem)] place-items-start"
      style={{
        backgroundImage:
          "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
      }}
    >
      <div className="none hero-overlay bg-opacity-60"></div>
      <div className="flex h-full w-full p-4 md:container md:mx-auto">
        <div className="h-full w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 md:container lg:block lg:w-3/4 2xl:w-3/4">
          <select className="select select-bordered w-3/4">
            <option selected disabled>
              Selectionner un championnat/tournoi
            </option>
            <option>Premier League</option>
            <option>Ligue 1</option>
          </select>

          <select className="select select-bordered ml-4 w-1/5">
            <option selected>2020</option>
            <option>2021</option>
            <option>2022</option>
          </select>
        </div>
        <div className="ml-4 hidden h-full w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 md:container lg:block lg:w-1/4 2xl:w-1/4">
          <h3 className="text-center text-3xl">zzzzzzzzzzzz</h3>
          <div className="divider divider-success"></div>
        </div>
      </div>
    </div>
  );
};

export default Competitions;
