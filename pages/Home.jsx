import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";

function Home() {
  const [value, setValue] = useState(new Date());
  const [fixtures, setFixtures] = useState(null);
  const [playerData, setPlayerData] = useState(null);

  useEffect(() => {
    if (value) {
      const adjustedDate = new Date(value);
      adjustedDate.setDate(adjustedDate.getDate() + 1);

      const formattedDate = adjustedDate.toISOString().split("T")[0];

      var myHeaders = new Headers();
      // myHeaders.append("x-rapidapi-key", "9bdb0157032b97f104f4cb6ff5fb9a00");
      myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

      var requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      fetch(
        "https://v3.football.api-sports.io/players?id=292&season=2022",
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          const player = result.response[0].player;
          const statistics = result.response[0].statistics[0];
          console.log(result);

          setPlayerData({
            name: `${player.firstname} ${player.lastname}`,
            age: player.age,
            nationality: player.nationality,
            photo: player.photo,
            position: statistics.games.position,
            team: statistics.team.name,
            goals: statistics.goals.total,
            saves: statistics.goals.saves,
            tackle: statistics.tackles.total,
            interceptions: statistics.tackles.interceptions,
          });
        })
        .catch((error) => console.log("error", error));

      fetch(
        `https://v3.football.api-sports.io/fixtures?date=${formattedDate}`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          setFixtures(result.response);
        })
        .catch((error) => console.log("error", error));
    }
  }, [value]);

  const allowedLeagueIds = [
    1, 2, 3, 4, 5, 6, 7, 9, 39, 45, 48, 61, 65, 66, 78, 88, 94, 135, 137, 140,
    143, 848,
  ];

  // Priorités des ligues principales (Premier League, Ligue 1, etc.)
  const leaguePriority = {
    39: 1, // Premier League
    61: 2, // Ligue 1
    140: 3, // La Liga
    78: 4, // Bundesliga
    135: 5, // Serie A
  };

  // Fonction pour grouper les matchs par ligue et les trier par priorité
  const groupFixturesByLeague = (fixtures) => {
    const groupedFixtures = fixtures.reduce((acc, fixture) => {
      const leagueId = fixture.league.id;

      // Filtrer les ligues selon les IDs autorisés
      if (allowedLeagueIds.includes(leagueId)) {
        if (!acc[fixture.league.name]) {
          acc[fixture.league.name] = {
            fixtures: [],
            priority: leaguePriority[leagueId] || 99, // Priorité par défaut si pas dans leaguePriority
          };
        }
        acc[fixture.league.name].fixtures.push(fixture);
      }

      return acc;
    }, {});

    // Trier les ligues par priorité
    return Object.entries(groupedFixtures).sort(
      (a, b) => a[1].priority - b[1].priority,
    );
  };

  return (
    <>
      <div
        className="hero min-h-[calc(100vh-4.3rem)] w-full place-items-start"
        style={{
          backgroundImage:
            "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
        }}
      >
        <div className="none hero-overlay bg-opacity-60"></div>

        <div className="flex h-full w-full pb-4 pt-4 md:container md:mx-auto lg:grid lg:h-[calc(100vh-4.3rem)] lg:grid-cols-7 lg:grid-rows-3 lg:gap-4">
          <div className="col-start-1 col-end-3 h-full">
            <Calendar
              className="hidden h-full w-full overflow-y-hidden rounded-3xl border-gray-300 bg-base-100/60 lg:block"
              onChange={setValue}
              value={value}
            />
          </div>
          <div className="w-full overflow-scroll rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-3 lg:min-w-96">
            <h3 className="text-center text-3xl">MATCHS DU JOUR</h3>
            <div className="divider divider-success"></div>
            <div>
              {fixtures ? (
                groupFixturesByLeague(fixtures).map(
                  ([leagueName, leagueData]) => (
                    <div key={leagueName}>
                      <div className="flex items-center">
                        <img
                          className="w-8 rounded-xl"
                          src={leagueData.fixtures[0].league.logo}
                          alt={leagueName}
                        />
                        <h2 className="text-2xl font-bold">{leagueName}</h2>
                      </div>
                      <div className="divider divider-success"></div>

                      {leagueData.fixtures.map((fixture) => (
                        <div
                          key={fixture.fixture.id}
                          className="rounded transition-all hover:bg-white/10"
                        >
                          <div className="relative flex">
                            <img
                              className="max-h-8 w-8"
                              src={fixture.teams.home.logo}
                              alt={fixture.teams.home.name}
                            />
                            <Link
                              to={`/team-informations/${fixture.teams.home.id}`}
                            >
                              {fixture.teams.home.name}
                            </Link>
                            <p className="absolute right-2">
                              {fixture.score.fulltime.home}
                            </p>
                          </div>
                          <div className="relative flex">
                            <img
                              className="max-h-8 w-8"
                              src={fixture.teams.away.logo}
                              alt={fixture.teams.away.name}
                            />
                            <Link
                              to={`/team-informations/${fixture.teams.away.id}`}
                            >
                              {fixture.teams.away.name}
                            </Link>
                            <p className="absolute right-2">
                              {fixture.score.fulltime.away}
                            </p>
                          </div>
                          <p>
                            Heure :{" "}
                            {new Date(fixture.fixture.date).toLocaleTimeString(
                              "fr-FR",
                            )}
                          </p>
                        </div>
                      ))}
                    </div>
                  ),
                )
              ) : (
                <p>Aucun match disponible pour cette date.</p>
              )}
            </div>
          </div>

          <div className="col-start-6 col-end-8 hidden rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:block">
            <h3 className="text-center text-3xl">
              {playerData ? playerData.name : "Chargement..."}
            </h3>

            <div className="divider divider-success"></div>

            {playerData ? (
              <div className="relative">
                <p>Âge: {playerData.age}</p>
                <img
                  className="absolute right-2 top-0 size-16 rounded-full border xl:size-24 2xl:size-28"
                  src={playerData.photo}
                  alt={playerData.name}
                />
                <p>Nationalité: {playerData.nationality}</p>
                <p>Club: {playerData.team}</p>
                <p>Position: {playerData.position}</p>

                <p>
                  {playerData.position === "Attacker" &&
                    `Buts: ${playerData.goals}`}
                  {playerData.position === "Goalkeeper" &&
                    `Arrets: ${playerData.saves}`}
                  {playerData.position === "Defender" &&
                    `Tacles: ${playerData.tackle}`}
                  {playerData.position === "Midfielder" &&
                    `Interceptions: ${playerData.interceptions}`}
                </p>
                <Link
                  className="btn"
                  to={`/player-informations/${playerData.id}`}
                >
                  Voir la page du joueur
                </Link>
              </div>
            ) : (
              <span className="loading loading-spinner mx-auto flex w-32 text-success"></span>
            )}
          </div>

          <div className="col-start-1 col-end-3 row-start-2 row-end-4 hidden rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:block">
            <h3 className="text-center text-3xl">ttttttttttttt</h3>
            <div className="divider divider-success"></div>
          </div>
          <div className="col-start-3 col-end-6 hidden h-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 md:container lg:block">
            <h3 className="text-center text-3xl">ooooooooooooo</h3>
            <div className="divider divider-success"></div>
          </div>
          <div className="col-start-6 col-end-8 row-start-2 row-end-4 hidden rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:block">
            <h3 className="text-center text-3xl">kkkkkkkkkkkk</h3>
            <div className="divider divider-success"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
