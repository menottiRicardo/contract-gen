import React from "react";
import Document from "../components/video/Document";
import Jitsi from "../components/video/Jitsi";

const Video = () => {
  return (
    <div className="flex min-h-screen">
      <Document />

      <Jitsi />
    </div>
  );
};

export default Video;
