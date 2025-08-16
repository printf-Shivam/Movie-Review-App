import { useParams } from "react-router-dom";
import ReactPlayer from "react-player";
import React from "react";

const Trailer = () => {
  let params = useParams();
  let key = params.ytTrailerId;
  console.log(key);

  return (
    <div className="react-player-container">
      {key ? (
        <ReactPlayer
        url={`https://www.youtube.com/watch?v=${key}`}
        controls={true}   // ✅ Boolean, not string
        playing={true}    // ✅ Auto-plays
        width="100%"
        height="100%"
      />
      ) : null}
    </div>
  );
};

export default Trailer;
