import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "8ae98bda88d2c921eca991683ada6ce7");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

// var requestOptions = {
//   method: "GET",
//   headers: myHeaders,
//   redirect: "follow",
// };

// fetch(
//   "https://v3.football.api-sports.io/players?id=276&season=2021",
//   requestOptions,
// )
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

function Home() {
  const [value, setValue] = useState(new Date());
  return (
    <>
      <div
        className="hero h-screen w-full place-items-start lg:h-full"
        style={{
          backgroundImage:
            "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
        }}
      >
        <div className="none hero-overlay bg-opacity-60"></div>

        <div className="h-full w-full pb-4 pt-4 md:container md:mx-auto lg:grid lg:grid-cols-7 lg:grid-rows-3 lg:gap-4">
          <div className="col-start-1 col-end-3">
            <Calendar
              className="hidden h-full w-full rounded-3xl border-gray-300 bg-base-100/60 lg:block"
              onChange={setValue}
              value={value}
            />
          </div>
          <div className="h-full w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:col-start-3 lg:col-end-6 lg:row-start-1 lg:row-end-3 lg:min-w-96">
            <h3 className="text-center text-3xl">MATCHS DU JOUR</h3>
            <div className="divider divider-success"></div>
            <div>
              <p className="rounded transition-all hover:bg-white/10">
                ------------------------
              </p>
              <p className="rounded transition-all hover:bg-white/10">
                ------------------------
              </p>
              <p className="rounded transition-all hover:bg-white/10">
                ------------------------
              </p>
            </div>
          </div>

          <div className="col-start-6 col-end-8 hidden rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:block">
            3
          </div>
          <div className="col-start-1 col-end-3 row-start-2 row-end-4 hidden rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:block">
            4
          </div>
          <div className="col-start-3 col-end-6 hidden h-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 md:container lg:block">
            5
          </div>
          <div className="col-start-6 col-end-8 row-start-2 row-end-4 hidden rounded-3xl border border-gray-300 bg-base-100/60 p-4 lg:block">
            6
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
