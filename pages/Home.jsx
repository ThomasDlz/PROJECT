import { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { Link } from "react-router-dom";

function Home() {
  const [value, setValue] = useState(new Date());
  const [fixtures, setFixtures] = useState([]);
  const [ldcMatchs, setLdcMatchs] = useState(null);
  const [videos, setVideos] = useState([]);
  const [news, setNews] = useState(null);

  const API_KEY_NEWS = "0a135fcf9f0b411ca918ab9f2fe6ff6e";
  const API_KEY_RAPID = "9bdb0157032b97f104f4cb6ff5fb9a00";

  const NEWS_URL = `https://gnews.io/api/v4/search?q=football&lang=fr&country=fr&max=10&apikey=${API_KEY_NEWS}`;
  const RAPID_API_HEADERS = {
    "x-rapidapi-key": API_KEY_RAPID,
    "x-rapidapi-host": "v3.football.api-sports.io",
  };
  const VIDEO_API_URL =
    "https://www.scorebat.com/video-api/v3/feed/?token=MTgzODMwXzE3MzAxOTc1NjJfNGY0NDdkNzRhZDMyNTU0ZTUzNDc0NWJkYzBhOWRiYzcxZjRlZGU3ZA==";

  const allowedLeagueIds = [
    1, 2, 3, 4, 5, 6, 7, 9, 39, 45, 48, 61, 65, 66, 78, 88, 94, 135, 137, 140,
    143, 848,
  ];
  const leaguePriority = {
    39: 1,
    61: 2,
    140: 3,
    78: 4,
    135: 5,
  };

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(NEWS_URL);
        const data = await response.json();
        if (data.articles?.length) {
          setNews(data.articles[0]);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };

    const fetchFixtures = async (date) => {
      try {
        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?date=${date}`,
          { headers: RAPID_API_HEADERS },
        );
        const data = await response.json();
        setFixtures(data.response || []);
      } catch (error) {
        console.error("Error fetching fixtures:", error);
      }
    };

    const fetchLdcMatchs = async () => {
      try {
        const response = await fetch(
          "https://v3.football.api-sports.io/fixtures?league=2&season=2022&from=2022-10-29&to=2022-11-14",
          { headers: RAPID_API_HEADERS },
        );
        const data = await response.json();
        if (data.response?.length) {
          const { fixture, teams } = data.response[0];
          setLdcMatchs({
            date: fixture.date,
            homeTeam: teams.home.name,
            homeLogo: teams.home.logo,
            awayTeam: teams.away.name,
            awayLogo: teams.away.logo,
          });
        }
      } catch (error) {
        console.error("Error fetching LDC matches:", error);
      }
    };

    const fetchVideos = async () => {
      try {
        const response = await fetch(VIDEO_API_URL);
        const data = await response.json();
        setVideos(
          data.response?.map((vid) => ({
            title: vid.title,
            media: vid.videos[0].embed,
          })) || [],
        );
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };

    const adjustedDate = new Date(value);
    adjustedDate.setDate(adjustedDate.getDate() + 1);
    const formattedDate = adjustedDate.toISOString().split("T")[0];

    fetchNews();
    fetchFixtures(formattedDate);
    fetchLdcMatchs();
    fetchVideos();
  }, [value]);

  const groupFixturesByLeague = (fixtures) => {
    const grouped = fixtures.reduce((acc, fixture) => {
      const leagueId = fixture.league.id;
      if (allowedLeagueIds.includes(leagueId)) {
        if (!acc[fixture.league.name]) {
          acc[fixture.league.name] = {
            fixtures: [],
            priority: leaguePriority[leagueId] || 99,
          };
        }
        acc[fixture.league.name].fixtures.push(fixture);
      }
      return acc;
    }, {});
    return Object.entries(grouped).sort(
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

          <div className="mx-4 w-full overflow-scroll rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-3 lg:mx-0 lg:min-w-96">
            <h3 className="text-center text-3xl">MATCHS DU JOUR</h3>
            <div>
              {fixtures ? (
                groupFixturesByLeague(fixtures).map(
                  ([leagueName, leagueData]) => (
                    <div key={leagueName}>
                      <div className="divider divider-success"></div>
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
                          className="mb-4 rounded transition-all hover:bg-white/10"
                        >
                          <p className="ml-2">
                            {new Date(fixture.fixture.date).toLocaleTimeString(
                              "fr-FR",
                              {
                                hour: "2-digit",
                                minute: "2-digit",
                              },
                            )}
                          </p>
                          <div className="relative mb-1 flex">
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
                        </div>
                      ))}
                    </div>
                  ),
                )
              ) : (
                <span className="mx-auto flex">Aucun match disponible</span>
              )}
            </div>
          </div>

          <div className="col-start-1 col-end-3 row-start-2 row-end-4 hidden rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:block">
            <h3 className="text-center text-3xl">A LA UNE</h3>
            <div className="divider divider-success"></div>
            {news ? (
              <div className="relative flex flex-col rounded-3xl">
                <h2 className="text-white underline underline-offset-2">
                  {news.title}
                </h2>
                <p className="text-slate-300">{news.description}</p>

                <img className="mt-2 rounded-lg" src={news.image} alt="" />
                <Link
                  className="btn btn-success absolute bottom-0 right-0 m-1 p-2"
                  to={"/news"}
                >
                  Voir plus d{"'"}actualités
                </Link>
              </div>
            ) : (
              <span className="mx-auto flex justify-center">
                Aucune info disponible
              </span>
            )}
          </div>

          <div className="col-start-3 col-end-6 hidden h-full overflow-scroll rounded-3xl border border-gray-300 bg-base-100/60 p-4 md:container lg:block">
            <h3 className="text-center text-3xl">
              PROCHAINS MATCHS DE LIGUE DES CHAMPIONS
            </h3>

            <div className="divider divider-success"></div>
            {ldcMatchs ? (
              <div className="flex justify-between">
                <div>
                  <img
                    className="mx-auto h-24"
                    src={ldcMatchs.homeLogo}
                    alt={ldcMatchs.homeTeam}
                  />
                  <p>{ldcMatchs.homeTeam}</p>
                </div>
                <p className="mt-12">
                  {new Date(ldcMatchs.date).toLocaleDateString("fr-FR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}{" "}
                  -{" "}
                  {new Date(ldcMatchs.date).toLocaleTimeString("fr-FR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
                <div>
                  <img
                    className="mx-auto h-24"
                    src={ldcMatchs.awayLogo}
                    alt={ldcMatchs.awayTeam}
                  />
                  <p>{ldcMatchs.awayTeam}</p>
                </div>
              </div>
            ) : (
              <span className="mx-auto flex justify-center">
                Aucun match disponible
              </span>
            )}
          </div>

          <div className="col-start-6 col-end-8 row-start-1 row-end-4 hidden overflow-x-auto rounded-3xl border border-gray-300 bg-base-100/60 lg:block">
            <h3 className="px-4 pt-4 text-center text-3xl">
              RÉSUMÉ DES DERNIERS MATCHS
            </h3>

            <div className="divider divider-success px-4"></div>
            {videos ? (
              videos.map((vid, index) => (
                <div
                  key={index}
                  className="mb-8 ml-3 flex rounded-xl border bg-base-100"
                >
                  <div className="w-full">
                    <h2 className="text-center text-xl">{vid.title}</h2>
                    <div
                      className="p-2"
                      dangerouslySetInnerHTML={{ __html: vid.media }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <span className="mx-auto flex text-warning">
                Pas de vidéo disponible
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
