// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
const jsonwebtoken = require("jsonwebtoken");
const uuid = require("uuid-random");
type Data = {
  jwt: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { avatar, email, name } = req.body;
  const now = new Date();

  const privateKey = Buffer.from(
    process.env.SSH_KEY as string,
    "base64"
  ).toString("utf8");
  const jwt = jsonwebtoken.sign(
    {
      aud: "jitsi",
      context: {
        user: {
          id: uuid(),
          name,
          avatar,
          email: email,
          moderator: "true",
        },
        features: {
          livestreaming: "true",
          recording: "true",
          transcription: "false",
          "outbound-call": "false",
        },
      },
      iss: "chat",
      room: "*",
      sub: process.env.NEXT_PUBLIC_APP_ID,
      exp: Math.round(now.setHours(now.getHours() + 3) / 1000),
      nbf: Math.round(new Date().getTime() / 1000) - 10,
    },
    privateKey,
    {
      algorithm: "RS256",
      header: {
        kid: "vpaas-magic-cookie-33b54a1dc0b04e4794c75de675b2083a/9d5115",
      },
    }
  );

  res.status(200).json({ jwt });
}
