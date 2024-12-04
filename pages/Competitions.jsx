import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Competitions = () => {
  const [rankings, setRankings] = useState(null);
  const [topscorers, setTopscorers] = useState([]);
  const [topassists, setTopassists] = useState([]);
  const [season, setSeason] = useState("2022");
  const [leagues, setLeagues] = useState([]);
  const [selectedLeague, setSelectedLeague] = useState(null);

  useEffect(() => {
    var myHeaders = new Headers();
    // myHeaders.append("x-rapidapi-key", "9bdb0157032b97f104f4cb6ff5fb9a00");
    myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

    var requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://v3.football.api-sports.io/leagues", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        const filteredLeagues = result.response.filter(
          (league) => league.league.id <= 200,
        );
        setLeagues(
          filteredLeagues.map((league) => ({
            id: league.league.id,
            name: league.league.name,
          })),
        );
      })
      .catch((error) => console.log("error", error));

    if (selectedLeague) {
      fetch(
        `https://v3.football.api-sports.io/standings?league=${selectedLeague}&season=${season}`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.response && result.response.length > 0) {
            const league = result.response[0].league;
            const standings = result.response[0].league.standings[0];

            if (league && standings) {
              setRankings({
                name: league.name,
                country: league.country,
                logo: league.logo,
                flag: league.flag,
                teams: standings,
              });
            } else {
              console.error("League or standings data is missing");
            }
          } else {
            console.error("No response data found");
          }
        })
        .catch((error) => console.log("error", error));

      fetch(
        `https://v3.football.api-sports.io/players/topscorers?league=${selectedLeague}&season=${season}`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.response && result.response.length > 0) {
            const players = result.response.slice(0, 3).map((item) => ({
              name: item.player.name,
              teamLogo: item.statistics[0].team.logo,
              goals: item.statistics[0].goals.total,
            }));

            setTopscorers(players);
          } else {
            console.error("No response data found");
          }
        })
        .catch((error) => console.log("error", error));

      fetch(
        `https://v3.football.api-sports.io/players/topassists?league=${selectedLeague}&season=${season}`,
        requestOptions,
      )
        .then((response) => response.json())
        .then((result) => {
          if (result.response && result.response.length > 0) {
            const players = result.response.slice(0, 3).map((item) => ({
              name: item.player.name,
              teamLogo: item.statistics[0].team.logo,
              assists: item.statistics[0].goals.assists,
            }));

            setTopassists(players);
          } else {
            console.error("No response data found");
          }
        })
        .catch((error) => console.log("error", error));
    }
  }, [season, selectedLeague]);

  const handleSeasonChange = (e) => {
    setSeason(e.target.value);
  };

  const handleLeagueChange = (e) => {
    setSelectedLeague(e.target.value);
  };

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
          <select
            onChange={handleLeagueChange}
            className="select select-bordered w-3/4"
          >
            <option value="">Sélectionnez une ligue</option>
            {leagues.map((league) => (
              <option key={league.id} value={league.id}>
                {league.name}
              </option>
            ))}
          </select>

          <select
            onChange={handleSeasonChange}
            value={season}
            className="select select-bordered ml-4 w-1/5"
          >
            <option value="2020">2020</option>
            <option value="2021">2021</option>
            <option value="2022">2022</option>
          </select>

          {rankings ? (
            <div className="overflow-x-auto">
              <div className="flex p-4">
                <img
                  className="w-8 rounded-xl"
                  src={rankings.logo}
                  alt={rankings.logo}
                />
                <h2 className="p-2 text-xl uppercase text-gray-300">
                  {rankings.name}
                </h2>
                <img className="w-8" src={rankings.flag} alt={rankings.flag} />
                <p className="p-2">({rankings.country})</p>
              </div>
              <table className="table table-xs bg-base-100/50 text-center text-gray-50">
                <thead className="text-gray-400">
                  <tr>
                    <th></th>
                    <th>Team</th>
                    <th>P</th>
                    <th>MP</th>
                    <th>W</th>
                    <th>D</th>
                    <th>L</th>
                    <th>G</th>
                    <th>FORM</th>
                  </tr>
                </thead>

                <tbody className="text-gray-400">
                  {rankings.teams && rankings.teams.length > 0 ? (
                    rankings.teams.map((team, index) => (
                      <tr key={team.team.id} className="hover">
                        <th>{index + 1}</th>
                        <th className="text-start">
                          <img
                            className="inline-block h-6 w-6 rounded-full"
                            src={team.team.logo}
                            alt={team.team.name}
                          />{" "}
                          <Link to={`/team-informations/${team.team.id}`}>
                            {team.team.name}
                          </Link>
                        </th>
                        <th>{team.points}</th>
                        <th>{team.all.played}</th>
                        <th className="text-success">{team.all.win}</th>
                        <th className="text-primary">{team.all.draw}</th>
                        <th className="text-error">{team.all.lose}</th>
                        <th>
                          {team.all.goals.for}-{team.all.goals.against}
                        </th>
                        <th>{team.form}</th>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="9">Pas d{"'"}équipe disponible</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          ) : (
            <span className="loading loading-spinner mx-auto flex w-48 text-success"></span>
          )}
        </div>

        <div className="ml-4 hidden h-full w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 md:container lg:block lg:w-1/4 2xl:w-1/4">
          <section className="flex h-full flex-col justify-between">
            <div>
              <h3 className="text-center text-3xl">Meilleurs buteurs</h3>
              <div className="divider divider-success"></div>
              <ul>
                {topscorers.length > 0 ? (
                  topscorers.map((player, index) => (
                    <li className="flex p-1" key={index}>
                      <img
                        className="size-6"
                        src={player.teamLogo}
                        alt={player.name}
                      />
                      <Link
                        to={`/player-informations/${player.id}`}
                        className="pl-2"
                      >
                        {player.name} - {player.goals} buts
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>Chargement des meilleurs buteurs...</p>
                )}
              </ul>
            </div>

            <div>
              <h3 className="mt-4 text-center text-3xl">Meilleurs passeurs</h3>
              <div className="divider divider-success"></div>
              <ul>
                {topassists.length > 0 ? (
                  topassists.map((player, index) => (
                    <li className="flex p-1" key={index}>
                      <img
                        className="size-6"
                        src={player.teamLogo}
                        alt={player.name}
                      />
                      <Link
                        to={`/player-informations/${player.id}`}
                        className="pl-2"
                      >
                        {player.name} - {player.assists} passes décisives
                      </Link>
                    </li>
                  ))
                ) : (
                  <p>Chargement des meilleurs passeurs...</p>
                )}
              </ul>
            </div>

            <div>
              <h3 className="mt-4 text-center text-3xl">
                Meilleurs championnats
              </h3>
              <div className="divider divider-success"></div>
              <ul>
                <li>Premier League</li>
                <li>La Liga</li>
                <li>Ligue 1</li>
                <li>Bundeslisga</li>
                <li>Serie A</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Competitions;
