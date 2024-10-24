import { useLoaderData } from "react-router-dom";

const urlCoach = "https://v3.football.api-sports.io/coachs?id=";

export const loader = async ({ params }) => {
  const { id } = params;
  var myHeaders = new Headers();
  // myHeaders.append("x-rapidapi-key", "9bdb0157032b97f104f4cb6ff5fb9a00");
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const response = await fetch(`${urlCoach}${id}`, requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

function CoachInformations() {
  const data = useLoaderData();

  return (
    <div
      className="hero min-h-[calc(100vh-4.3rem)] place-items-start"
      style={{
        backgroundImage:
          "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
      }}
    >
      <div className="none hero-overlay bg-opacity-60"></div>
      <div className="grid h-full w-full grid-cols-4 grid-rows-4 gap-4 p-4 md:container md:mx-auto">
        <div className="relative col-start-1 col-end-4 row-start-1 row-end-5 h-full w-full overflow-hidden rounded-3xl border border-gray-300 bg-base-100/60 p-4">
          <h3>{data.response[0].photo}</h3>
          <h3>
            {data.response[0].firstname} {data.response[0].lastname}
          </h3>
          <h3>Club actuel : {data.response[0].team.name}</h3>
          <h3>Nationalité : {data.response[0].nationality}</h3>
          <h3>Age : {data.response[0].age}</h3>
          <h3>Date de naissance : {data.response[0].birth.date}</h3>
          <h3>
            Lieu de naissance : {data.response[0].birth.place} -{" "}
            {data.response[0].birth.country}
          </h3>
          <h3>Taille : {data.response[0].height}</h3>
          <h3>Poids : {data.response[0].weight}</h3>

          <div>
            <h3>Carrière</h3>
            {data.response[0].career && data.response[0].career.length > 0 ? (
              <ul>
                {data.response[0].career.map((job, index) => (
                  <li key={index} className="mb-4">
                    <img
                      src={job.team.logo}
                      alt={`${job.team.name} logo`}
                      className="mr-2 inline-block h-8 w-8"
                    />
                    <span>
                      <strong>{job.team.name}</strong> - {job.start} à{" "}
                      {job.end || "Toujours en poste"}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Aucune carrière disponible.</p>
            )}
          </div>
        </div>

        <div className="col-start-4 col-end-5 row-start-1 row-end-3 h-full w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4">
          <h3 className="text-center text-3xl">Matchs à venir</h3>
          <div className="divider divider-success"></div>
        </div>

        <div className="col-start-4 col-end-5 row-start-3 row-end-5 h-full w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4">
          <h3 className="text-center text-3xl">Derniers matchs</h3>
          <div className="divider divider-success"></div>
        </div>
      </div>
    </div>
  );
}

export default CoachInformations;
