import { useLoaderData } from "react-router-dom";

const urlFixtureStats =
  "https://v3.football.api-sports.io/fixtures/statistics?fixture=";
const urlDetails = "https://v3.football.api-sports.io/fixtures?id=";
const urlLineups = "https://v3.football.api-sports.io/fixtures?id=";

export const loader = async ({ params }) => {
  const { id } = params;
  var myHeaders = new Headers();
  myHeaders.append("x-rapidapi-key", "9bdb0157032b97f104f4cb6ff5fb9a00");
  myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  try {
    const [fixtureStatsResponse, detailsResponse, lineupsResponse] =
      await Promise.all([
        fetch(`${urlFixtureStats}${id}`, requestOptions),
        fetch(`${urlDetails}${id}`, requestOptions),
        fetch(`${urlLineups}${id}`, requestOptions),
      ]);

    const fixtureStatsData = await fixtureStatsResponse.json();
    const detailsData = await detailsResponse.json();
    const lineupsData = await lineupsResponse.json();

    return { fixtureStatsData, detailsData, lineupsData };
  } catch (error) {
    console.log(error);
    return { error: "Failed to load data" };
  }
};

function FixtureInformations() {
  const { fixtureStatsData, lineupsData } = useLoaderData();

  if (
    !fixtureStatsData ||
    !fixtureStatsData.response ||
    fixtureStatsData.response.length < 2
  ) {
    return (
      <div
        className="hero min-h-[calc(100vh-4.3rem)] place-items-start"
        style={{
          backgroundImage:
            "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
        }}
      >
        <div className="none hero-overlay bg-opacity-60"></div>
        <div className="h-full w-full p-4 md:container md:mx-auto">
          <div className="col-start-1 col-end-4 row-start-1 row-end-5 h-full w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 text-center">
            <div>
              <span className="loading loading-spinner mx-auto flex h-80 w-80 text-success"></span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const team1 = fixtureStatsData.response[0].team;
  const team2 = fixtureStatsData.response[1].team;

  return (
    <div
      className="hero min-h-[calc(100vh-4.3rem)] place-items-start"
      style={{
        backgroundImage:
          "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
      }}
    >
      <div className="none hero-overlay bg-opacity-60"></div>
      <div className="h-full w-full p-4 md:container md:mx-auto">
        <div className="col-start-1 col-end-4 row-start-1 row-end-5 h-full w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 text-center">
          <div className="flex justify-around">
            <div className="flex flex-col">
              <img className="h-48" src={team1.logo} alt={team1.name} />
              <p className="text-2xl">{team1.name}</p>
            </div>
            <p></p>
            <div className="flex flex-col">
              <img className="h-48" src={team2.logo} alt={team2.name} />
              <p className="text-2xl">{team2.name}</p>
            </div>
          </div>
          <h2>Possession :</h2>
          <div className="flex">
            <p>{fixtureStatsData.response[0].statistics[9].value}</p>
            <div className="mx-2 flex w-full place-items-center">
              <progress
                className="progress progress-success h-4 w-full bg-primary"
                value={fixtureStatsData.response[0].statistics[9].value.replace(
                  "%",
                  "",
                )}
                max="100"
              ></progress>
            </div>
            <p>{fixtureStatsData.response[1].statistics[9].value}</p>
          </div>
          <div>
            <h2>Tirs :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[2].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[2].value}
                  max="35"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value={fixtureStatsData.response[1].statistics[2].value}
                  max="35"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[2].value}</p>
            </div>
            <h2>Tirs dans la surface :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[4].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[4].value}
                  max="20"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2 opacity-50"
                  value={fixtureStatsData.response[1].statistics[4].value}
                  max="20"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[4].value}</p>
            </div>
            <h2>Tirs en dehors de la surface :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[5].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[5].value}
                  max="20"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2 opacity-50"
                  value={fixtureStatsData.response[1].statistics[5].value}
                  max="20"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[5].value}</p>
            </div>
            <h2>Tirs bloqués :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[3].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2 opacity-50"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[3].value}
                  max="10"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value={fixtureStatsData.response[1].statistics[3].value}
                  max="10"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[3].value}</p>
            </div>
            <h2>Passes tentées :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[13].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[13].value}
                  max="1000"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value={fixtureStatsData.response[1].statistics[13].value}
                  max="1000"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[13].value}</p>
            </div>
            <h2>Passes réussies :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[14].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[14].value}
                  max="1000"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value={fixtureStatsData.response[1].statistics[14].value}
                  max="1000"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[14].value}</p>
            </div>
            <h2>Arrets du gardien :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[12].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[12].value}
                  max="15"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value={fixtureStatsData.response[1].statistics[12].value}
                  max="15"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[12].value}</p>
            </div>
            <p>Corner :</p>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[7].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[7].value}
                  max="20"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value={fixtureStatsData.response[1].statistics[7].value}
                  max="20"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[7].value}</p>
            </div>
            <h2>Fautes :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[6].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[6].value}
                  max="30"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value={fixtureStatsData.response[1].statistics[6].value}
                  max="30"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[6].value}</p>
            </div>
            <h2>Cartons jaunes :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[10].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[10].value}
                  max="10"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value={fixtureStatsData.response[1].statistics[10].value}
                  max="10"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[10].value}</p>
            </div>
            <h2>Cartons rouges :</h2>
            <div className="flex">
              <p className="left-0">
                {fixtureStatsData.response[0].statistics[11].value}
              </p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value={fixtureStatsData.response[0].statistics[11].value}
                  max="4"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value={fixtureStatsData.response[1].statistics[11].value}
                  max="4"
                ></progress>
              </div>
              <p>{fixtureStatsData.response[1].statistics[11].value}</p>
            </div>
          </div>

          <div className="flex">
            <div className="w-1/2">
              <h2>{lineupsData.response[0].formation}</h2>
              <h2>Entraineur</h2>
              <p>{lineupsData.response[0].coach.name}</p>
              <h2>Titulaires</h2>
              <ul>
                {lineupsData.response[0].startXI &&
                lineupsData.response[0].startXI.length > 0 ? (
                  lineupsData.response[0].startXI.map((player, index) => (
                    <li key={index}>
                      {player.player.number} {player.player.name}
                    </li>
                  ))
                ) : (
                  <p>Aucun joueur trouvé</p>
                )}
              </ul>
              <h2>Remplaçants</h2>
              <ul>
                {lineupsData.response[0].substitutes &&
                lineupsData.response[0].substitutes.length > 0 ? (
                  lineupsData.response[0].substitutes.map((player, index) => (
                    <li key={index}>
                      {player.player.number} {player.player.name}
                    </li>
                  ))
                ) : (
                  <p>Aucun joueur trouvé</p>
                )}
              </ul>
            </div>

            <div className="w-1/2">
              <h2>{lineupsData.response[1].formation}</h2>
              <h2>Entraineur</h2>
              <p>{lineupsData.response[1].coach.name}</p>
              <h2>Titulaires</h2>
              <ul>
                {lineupsData.response[1].startXI &&
                lineupsData.response[1].startXI.length > 0 ? (
                  lineupsData.response[1].startXI.map((player, index) => (
                    <li key={index}>
                      {player.player.number} {player.player.name}
                    </li>
                  ))
                ) : (
                  <p>Aucun joueur trouvé</p>
                )}
              </ul>
              <h2>Remplaçants :</h2>
              <ul>
                {lineupsData.response[1].substitutes &&
                lineupsData.response[1].substitutes.length > 0 ? (
                  lineupsData.response[1].substitutes.map((player, index) => (
                    <li key={index}>
                      {player.player.number} {player.player.name}
                    </li>
                  ))
                ) : (
                  <p>Aucun joueur trouvé</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FixtureInformations;
