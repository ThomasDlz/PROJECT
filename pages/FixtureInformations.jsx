// import { useLoaderData } from "react-router-dom";

const urlFixturesStats =
  "https://v3.football.api-sports.io/fixtures/statistiques?fixture=";
const urlTransfers = "https://v3.football.api-sports.io/transfers?player=";
const urlTeam = "https://v3.football.api-sports.io/players/teams?player=";
const urlStats = `https://v3.football.api-sports.io/players?id=`;
const urlSeason = `&season=2022`;

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
    const [
      fixturesStatsResponse,
      transfersResponse,
      teamResponse,
      statsResponse,
    ] = await Promise.all([
      fetch(`${urlFixturesStats}${id}`, requestOptions),
      fetch(`${urlTransfers}${id}`, requestOptions),
      fetch(`${urlTeam}${id}`, requestOptions),
      fetch(`${urlStats}${id}${urlSeason}`, requestOptions),
    ]);

    const fixturesStatsData = await fixturesStatsResponse.json();
    const transfersData = await transfersResponse.json();
    const teamData = await teamResponse.json();
    const statsData = await statsResponse.json();

    return { fixturesStatsData, transfersData, teamData, statsData };
  } catch (error) {
    console.log(error);
    return { error: "Failed to load data" };
  }
};

function FixtureInformations() {
  // const { fixturesStatsData, statsData, transfersData } = useLoaderData();

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
        <div className="col-start-1 col-end-4 row-start-1 row-end-5 h-full w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 text-center">
          <h2>Possession :</h2>
          <div className="flex">
            <p>67%</p>
            <div className="mx-2 flex w-full place-items-center">
              <progress
                className="progress progress-success h-4 w-full bg-primary"
                value="65"
                max="100"
              ></progress>
            </div>
            <p>33%</p>
          </div>
          <div>
            <h2>Tirs :</h2>
            <div className="flex">
              <p className="left-0">18</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="18"
                  max="35"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value="9"
                  max="35"
                ></progress>
              </div>
              <p>9</p>
            </div>
            <h2>Tirs dans la surface :</h2>
            <div className="flex">
              <p className="left-0">10</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="10"
                  max="20"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2 opacity-50"
                  value="4"
                  max="20"
                ></progress>
              </div>
              <p>4</p>
            </div>
            <h2>Tirs en dehors de la surface :</h2>
            <div className="flex">
              <p className="left-0">8</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="8"
                  max="20"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2 opacity-50"
                  value="5"
                  max="20"
                ></progress>
              </div>
              <p>5</p>
            </div>
            <h2>Tirs bloqués :</h2>
            <div className="flex">
              <p className="left-0">2</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2 opacity-50"
                  style={{ direction: "rtl" }}
                  value="2"
                  max="10"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value="5"
                  max="10"
                ></progress>
              </div>
              <p>6</p>
            </div>
            <h2>Passes tentées :</h2>
            <div className="flex">
              <p className="left-0">725</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="725"
                  max="1000"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value="489"
                  max="1000"
                ></progress>
              </div>
              <p>489</p>
            </div>
            <h2>Passes réussies :</h2>
            <div className="flex">
              <p className="left-0">650</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="650"
                  max="1000"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value="426"
                  max="1000"
                ></progress>
              </div>
              <p>426</p>
            </div>
            <h2>Arrets du gardien :</h2>
            <div className="flex">
              <p className="left-0">2</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="2"
                  max="15"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value="7"
                  max="15"
                ></progress>
              </div>
              <p>7</p>
            </div>
            <p>Corner :</p>
            <div className="flex">
              <p className="left-0">10</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="10"
                  max="20"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value="3"
                  max="20"
                ></progress>
              </div>
              <p>3</p>
            </div>
            <h2>Fautes :</h2>
            <div className="flex">
              <p className="left-0">8</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="8"
                  max="30"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value="11"
                  max="30"
                ></progress>
              </div>
              <p>11</p>
            </div>
            <h2>Cartons jaunes :</h2>
            <div className="flex">
              <p className="left-0">3</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="3"
                  max="10"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value="7"
                  max="10"
                ></progress>
              </div>
              <p>7</p>
            </div>
            <h2>Cartons rouges :</h2>
            <div className="flex">
              <p className="left-0">0</p>
              <div className="mx-2 flex w-full place-items-center">
                <progress
                  className="progress progress-success w-1/2"
                  style={{ direction: "rtl" }}
                  value="0"
                  max="4"
                ></progress>
                <progress
                  className="progress progress-primary w-1/2"
                  value="1"
                  max="4"
                ></progress>
              </div>
              <p>1</p>
            </div>
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

export default FixtureInformations;
