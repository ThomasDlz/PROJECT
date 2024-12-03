import { useState, useEffect } from "react";

function News() {
  const [news, setNews] = useState([]);

  const apikey = "0a135fcf9f0b411ca918ab9f2fe6ff6e";
  const url =
    "https://gnews.io/api/v4/search?q=football&lang=fr&country=fr&max=10&apikey=" +
    apikey;

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        if (result.articles && result.articles.length > 0) {
          const articles = result.articles.slice(0, 8).map((article) => ({
            title: article.title,
            description: article.description,
            image: article.image,
            url: article.url,
          }));
          setNews(articles);
        } else {
          console.error("No articles data found");
        }
      })
      .catch((error) => console.log("error", error));
  });

  return (
    <>
      <div
        className="hero min-h-[calc(100vh-4.3rem)] place-items-start"
        style={{
          backgroundImage:
            "url(https://lelisia.com/cdn/shop/products/night-soccer-stadium-render.webp?v=1699408348)",
        }}
      >
        <div className="none hero-overlay bg-opacity-60">
          <div className="flex h-full w-full p-4 md:container md:mx-auto">
            <div className="grid h-full w-full gap-4 rounded-3xl p-4 md:container sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {news && news.length > 0 ? (
                news.map((article, index) => (
                  <div
                    className="max-h-1/2 glass mx-auto flex max-w-80 flex-col justify-between rounded-3xl border p-4"
                    key={index}
                  >
                    <h2 className="text-white underline underline-offset-2">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-slate-300">{article.description}</p>
                    <img
                      className="mt-2 rounded-lg"
                      src={article.image}
                      alt={article.title}
                    />
                    <a
                      className="btn btn-success mt-4"
                      target="blank"
                      href={article.url}
                    >
                      Consulter l&apos;article
                    </a>
                  </div>
                ))
              ) : (
                <span className="loading loading-spinner w-full"></span>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default News;
