import React from "react";
import About from "./About";

function Home() {
  const item = {
    imageurl:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
  };

  return (
    <>
      <div>
        <video
          src="/video.mp4"
          autoPlay
          muted
          loop
          style={{ width: "100%" }}
        />
      </div>

      <div
        style={{
          height: "100vh",
          width: "100%",
          backgroundImage: `url(${item.imageurl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "white",
        }}
      >
        <h1>🍽️ Welcome to Food App</h1>
      </div>
    </>
  );
}

export default Home;