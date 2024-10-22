import { useLoaderData } from "react-router-dom";

const url = "https://v3.football.api-sports.io/teams?id=";
const urlCoach = "https://v3.football.api-sports.io/coachs?team=";
const urlPlayers = "https://v3.football.api-sports.io/players/squads?team=";
const urlLeague = `https://v3.football.api-sports.io/leagues?team=`;
const urlStats = `https://v3.football.api-sports.io/teams/statistics?league=39&season=2022&team=`;

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
      teamResponse,
      playersResponse,
      coachResponse,
      leagueResponse,
      statsResponse,
    ] = await Promise.all([
      fetch(`${url}${id}`, requestOptions),
      fetch(`${urlPlayers}${id}`, requestOptions),
      fetch(`${urlCoach}${id}`, requestOptions),
      fetch(`${urlLeague}${id}`, requestOptions),
      fetch(`${urlStats}${id}`, requestOptions),
    ]);

    const teamData = await teamResponse.json();
    const playersData = await playersResponse.json();
    const coachData = await coachResponse.json();
    const leagueData = await leagueResponse.json();
    const statsData = await statsResponse.json();

    return { teamData, playersData, coachData, leagueData, statsData };
  } catch (error) {
    console.log(error);
    return { error: "Failed to load data" };
  }
};

function TeamInformations() {
  const { teamData, playersData, coachData, leagueData, statsData } =
    useLoaderData();

  // Trier les joueurs par poste
  const players = playersData.response[0].players;
  const sortedPlayers = players.reduce((acc, player) => {
    if (!acc[player.position]) {
      acc[player.position] = [];
    }
    acc[player.position].push(player);
    return acc;
  }, {});

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
          <img
            className="max-h-64"
            src={teamData.response[0].team.logo}
            alt={teamData.response[0].team.name}
          />
          <h3>{teamData.response[0].team.name}</h3>
          <h3>Création : {teamData.response[0].team.founded}</h3>
          <h3>Pays : {teamData.response[0].team.country}</h3>
          <h3>Championnat : {leagueData.response[0].league.name}</h3>
          <h3>
            Entraineur : {coachData.response[0].firstname}{" "}
            {coachData.response[0].name}
          </h3>
          <h3>Joueurs :</h3>
          {Object.keys(sortedPlayers).map((position) => (
            <div className="w-1/4 border" key={position}>
              <h4>{position}</h4>
              <ul>
                {sortedPlayers[position].map((player) => (
                  <li key={player.id}>{player.name}</li>
                ))}
              </ul>
            </div>
          ))}
          <h3>
            Statistiques cette saison en {leagueData.response[0].league.name}:
          </h3>
          <h3>Victoires : {statsData.response[0].fixtures.wins.total}</h3>
          <h3>
            Plus longue série de victoire :{" "}
            {statsData.response[0].biggest.streak.wins}
          </h3>
          <h3>
            Plus longue série de défaite :{" "}
            {statsData.response[0].biggest.streak.loses}
          </h3>
          <h3>
            Buts marqués cette saison :{" "}
            {statsData.response[0].goals.for.total.total}
          </h3>
          <h3>
            Moyenne de buts marqués par match :{" "}
            {statsData.response[0].goals.for.average.total}
          </h3>
          <h3>
            Buts encaissés cette saison :{" "}
            {statsData.response[0].goals.against.total.total}
          </h3>
          <h3>
            Moyenne de buts encaissés par match :{" "}
            {statsData.response[0].goals.against.average.total}
          </h3>
          <h3>Clean Sheet : {statsData.response[0].clean_sheet.total}</h3>
          <h3>
            Composition préferé : {statsData.response[0].lineups[0].formation}
          </h3>
          <div className="absolute right-0 top-0 border">
            <img
              className="max-w-80"
              src={teamData.response[0].venue.image}
              alt={teamData.response[0].venue.name}
            />
            <h3>Nom : {teamData.response[0].venue.name}</h3>
            <h3>Ville : {teamData.response[0].venue.city}</h3>
            <h3>Capacité : {teamData.response[0].venue.capacity}</h3>
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

export default TeamInformations;
