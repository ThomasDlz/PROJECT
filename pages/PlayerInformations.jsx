import { useLoaderData } from "react-router-dom";

const urlProfile = "https://v3.football.api-sports.io/players/profiles?player=";
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
    const [playerResponse, transfersResponse, teamResponse, statsResponse] =
      await Promise.all([
        fetch(`${urlProfile}${id}`, requestOptions),
        fetch(`${urlTransfers}${id}`, requestOptions),
        fetch(`${urlTeam}${id}`, requestOptions),
        fetch(`${urlStats}${id}${urlSeason}`, requestOptions),
      ]);

    const playerData = await playerResponse.json();
    const transfersData = await transfersResponse.json();
    const teamData = await teamResponse.json();
    const statsData = await statsResponse.json();

    return { playerData, transfersData, teamData, statsData };
  } catch (error) {
    console.log(error);
    return { error: "Failed to load data" };
  }
};

function PlayerInformations() {
  const { playerData, statsData } = useLoaderData();

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
          <h3>{playerData.response[0].player.photo}</h3>
          <h3>
            {playerData.response[0].player.firstname}{" "}
            {playerData.response[0].player.lastname}
          </h3>
          <h3>Club actuel : {statsData.response[0].team.name}</h3>
          <h3>Nationalité : {playerData.response[0].player.nationality}</h3>
          <h3>Age : {playerData.response[0].player.age}</h3>
          <h3>
            Date de naissance : {playerData.response[0].player.birth.date}
          </h3>
          <h3>
            Lieu de naissance : {playerData.response[0].player.birth.place} -{" "}
            {playerData.response[0].player.birth.country}
          </h3>
          <h3>Taille : {playerData.response[0].player.height}</h3>
          <h3>Poids : {playerData.response[0].player.weight}</h3>
          <h3>Numéro de maillot : {playerData.response[0].player.number}</h3>
          <h3>Poste : {playerData.response[0].player.position}</h3>
          <div>
            <h3>Statistiques cette saison</h3>
            <h3>Matchs joués : {statsData.response[0].games.appearance}</h3>
            <h3>Minutes jouées : {statsData.response[0].games.minutes}</h3>
            <h3>Buts inscrits : {statsData.response[0].goals.total}</h3>
            <h3>
              Buts par match : {statsData.response[0].goals.total}/
              {statsData.response[0].games.appearance}
            </h3>
            <h3>
              Fréquence de buts : {statsData.response[0].games.minutes}/
              {statsData.response[0].goals.total}
            </h3>
            <h3>
              Nombre de tirs : {statsData.response[0].shots.total}, cadrés :{" "}
              {statsData.response[0].shots.on}
            </h3>
            <h3>Nombre de passes : {statsData.response[0].passes.total}</h3>
            <h3>Passes décisives : {statsData.response[0].goals.assists}</h3>
            <h3>Nombre de clés : {statsData.response[0].passes.key}</h3>
            <h3>
              Pourcentage de précision des passes :{" "}
              {statsData.response[0].passes.accuracy}
            </h3>
            <h3>Dribles tentés : {statsData.response[0].dribbles.attempts}</h3>
            <h3>Dribles réussis : {statsData.response[0].dribbles.success}</h3>
            <h3>Tacles : {statsData.response[0].tackles.total}</h3>
            <h3>Tirs bloqués : {statsData.response[0].tackles.block}</h3>
            <h3>
              Interceptions : {statsData.response[0].tackles.interceptions}
            </h3>
            <h3>Fautes obtenues : {statsData.response[0].fouls.drawn}</h3>
            <h3>Fautes commises : {statsData.response[0].fouls.commited}</h3>
            <h3>Cartons jaunes : {statsData.response[0].cards.yellow}</h3>
            <h3>Cartons rouges : {statsData.response[0].cards.red}</h3>
          </div>
          <div>
            <h3>Historique de transfert</h3>
            <h3></h3>
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

export default PlayerInformations;
