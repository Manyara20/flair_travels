import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/data/site";

export const alt = "Flair Travels: tours & travel, made easy";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const [font, photo, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/BigShoulders-ExtraBold.ttf")),
    readFile(join(process.cwd(), "src/assets/og/og-photo.jpg")),
    readFile(join(process.cwd(), "public/brand/logo-reverse.png")),
  ]);

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", background: "#1E2A36", fontFamily: "Big Shoulders" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: 560, padding: "56px 0 48px 56px" }}>
          <img src={`data:image/png;base64,${logo.toString("base64")}`} width={420} height={177} alt="" />
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "flex", color: "#E8439F", fontSize: 26, letterSpacing: 6 }}>TOURS &amp; TRAVEL</div>
            <div style={{ display: "flex", color: "white", fontSize: 92, lineHeight: 0.9, marginTop: 10 }}>TRAVEL MADE EASY.</div>
            <div style={{ display: "flex", color: "#CDE9F7", fontSize: 24, letterSpacing: 2, marginTop: 28 }}>
              {site.phone}  ·  FLAIRTRAVELS.COM
            </div>
          </div>
        </div>
        <div style={{ display: "flex", position: "relative", flex: 1 }}>
          <img src={`data:image/jpeg;base64,${photo.toString("base64")}`} width={640} height={630} style={{ objectFit: "cover" }} alt="" />
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 10, background: "#E8439F" }} />
          <div style={{ position: "absolute", left: 0, right: 0, top: 360, height: 3, background: "#E8439F", opacity: 0.8 }} />
        </div>
        <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 10, background: "#14A0DC" }} />
      </div>
    ),
    { ...size, fonts: [{ name: "Big Shoulders", data: font, weight: 800, style: "normal" }] },
  );
}
