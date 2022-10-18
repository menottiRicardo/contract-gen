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
      
      setJwt(key.jwt);
    };
    getKey();
  }, []);
  
  return (
    <div className="md:w-1/3 ">
      {jwt !== "" && (
        <JaaSMeeting
          appId={process.env.NEXT_PUBLIC_APP_ID as string}
          jwt={jwt}
          roomName={"test"}
          interfaceConfigOverwrite={{
            MOBILE_APP_PROMO: false,
            TILE_VIEW_MAX_COLUMNS: 4,
            SHOW_JITSI_WATERMARK: false,
            SHOW_BRAND_WATERMARK: false,
            SHOW_WATERMARK_FOR_GUESTS: false,
            SHOW_POWERED_BY: false,
            TOOLBAR_BUTTONS: ["settings", "raisehand"],
          }}
          configOverwrite={{
            startWithAudioMuted: false,
            startWithVideoMuted: false,
            // prejoinPageEnabled: false 
          }}
          getIFrameRef={(node) => (node.style.height = "100%")}
        />
      )}
    </div>
  );
};

export default Jitsi;
