import { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

var myHeaders = new Headers();
myHeaders.append("x-rapidapi-key", "8ae98bda88d2c921eca991683ada6ce7");
myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

var requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow",
};

fetch(
  "https://v3.football.api-sports.io/players?id=276&season=2021",
  requestOptions
)
  .then((response) => response.text())
  .then((result) => console.log(result))
  .catch((error) => console.log("error", error));

function Home() {
  const [value, setValue] = useState(new Date());
  return (
    <>
      <div
        className="hero place-items-start min-h-[calc(100vh-4.3rem)]"
        style={{
          backgroundImage:
            "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
        }}
      >
        <div className="hero-overlay none bg-opacity-60"></div>
        <div className="p-4 md:container md:mx-auto">
          <Calendar
            className="rounded-3xl bg-base-100/0  hidden lg:block lg:w-72 xl:w-80 2xl:w-1/4"
            onChange={setValue}
            value={value}
          />
        </div>
      </div>
    </>
  );
}
export default Home;
