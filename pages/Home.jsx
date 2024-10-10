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
        className="hero min-h-[calc(100vh-4.3rem)] place-items-start"
        style={{
          backgroundImage:
            "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
        }}
      >
        <div className="none hero-overlay bg-opacity-60"></div>
        <div className="flex h-full w-full p-4 md:container md:mx-auto">
          <Calendar
            className="hidden h-72 rounded-3xl border-gray-300 bg-base-100/60 lg:block lg:w-72 xl:w-80 2xl:w-1/4"
            onChange={setValue}
            value={value}
          />
          <div className="lg:w-1/1 ml-4 mr-4 h-3/4 w-full rounded-3xl border border-gray-300 bg-base-100/60 p-4 md:w-full lg:min-w-96">
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
          <div className="right-0 hidden h-80 rounded-3xl border border-gray-300 bg-base-100/60 p-4 md:container lg:block lg:w-96">
            dddddd
          </div>
        </div>
      </div>
    </>
  );
}
export default Home;
