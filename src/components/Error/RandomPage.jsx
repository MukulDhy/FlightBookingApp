import React from "react";

const RandomPage = ({
  exterCss="",
  first = "404",
  second = "Look like you're lost",
  third = "The page you are looking for is not available!",
  fourth = "Go to Home",
}) => {
  return (
    <section className={`${exterCss} mt-8 font-serif`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="text-center">
              <h1 className="text-2xl font-bold">{first}</h1>
            <div
              className="h-80 bg-center bg-cover flex items-center justify-center"
              style={{
                backgroundImage:
                  "url('https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif')",
              }}
            >
            </div>

            <div className="mt-[-10px]">
              <h3 className="text-4xl font-bold">{second}</h3>
              <p className="mt-2 text-gray-700">{third}</p>
              <a
                href="/"
                className="mt-5 inline-block px-5 py-2 text-white bg-green-600 rounded hover:bg-green-700"
              >
                {fourth}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RandomPage;
