import React, { useEffect, useState } from "react";

import dynamic from "next/dynamic";
const JaaSMeeting = dynamic(
  () => import("@jitsi/react-sdk").then((mod) => mod.JaaSMeeting),
  {
    ssr: false,
  }
);
const Jitsi = () => {
  const [jwt, setJwt] = useState("");
  useEffect(() => {
    const getKey = async () => {
      const rawKey = await fetch("/api/generate-token", {
        method: "POST",
        body: JSON.stringify({ name: "ricardo", avatar: "", email: "" }),
      });
      const key = await rawKey.json();
      console.log("key", key);
      setJwt(key.jwt);
    };
    getKey();
  }, []);
  console.log('et',process.env.NEXT_PUBLIC_APP_ID, 'id')
  return (
    <div className=" h-screen">
      {jwt !== "" && (
        <JaaSMeeting
          appId={process.env.NEXT_PUBLIC_APP_ID as string}
          jwt={jwt}
          roomName={"test"}
          interfaceConfigOverwrite={{
            VIDEO_LAYOUT_FIT: "nocrop",
            MOBILE_APP_PROMO: false,
            TILE_VIEW_MAX_COLUMNS: 4,
          }}
          getIFrameRef={(node) => (node.style.height = "90%")}
        />
      )}
    </div>
  );
};

export default Jitsi;
